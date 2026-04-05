import { reportApiMetric, reportClientError } from "@/lib/monitoring";

const REQUEST_TIMEOUT_MS = 12000;

export type WaitlistProduct = "lume" | "symmetryai";

interface EdgeFunctionSuccess {
  ok: true;
  message: string;
  requestId: string;
}

interface EdgeFunctionError {
  ok?: false;
  error?: string;
  message?: string;
  requestId?: string;
}

export interface WaitlistResponse extends EdgeFunctionSuccess {
  duplicate: boolean;
}

export interface WaitlistCountResponse extends EdgeFunctionSuccess {
  product: WaitlistProduct;
  count: number;
}

export interface AccountDeletionResponse extends EdgeFunctionSuccess {
  deletionRequestId: string;
}

export interface ConfirmAccountDeletionResponse extends EdgeFunctionSuccess {
  deletionRequestId: string;
  alreadyVerified: boolean;
}

export interface SubmitWaitlistPayload {
  product: WaitlistProduct;
  email: string;
  captchaToken: string;
}

export interface SubmitAccountDeletionPayload {
  email: string;
  services: string[];
  reason?: string | null;
  captchaToken: string;
}

export interface PendingDeletionRequest {
  id: string;
  email: string;
  services: string[];
  status: string;
  created_at: string;
  verified_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  admin_notes: string | null;
}

export interface RateLimitSummaryItem {
  rateKey: string;
  count: number;
  latestAt: string;
}

export interface MonitoringSummary {
  totalEvents: number;
  bySeverity: {
    info: number;
    warning: number;
    error: number;
    critical: number;
  };
}

export interface AuditLogEntry {
  id: number;
  action: string;
  request_id: string | null;
  actor_type: string;
  actor_id: string | null;
  target_type: string | null;
  target_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface AdminReportsResponse extends EdgeFunctionSuccess {
  generatedAt: string;
  windowHours: number;
  pendingDeletionRequests: PendingDeletionRequest[];
  rateLimitSummary: RateLimitSummaryItem[];
  monitoringSummary: MonitoringSummary;
  recentAuditLogs: AuditLogEntry[];
}

export interface UpdateDeletionStatusResponse extends EdgeFunctionSuccess {
  deletionRequest: PendingDeletionRequest;
}

const getBackendConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Backend is not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    anonKey,
  };
};

const callEdgeFunction = async <T>(
  functionName: string,
  payload: unknown,
  accessToken?: string,
): Promise<T> => {
  const { supabaseUrl, anonKey } = getBackendConfig();
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);
  const requestStart = performance.now();
  let responseStatus = 0;
  let responseRequestId = "";

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${accessToken || anonKey}`,
      },
      body: JSON.stringify(payload),
      signal: abortController.signal,
    });

    responseStatus = response.status;

    let parsed: EdgeFunctionError | T | null = null;
    try {
      parsed = (await response.json()) as EdgeFunctionError | T;
    } catch {
      parsed = null;
    }

    responseRequestId = (parsed as EdgeFunctionError | null)?.requestId || "";

    if (!response.ok) {
      const errorPayload = parsed as EdgeFunctionError | null;
      const message = errorPayload?.error || errorPayload?.message || "Request failed. Please try again.";
      throw new Error(message);
    }

    reportApiMetric({
      endpoint: functionName,
      method: "POST",
      durationMs: Math.round(performance.now() - requestStart),
      statusCode: responseStatus,
      success: true,
      requestId: responseRequestId,
    });

    return parsed as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      reportApiMetric({
        endpoint: functionName,
        method: "POST",
        durationMs: Math.round(performance.now() - requestStart),
        statusCode: 408,
        success: false,
      });

      throw new Error("Request timed out. Please try again.");
    }

    reportApiMetric({
      endpoint: functionName,
      method: "POST",
      durationMs: Math.round(performance.now() - requestStart),
      statusCode: responseStatus,
      success: false,
      requestId: responseRequestId,
    });

    reportClientError(error, {
      source: "backendApi.callEdgeFunction",
      endpoint: functionName,
      statusCode: responseStatus,
      requestId: responseRequestId,
    });

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const submitWaitlist = (payload: SubmitWaitlistPayload) =>
  callEdgeFunction<WaitlistResponse>("submit-waitlist", payload);

export const getWaitlistCount = (product: WaitlistProduct) =>
  callEdgeFunction<WaitlistCountResponse>("get-waitlist-count", { product });

export const submitAccountDeletionRequest = (payload: SubmitAccountDeletionPayload) =>
  callEdgeFunction<AccountDeletionResponse>("submit-account-deletion", payload);

export const confirmAccountDeletionRequest = (token: string) =>
  callEdgeFunction<ConfirmAccountDeletionResponse>("confirm-account-deletion", { token });

export const getAdminReports = (accessToken: string, windowHours = 24) =>
  callEdgeFunction<AdminReportsResponse>("admin-reports", { windowHours }, accessToken);

export const updateAdminDeletionStatus = (
  accessToken: string,
  payload: {
    deletionRequestId: string;
    status: "pending" | "processed" | "rejected";
    adminNotes?: string;
  },
) =>
  callEdgeFunction<UpdateDeletionStatusResponse>(
    "admin-update-deletion-status",
    payload,
    accessToken,
  );
