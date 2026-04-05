import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  errorResponse,
  getRequestId,
  insertAuditLog,
  jsonResponse,
  optionsResponse,
  safeJsonParse,
} from "../_shared/http.ts";

const parseAllowlist = () =>
  (Deno.env.get("ADMIN_ALLOWLIST_EMAILS") || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.length > 0);

const getAuthToken = (request: Request) => {
  const authHeader = request.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return "";
  }

  return authHeader.slice("Bearer ".length).trim();
};

Deno.serve(async (request) => {
  const requestId = getRequestId(request);

  if (request.method === "OPTIONS") {
    return optionsResponse(request);
  }

  if (request.method !== "POST") {
    return errorResponse(405, "Method not allowed", requestId, request);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return errorResponse(500, "Supabase function is not configured", requestId, request);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const token = getAuthToken(request);
  if (!token) {
    return errorResponse(401, "Missing admin access token", requestId, request);
  }

  const {
    data: { user },
    error: authError,
  } = await supabaseAdmin.auth.getUser(token);

  if (authError || !user?.email) {
    return errorResponse(401, "Invalid admin session", requestId, request);
  }

  const adminEmail = user.email.toLowerCase();
  const allowlist = parseAllowlist();

  if (allowlist.length === 0 || !allowlist.includes(adminEmail)) {
    return errorResponse(403, "You are not authorized to access admin reports", requestId, request);
  }

  const body = (await safeJsonParse(request)) || {};
  const windowHoursRaw =
    typeof body.windowHours === "number"
      ? body.windowHours
      : Number(body.windowHours || 24);
  const windowHours = Number.isFinite(windowHoursRaw)
    ? Math.min(Math.max(windowHoursRaw, 1), 168)
    : 24;

  const windowStart = new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString();

  const { data: pendingRequests, error: pendingError } = await supabaseAdmin
    .from("account_deletion_requests")
    .select(
      "id, email, services, status, created_at, verified_at, reviewed_at, reviewed_by, admin_notes",
    )
    .in("status", ["pending_email_verification", "pending", "confirmation_email_failed", "verification_expired"])
    .order("created_at", { ascending: false })
    .limit(200);

  if (pendingError) {
    return errorResponse(500, "Could not load pending deletion requests", requestId, request);
  }

  const { data: rateLimitRows, error: rateError } = await supabaseAdmin
    .from("request_rate_limits")
    .select("rate_key, created_at")
    .gte("created_at", windowStart)
    .order("created_at", { ascending: false })
    .limit(2000);

  if (rateError) {
    return errorResponse(500, "Could not load rate-limit incidents", requestId, request);
  }

  const incidentsByKey = new Map<string, { rateKey: string; count: number; latestAt: string }>();

  for (const row of rateLimitRows || []) {
    const key = row.rate_key;
    const existing = incidentsByKey.get(key);

    if (!existing) {
      incidentsByKey.set(key, {
        rateKey: key,
        count: 1,
        latestAt: row.created_at,
      });
      continue;
    }

    existing.count += 1;
    if (Date.parse(row.created_at) > Date.parse(existing.latestAt)) {
      existing.latestAt = row.created_at;
    }
  }

  const rateLimitSummary = [...incidentsByKey.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  const { data: auditRows, error: auditError } = await supabaseAdmin
    .from("audit_logs")
    .select("id, action, request_id, actor_type, actor_id, target_type, target_id, metadata, created_at")
    .gte("created_at", windowStart)
    .order("created_at", { ascending: false })
    .limit(250);

  if (auditError) {
    return errorResponse(500, "Could not load audit logs", requestId, request);
  }

  const { data: monitoringRows, error: monitoringError } = await supabaseAdmin
    .from("monitoring_events")
    .select("severity, event_type, created_at")
    .gte("created_at", windowStart)
    .order("created_at", { ascending: false })
    .limit(2000);

  if (monitoringError) {
    return errorResponse(500, "Could not load monitoring summary", requestId, request);
  }

  const monitoringSummary = {
    totalEvents: (monitoringRows || []).length,
    bySeverity: {
      info: 0,
      warning: 0,
      error: 0,
      critical: 0,
    },
  };

  for (const row of monitoringRows || []) {
    if (row.severity in monitoringSummary.bySeverity) {
      monitoringSummary.bySeverity[row.severity as keyof typeof monitoringSummary.bySeverity] += 1;
    }
  }

  await insertAuditLog(supabaseAdmin, {
    action: "admin_reports_viewed",
    requestId,
    actorType: "admin",
    actorId: user.id,
    targetType: "admin_reports",
    metadata: {
      adminEmail,
      windowHours,
    },
  });

  return jsonResponse(
    200,
    {
      ok: true,
      message: "Admin reports loaded",
      requestId,
      generatedAt: new Date().toISOString(),
      windowHours,
      pendingDeletionRequests: pendingRequests || [],
      rateLimitSummary,
      monitoringSummary,
      recentAuditLogs: auditRows || [],
    },
    request,
  );
});
