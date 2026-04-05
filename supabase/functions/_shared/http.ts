import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

type JsonObject = Record<string, unknown>;

const DEFAULT_ALLOWED_ORIGINS = [
  "https://aimteralabs.com",
  "https://www.aimteralabs.com",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
];

const DEFAULT_ALLOWED_HEADERS =
  "authorization, x-client-info, apikey, content-type, x-request-id";

const parseCsvEnv = (value: string | undefined) =>
  (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const resolveAllowedOrigins = () => {
  const fromEnv = parseCsvEnv(Deno.env.get("CORS_ALLOWED_ORIGINS"));
  return fromEnv.length > 0 ? fromEnv : DEFAULT_ALLOWED_ORIGINS;
};

const isAllowedOrigin = (origin: string, allowedOrigins: string[]) => {
  if (!origin) {
    return false;
  }

  return allowedOrigins.some((allowed) => {
    if (allowed === "*") {
      return true;
    }

    return allowed === origin;
  });
};

export const getCorsHeaders = (request: Request, allowedMethods = "POST, OPTIONS") => {
  const allowedOrigins = resolveAllowedOrigins();
  const requestOrigin = request.headers.get("origin") || "";
  const fallbackOrigin = allowedOrigins[0] || "https://www.aimteralabs.com";
  const allowOrigin = isAllowedOrigin(requestOrigin, allowedOrigins)
    ? requestOrigin
    : fallbackOrigin;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": DEFAULT_ALLOWED_HEADERS,
    "Access-Control-Allow-Methods": allowedMethods,
    Vary: "Origin",
  };
};

export const optionsResponse = (request: Request, allowedMethods = "POST, OPTIONS") =>
  new Response("ok", {
    headers: getCorsHeaders(request, allowedMethods),
  });

export const jsonResponse = (
  status: number,
  body: JsonObject,
  request: Request,
  allowedMethods = "POST, OPTIONS",
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(request, allowedMethods),
      "Content-Type": "application/json",
    },
  });

export const getRequestId = (request: Request) =>
  request.headers.get("x-request-id") || crypto.randomUUID();

export const safeJsonParse = async (request: Request): Promise<JsonObject | null> => {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return null;
    }

    return body as JsonObject;
  } catch {
    return null;
  }
};

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-client-ip") ||
    "unknown"
  );
};

const isTurnstileRequired = () =>
  (Deno.env.get("REQUIRE_TURNSTILE") || "true").toLowerCase() !== "false";

interface VerifyTurnstileArgs {
  request: Request;
  token: string;
  action?: string;
}

interface VerifyTurnstileResult {
  success: boolean;
  message?: string;
  bypassed?: boolean;
}

export const verifyTurnstileToken = async (
  args: VerifyTurnstileArgs,
): Promise<VerifyTurnstileResult> => {
  if (!isTurnstileRequired()) {
    return { success: true, bypassed: true };
  }

  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    return {
      success: false,
      message: "Challenge system is not configured.",
    };
  }

  const token = args.token.trim();
  if (!token) {
    return {
      success: false,
      message: "Please complete the challenge before submitting.",
    };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  form.set("remoteip", getClientIp(args.request));

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      },
    );

    const parsed = (await response.json()) as {
      success?: boolean;
      action?: string;
      "error-codes"?: string[];
    };

    if (!response.ok || !parsed?.success) {
      return {
        success: false,
        message: "Challenge verification failed. Please try again.",
      };
    }

    if (args.action && parsed.action && parsed.action !== args.action) {
      return {
        success: false,
        message: "Challenge action mismatch. Please retry.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Challenge verification is currently unavailable.",
    };
  }
};

export const sha256Hex = async (value: string) => {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const enforceRateLimit = async (
  supabaseAdmin: SupabaseClient,
  key: string,
  windowSeconds: number,
  maxRequests: number,
) => {
  const windowStartIso = new Date(Date.now() - windowSeconds * 1000).toISOString();

  const { error: insertError } = await supabaseAdmin.from("request_rate_limits").insert({
    rate_key: key,
  });

  if (insertError) {
    throw new Error(`Could not persist rate limit event: ${insertError.message}`);
  }

  const { count, error: countError } = await supabaseAdmin
    .from("request_rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("rate_key", key)
    .gte("created_at", windowStartIso);

  if (countError) {
    throw new Error(`Could not evaluate rate limit: ${countError.message}`);
  }

  return (count ?? 0) <= maxRequests;
};

interface AuditLogEntry {
  action: string;
  requestId: string;
  actorType?: string;
  actorId?: string | null;
  targetType?: string;
  targetId?: string | null;
  metadata?: JsonObject;
}

export const insertAuditLog = async (
  supabaseAdmin: SupabaseClient,
  entry: AuditLogEntry,
) => {
  const { error } = await supabaseAdmin.from("audit_logs").insert({
    action: entry.action,
    request_id: entry.requestId,
    actor_type: entry.actorType || "system",
    actor_id: entry.actorId || null,
    target_type: entry.targetType || null,
    target_id: entry.targetId || null,
    metadata: entry.metadata || {},
  });

  if (error) {
    console.error("[audit-log]", error);
  }
};

export const sendSlackAlert = async (title: string, details: JsonObject = {}) => {
  const webhook = Deno.env.get("SLACK_ALERT_WEBHOOK_URL")?.trim() || "";
  if (!webhook) {
    return false;
  }

  const prettyDetails = JSON.stringify(details, null, 2).slice(0, 3500);
  const body = {
    text: title,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${title}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\`\`\`${prettyDetails}\`\`\``,
        },
      },
    ],
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const logEvent = (
  scope: string,
  requestId: string,
  event: string,
  data: JsonObject = {},
) => {
  console.log(
    JSON.stringify({
      scope,
      requestId,
      event,
      timestamp: new Date().toISOString(),
      ...data,
    }),
  );
};

export const errorResponse = (
  status: number,
  message: string,
  requestId: string,
  request: Request,
  extra: JsonObject = {},
) =>
  jsonResponse(status, {
    ok: false,
    error: message,
    requestId,
    ...extra,
  }, request);
