import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  errorResponse,
  getRequestId,
  insertAuditLog,
  jsonResponse,
  optionsResponse,
  safeJsonParse,
} from "../_shared/http.ts";

const allowedStatuses = new Set([
  "pending",
  "processed",
  "rejected",
]);

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

  const body = await safeJsonParse(request);
  if (!body) {
    return errorResponse(400, "Invalid JSON payload", requestId, request);
  }

  const deletionRequestId = typeof body.deletionRequestId === "string" ? body.deletionRequestId.trim() : "";
  const nextStatus = typeof body.status === "string" ? body.status.trim() : "";
  const adminNotes = typeof body.adminNotes === "string" ? body.adminNotes.trim().slice(0, 2000) : null;

  if (!deletionRequestId) {
    return errorResponse(400, "deletionRequestId is required", requestId, request);
  }

  if (!allowedStatuses.has(nextStatus)) {
    return errorResponse(400, "Unsupported status", requestId, request);
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
    return errorResponse(403, "You are not authorized for this action", requestId, request);
  }

  const { data, error } = await supabaseAdmin
    .from("account_deletion_requests")
    .update({
      status: nextStatus,
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminEmail,
      admin_notes: adminNotes,
    })
    .eq("id", deletionRequestId)
    .select("id, status, reviewed_at, reviewed_by, admin_notes")
    .single();

  if (error || !data) {
    return errorResponse(500, "Could not update deletion request", requestId, request);
  }

  await insertAuditLog(supabaseAdmin, {
    action: "admin_deletion_status_updated",
    requestId,
    actorType: "admin",
    actorId: user.id,
    targetType: "account_deletion_request",
    targetId: deletionRequestId,
    metadata: {
      adminEmail,
      status: nextStatus,
      hasNotes: Boolean(adminNotes && adminNotes.length > 0),
    },
  });

  return jsonResponse(
    200,
    {
      ok: true,
      message: "Deletion request updated",
      requestId,
      deletionRequest: data,
    },
    request,
  );
});
