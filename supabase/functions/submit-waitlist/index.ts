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

type ProductKey = "lume" | "symmetryai";

const tableByProduct: Record<ProductKey, "lume_waitlist" | "symmetryai_waitlist"> = {
  lume: "lume_waitlist",
  symmetryai: "symmetryai_waitlist",
};

const productNames: Record<ProductKey, string> = {
  lume: "Lume",
  symmetryai: "SymmetryAI",
};

const productPaths: Record<ProductKey, string> = {
  lume: "/lume",
  symmetryai: "/symmetryai",
};

const sendWaitlistConfirmationEmail = async (args: {
  apiKey: string;
  from: string;
  to: string;
  product: ProductKey;
  requestId: string;
  frontendBaseUrl: string;
}) => {
  const productName = productNames[args.product];
  const productUrl = `${args.frontendBaseUrl}${productPaths[args.product]}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${args.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from,
      to: [args.to],
      subject: `You're on the ${productName} waitlist`,
      html: `
        <p>Hi,</p>
        <p>You're all set. We have successfully added <strong>${args.to}</strong> to the <strong>${productName}</strong> waitlist.</p>
        <p>Reference ID: <strong>${args.requestId}</strong></p>
        <p>We will email you as soon as early access opens.</p>
        <p>You can learn more here: <a href="${productUrl}">${productUrl}</a></p>
        <p>Thanks,<br/>Aimtera Labs</p>
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

  const product = typeof body.product === "string" ? body.product : "";
  const rawEmail = typeof body.email === "string" ? body.email : "";
  const captchaToken = typeof body.captchaToken === "string" ? body.captchaToken : "";
  const normalizedEmail = rawEmail.trim().toLowerCase();

  if (!(product in tableByProduct)) {
    return errorResponse(400, "Unsupported product", requestId, request);
  }

  if (!isValidEmail(normalizedEmail)) {
    return errorResponse(400, "Please provide a valid email address", requestId, request);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY")?.trim() || "";
  const waitlistEmailFrom =
    Deno.env.get("WAITLIST_EMAIL_FROM")?.trim() ||
    Deno.env.get("DELETION_EMAIL_FROM")?.trim() ||
    "";

  const configuredFrontendUrl = Deno.env.get("FRONTEND_URL")?.trim();
  const originFromRequest = request.headers.get("origin")?.trim();
  const frontendBaseUrl =
    (configuredFrontendUrl && configuredFrontendUrl.length > 0
      ? configuredFrontendUrl
      : originFromRequest && originFromRequest.startsWith("http")
        ? originFromRequest
        : "https://www.aimteralabs.com"
    ).replace(/\/$/, "");

  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !waitlistEmailFrom) {
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
      `waitlist:ip:${product}:${clientIp}`,
      300,
      20,
    );
    const emailAllowed = await enforceRateLimit(
      supabaseAdmin,
      `waitlist:email:${product}:${emailHash}`,
      3600,
      5,
    );

    if (!ipAllowed || !emailAllowed) {
      logEvent("submit-waitlist", requestId, "rate-limited", {
        product,
        clientIp,
      });

      await insertAuditLog(supabaseAdmin, {
        action: "waitlist_rate_limited",
        requestId,
        actorType: "public",
        targetType: "waitlist",
        metadata: {
          product,
          clientIp,
        },
      });

      return errorResponse(429, "Too many requests. Please try again later.", requestId, request);
    }
  } catch (rateLimitError) {
    console.error(`[submit-waitlist][${requestId}]`, rateLimitError);
    return errorResponse(500, "Could not process waitlist request", requestId, request);
  }

  const captchaResult = await verifyTurnstileToken({
    request,
    token: captchaToken,
    action: "waitlist_submit",
  });

  if (!captchaResult.success) {
    await insertAuditLog(supabaseAdmin, {
      action: "waitlist_captcha_failed",
      requestId,
      actorType: "public",
      targetType: "waitlist",
      metadata: {
        product,
      },
    });

    return errorResponse(
      400,
      captchaResult.message || "Please complete the challenge.",
      requestId,
      request,
    );
  }

  const tableName = tableByProduct[product as ProductKey];
  const { error } = await supabaseAdmin.from(tableName).insert({ email: normalizedEmail });

  if (error) {
    if (error.code === "23505") {
      logEvent("submit-waitlist", requestId, "duplicate", {
        product,
      });

      await insertAuditLog(supabaseAdmin, {
        action: "waitlist_duplicate",
        requestId,
        actorType: "public",
        targetType: "waitlist",
        metadata: {
          product,
        },
      });

      return jsonResponse(200, {
        ok: true,
        duplicate: true,
        message: "You are already on the waitlist.",
        requestId,
      }, request);
    }

    console.error(`[submit-waitlist][${requestId}]`, error);
    return errorResponse(500, "Could not submit waitlist request", requestId, request);
  }

  await insertAuditLog(supabaseAdmin, {
    action: "waitlist_submitted",
    requestId,
    actorType: "public",
    targetType: "waitlist",
    metadata: {
      product,
    },
  });

  logEvent("submit-waitlist", requestId, "submitted", {
    product,
  });

  try {
    await sendWaitlistConfirmationEmail({
      apiKey: resendApiKey,
      from: waitlistEmailFrom,
      to: normalizedEmail,
      product: product as ProductKey,
      requestId,
      frontendBaseUrl,
    });
  } catch (emailError) {
    console.error(`[submit-waitlist][${requestId}]`, emailError);

    await insertAuditLog(supabaseAdmin, {
      action: "waitlist_confirmation_email_failed",
      requestId,
      actorType: "system",
      targetType: "waitlist",
      metadata: {
        product,
      },
    });

    return errorResponse(
      502,
      "Request saved, but we could not send the confirmation email. Please try again shortly.",
      requestId,
      request,
    );
  }

  await insertAuditLog(supabaseAdmin, {
    action: "waitlist_confirmation_email_sent",
    requestId,
    actorType: "system",
    targetType: "waitlist",
    metadata: {
      product,
    },
  });

  logEvent("submit-waitlist", requestId, "confirmation-email-sent", {
    product,
  });

  return jsonResponse(200, {
    ok: true,
    duplicate: false,
    message: "You are now on the waitlist. Please check your email for confirmation.",
    requestId,
  }, request);
});
