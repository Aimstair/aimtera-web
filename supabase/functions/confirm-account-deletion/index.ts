import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  enforceRateLimit,
  errorResponse,
  getClientIp,
  getRequestId,
  insertAuditLog,
  jsonResponse,
  logEvent,
  optionsResponse,
  safeJsonParse,
  sha256Hex,
} from "../_shared/http.ts";

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

  const rawToken = typeof body.token === "string" ? body.token : "";
  const verificationToken = rawToken.trim();
  if (!verificationToken) {
    return errorResponse(400, "Missing verification token", requestId, request);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return errorResponse(500, "Supabase function is not configured", requestId, request);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const clientIp = getClientIp(request);
  try {
    const ipAllowed = await enforceRateLimit(
      supabaseAdmin,
      `confirm-account-deletion:ip:${clientIp}`,
      900,
      30,
    );

    if (!ipAllowed) {
      logEvent("confirm-account-deletion", requestId, "rate-limited", {
        clientIp,
      });

      await insertAuditLog(supabaseAdmin, {
        action: "account_deletion_confirmation_rate_limited",
        requestId,
        actorType: "public",
        targetType: "account_deletion_request",
        metadata: {
          clientIp,
        },
      });

      return errorResponse(429, "Too many verification attempts. Please try later.", requestId, request);
    }
  } catch (rateLimitError) {
    console.error(`[confirm-account-deletion][${requestId}]`, rateLimitError);
    return errorResponse(500, "Could not process verification", requestId, request);
  }

  const verificationTokenHash = await sha256Hex(verificationToken);
  const nowIso = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("account_deletion_requests")
    .select("id, status, verified_at, verification_expires_at")
    .eq("verification_token_hash", verificationTokenHash)
    .maybeSingle();

  if (error) {
    console.error(`[confirm-account-deletion][${requestId}]`, error);
    return errorResponse(500, "Could not verify request", requestId, request);
  }

  if (!data) {
    await insertAuditLog(supabaseAdmin, {
      action: "account_deletion_confirmation_invalid_token",
      requestId,
      actorType: "public",
      targetType: "account_deletion_request",
    });

    return errorResponse(400, "Invalid verification token", requestId, request);
  }

  if (data.verified_at || data.status === "pending") {
    return jsonResponse(200, {
      ok: true,
      message: "This deletion request is already verified.",
      requestId,
      deletionRequestId: data.id,
      alreadyVerified: true,
    }, request);
  }

  const expiryEpoch = data.verification_expires_at
    ? Date.parse(data.verification_expires_at)
    : Number.NaN;

  if (!Number.isFinite(expiryEpoch) || expiryEpoch < Date.now()) {
    await supabaseAdmin
      .from("account_deletion_requests")
      .update({
        status: "verification_expired",
        verification_token_hash: null,
      })
      .eq("id", data.id);

    await insertAuditLog(supabaseAdmin, {
      action: "account_deletion_confirmation_expired",
      requestId,
      actorType: "public",
      targetType: "account_deletion_request",
      targetId: data.id,
    });

    return errorResponse(400, "Verification link expired. Submit a new request.", requestId, request);
  }

  const { error: updateError } = await supabaseAdmin
    .from("account_deletion_requests")
    .update({
      status: "pending",
      verified_at: nowIso,
      verification_token_hash: null,
      verification_expires_at: null,
    })
    .eq("id", data.id);

  if (updateError) {
    console.error(`[confirm-account-deletion][${requestId}]`, updateError);
    return errorResponse(500, "Could not finalize verification", requestId, request);
  }

  await insertAuditLog(supabaseAdmin, {
    action: "account_deletion_confirmed",
    requestId,
    actorType: "public",
    targetType: "account_deletion_request",
    targetId: data.id,
  });

  logEvent("confirm-account-deletion", requestId, "verified", {
    deletionRequestId: data.id,
  });

  return jsonResponse(200, {
    ok: true,
    message: "Your account deletion request has been verified.",
    requestId,
    deletionRequestId: data.id,
    alreadyVerified: false,
  }, request);
});
