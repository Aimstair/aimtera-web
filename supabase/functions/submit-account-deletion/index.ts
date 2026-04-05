import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  enforceRateLimit,
  errorResponse,
  getClientIp,
  getRequestId,
  insertAuditLog,
  isValidEmail,
  jsonResponse,
  logEvent,
  optionsResponse,
  safeJsonParse,
  sha256Hex,
  verifyTurnstileToken,
} from "../_shared/http.ts";

const allowedServices = new Set(["RBMarket", "Lume", "SymmetryAI", "All Services"]);

const sendConfirmationEmail = async (args: {
  apiKey: string;
  from: string;
  to: string;
  requestId: string;
  verificationUrl: string;
}) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      subject: "Confirm your Aimtera account deletion request",
      html: `
        <p>Hi,</p>
        <p>We have received your account deletion request for Aimtera Labs.</p>
        <p>Request ID: <strong>${args.requestId}</strong></p>
        <p>Please confirm this request by clicking the link below:</p>
        <p><a href="${args.verificationUrl}">${args.verificationUrl}</a></p>
        <p>This verification link expires in 30 minutes.</p>
        <p>After verification, we will process your request and send another email with an update.</p>
        <p>If you did not submit this request, reply to this email immediately.</p>
        <p>Thanks,<br/>Aimtera Labs Support</p>
      `,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "Resend API error");
  }
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

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const normalizedEmail = rawEmail.trim().toLowerCase();
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";
  const incomingServices = Array.isArray(body.services) ? body.services : [];

  if (!isValidEmail(normalizedEmail)) {
    return errorResponse(400, "Please provide a valid email address", requestId, request);
  }

  const services = incomingServices
    .filter((service): service is string => typeof service === "string")
    .map((service) => service.trim())
    .filter((service) => service.length > 0 && allowedServices.has(service));

  const dedupedServices = [...new Set(services)];
  const normalizedServices = dedupedServices.includes("All Services")
    ? ["All Services"]
    : dedupedServices;

  if (normalizedServices.length === 0) {
    return errorResponse(400, "Select at least one service", requestId, request);
  }

  const normalizedReason = reason.length > 0 ? reason.slice(0, 2000) : null;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const deletionEmailFrom = Deno.env.get("DELETION_EMAIL_FROM");

  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !deletionEmailFrom) {
    return errorResponse(500, "Supabase function is not configured", requestId, request);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const clientIp = getClientIp(request);
  const emailHash = await sha256Hex(normalizedEmail);

  try {
    const ipAllowed = await enforceRateLimit(
      supabaseAdmin,
      `account-deletion:ip:${clientIp}`,
      600,
      10,
    );
    const emailAllowed = await enforceRateLimit(
      supabaseAdmin,
      `account-deletion:email:${emailHash}`,
      86400,
      3,
    );

    if (!ipAllowed || !emailAllowed) {
      logEvent("submit-account-deletion", requestId, "rate-limited", {
        clientIp,
      });

      await insertAuditLog(supabaseAdmin, {
        action: "account_deletion_rate_limited",
        requestId,
        actorType: "public",
        targetType: "account_deletion_request",
        metadata: {
          clientIp,
        },
      });

      return errorResponse(429, "Too many requests. Please try again later.", requestId, request);
    }
  } catch (rateLimitError) {
    console.error(`[submit-account-deletion][${requestId}]`, rateLimitError);
    return errorResponse(500, "Could not process account deletion request", requestId, request);
  }

  const captchaResult = await verifyTurnstileToken({
    request,
    token: captchaToken,
    action: "account_deletion_submit",
  });

  if (!captchaResult.success) {
    await insertAuditLog(supabaseAdmin, {
      action: "account_deletion_captcha_failed",
      requestId,
      actorType: "public",
      targetType: "account_deletion_request",
      metadata: {
        emailHash,
      },
    });

    return errorResponse(
      400,
      captchaResult.message || "Please complete the challenge.",
      requestId,
      request,
    );
  }

  const verificationToken = `${crypto.randomUUID().replaceAll("-", "")}${crypto
    .randomUUID()
    .replaceAll("-", "")}`;
  const verificationTokenHash = await sha256Hex(verificationToken);
  const verificationExpiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  const configuredFrontendUrl = Deno.env.get("FRONTEND_URL")?.trim();
  const originFromRequest = request.headers.get("origin")?.trim();
  const frontendBaseUrl =
    (configuredFrontendUrl && configuredFrontendUrl.length > 0
      ? configuredFrontendUrl
      : originFromRequest && originFromRequest.startsWith("http")
        ? originFromRequest
        : "https://aimteralabs.com"
    ).replace(/\/$/, "");
  const verificationUrl = `${frontendBaseUrl}/account-deletion?verify=${encodeURIComponent(verificationToken)}`;

  const { data, error } = await supabaseAdmin
    .from("account_deletion_requests")
    .insert({
      email: normalizedEmail,
      services: normalizedServices,
      reason: normalizedReason,
      status: "pending_email_verification",
      verification_token_hash: verificationTokenHash,
      verification_expires_at: verificationExpiresAt,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error(`[submit-account-deletion][${requestId}]`, error);
    return errorResponse(500, "Could not submit account deletion request", requestId, request);
  }

  await insertAuditLog(supabaseAdmin, {
    action: "account_deletion_requested",
    requestId,
    actorType: "public",
    targetType: "account_deletion_request",
    targetId: data.id,
    metadata: {
      services: normalizedServices,
      emailHash,
    },
  });

  try {
    await sendConfirmationEmail({
      apiKey: resendApiKey,
      from: deletionEmailFrom,
      to: normalizedEmail,
      requestId: data.id,
      verificationUrl,
    });
  } catch (emailError) {
    console.error(`[submit-account-deletion][${requestId}]`, emailError);

    await supabaseAdmin
      .from("account_deletion_requests")
      .update({ status: "confirmation_email_failed" })
      .eq("id", data.id);

    await insertAuditLog(supabaseAdmin, {
      action: "account_deletion_confirmation_email_failed",
      requestId,
      actorType: "system",
      targetType: "account_deletion_request",
      targetId: data.id,
    });

    return errorResponse(
      502,
      "Request saved, but we could not send the confirmation email. Please contact support.",
      requestId,
      request,
      { deletionRequestId: data.id },
    );
  }

  logEvent("submit-account-deletion", requestId, "verification-email-sent", {
    deletionRequestId: data.id,
  });

  await insertAuditLog(supabaseAdmin, {
    action: "account_deletion_confirmation_email_sent",
    requestId,
    actorType: "system",
    targetType: "account_deletion_request",
    targetId: data.id,
  });

  return jsonResponse(200, {
    ok: true,
    message: "We received your request. Please verify from your email to continue.",
    requestId,
    deletionRequestId: data.id,
  }, request);
});
