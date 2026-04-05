const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim() || "";
const MONITORING_ENDPOINT =
  import.meta.env.VITE_MONITORING_INGEST_URL?.trim() ||
  (SUPABASE_URL ? `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/monitoring-ingest` : "");
const MONITORING_API_KEY =
  import.meta.env.VITE_MONITORING_API_KEY?.trim() ||
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  "";

interface MonitoringPayload {
  type: "client-error" | "api-metric";
  timestamp: string;
  payload: Record<string, unknown>;
}

interface ApiMetricPayload {
  endpoint: string;
  method: string;
  durationMs: number;
  statusCode: number;
  success: boolean;
  requestId?: string;
}

let listenersAttached = false;

const canSend = () => typeof window !== "undefined" && MONITORING_ENDPOINT.length > 0;

const sendPayload = (body: MonitoringPayload) => {
  if (!canSend()) {
    return;
  }

  const serialized = JSON.stringify(body);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (MONITORING_API_KEY.length > 0) {
    headers.apikey = MONITORING_API_KEY;
    headers.Authorization = `Bearer ${MONITORING_API_KEY}`;
  }

  if (
    MONITORING_API_KEY.length === 0 &&
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function"
  ) {
    const blob = new Blob([serialized], { type: "application/json" });
    navigator.sendBeacon(MONITORING_ENDPOINT, blob);
    return;
  }

  void fetch(MONITORING_ENDPOINT, {
    method: "POST",
    headers,
    body: serialized,
    keepalive: true,
  });
};

export const reportClientError = (error: unknown, context: Record<string, unknown> = {}) => {
  const normalizedError =
    error instanceof Error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : {
          message: String(error),
        };

  sendPayload({
    type: "client-error",
    timestamp: new Date().toISOString(),
    payload: {
      ...context,
      ...normalizedError,
    },
  });
};

export const reportApiMetric = (metric: ApiMetricPayload) => {
  sendPayload({
    type: "api-metric",
    timestamp: new Date().toISOString(),
    payload: { ...metric },
  });
};

export const setupGlobalErrorMonitoring = () => {
  if (listenersAttached || typeof window === "undefined") {
    return;
  }

  listenersAttached = true;

  window.addEventListener("error", (event) => {
    reportClientError(event.error || event.message, {
      source: "window.onerror",
      filename: event.filename,
      line: event.lineno,
      column: event.colno,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportClientError(event.reason, {
      source: "window.unhandledrejection",
    });
  });
};
