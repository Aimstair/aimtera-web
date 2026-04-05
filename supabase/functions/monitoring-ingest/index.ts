import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  enforceRateLimit,
  errorResponse,
  getClientIp,
  getRequestId,
  insertAuditLog,
  jsonResponse,
  optionsResponse,
  safeJsonParse,
  sendSlackAlert,
} from "../_shared/http.ts";

type EventType = "client-error" | "api-metric" | "uptime-check" | "function-error";
type Severity = "info" | "warning" | "error" | "critical";

interface MonitoringEvent {
  type: EventType;
  timestamp: string;
  payload: Record<string, unknown>;
}

const allowedEventTypes = new Set<EventType>([
  "client-error",
  "api-metric",
  "uptime-check",
  "function-error",
]);

const getSeverity = (event: MonitoringEvent): Severity => {
  const statusCode =
    typeof event.payload.statusCode === "number"
      ? event.payload.statusCode
      : Number(event.payload.statusCode || 0);

  if (event.type === "client-error" || event.type === "function-error") {
    return "error";
  }

  if (statusCode >= 500) {
    return "critical";
  }

  if (statusCode >= 400) {
    return "warning";
  }

  return "info";
};

const parseEvents = (body: Record<string, unknown>): MonitoringEvent[] => {
  const fromBatch = Array.isArray(body.events) ? body.events : null;

  const rawEvents =
    fromBatch ||
    (body.type
      ? [body]
      : []);

  return rawEvents
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => {
      const type = typeof item.type === "string" ? item.type : "";
      const timestamp = typeof item.timestamp === "string" ? item.timestamp : new Date().toISOString();
      const payload =
        item.payload && typeof item.payload === "object" && !Array.isArray(item.payload)
          ? (item.payload as Record<string, unknown>)
          : {};

      return {
        type: type as EventType,
        timestamp,
        payload,
      };
    })
    .filter((event) => allowedEventTypes.has(event.type));
};

const shouldSendWithCooldown = async (
  supabaseAdmin: ReturnType<typeof createClient>,
  alertKey: string,
  cooldownSeconds: number,
  details: Record<string, unknown>,
) => {
  const { data, error } = await supabaseAdmin
    .from("alert_notifications")
    .select("last_sent_at")
    .eq("alert_key", alertKey)
    .maybeSingle();

  if (error) {
    return false;
  }

  const now = Date.now();
  const previous = data?.last_sent_at ? Date.parse(data.last_sent_at) : Number.NaN;
  const onCooldown = Number.isFinite(previous) && now - previous < cooldownSeconds * 1000;

  if (onCooldown) {
    return false;
  }

  await supabaseAdmin.from("alert_notifications").upsert(
    {
      alert_key: alertKey,
      last_sent_at: new Date(now).toISOString(),
      updated_at: new Date(now).toISOString(),
      details,
    },
    { onConflict: "alert_key" },
  );

  return true;
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
    const allowed = await enforceRateLimit(
      supabaseAdmin,
      `monitoring-ingest:ip:${clientIp}`,
      60,
      240,
    );

    if (!allowed) {
      return errorResponse(429, "Too many monitoring events", requestId, request);
    }
  } catch {
    return errorResponse(500, "Could not process monitoring event", requestId, request);
  }

  const events = parseEvents(body);
  if (events.length === 0) {
    return errorResponse(400, "No valid monitoring events received", requestId, request);
  }

  const normalizedRows = events.slice(0, 25).map((event) => {
    const eventTimestamp = Number.isFinite(Date.parse(event.timestamp))
      ? event.timestamp
      : new Date().toISOString();

    const source = typeof event.payload.source === "string" ? event.payload.source : "frontend";

    return {
      event_type: event.type,
      severity: getSeverity(event),
      event_timestamp: eventTimestamp,
      request_id: typeof event.payload.requestId === "string" ? event.payload.requestId : null,
      source,
      event_payload: event.payload,
    };
  });

  const { error: insertError } = await supabaseAdmin
    .from("monitoring_events")
    .insert(normalizedRows);

  if (insertError) {
    console.error(`[monitoring-ingest][${requestId}]`, insertError);
    return errorResponse(500, "Could not persist monitoring events", requestId, request);
  }

  let alerted = false;
  const severeEvent = normalizedRows.find((row) => row.severity === "critical");

  if (severeEvent) {
    const cooldownSeconds = Number(Deno.env.get("ALERT_COOLDOWN_SECONDS") || "900");
    const allowAlert = await shouldSendWithCooldown(
      supabaseAdmin,
      `critical:${severeEvent.event_type}`,
      Number.isFinite(cooldownSeconds) ? cooldownSeconds : 900,
      {
        requestId,
        eventType: severeEvent.event_type,
        severity: severeEvent.severity,
      },
    );

    if (allowAlert) {
      alerted = await sendSlackAlert("Critical monitoring event", {
        requestId,
        eventType: severeEvent.event_type,
        payload: severeEvent.event_payload,
      });
    }
  }

  const spikeWindowMinutes = Number(Deno.env.get("ALERT_SPIKE_WINDOW_MINUTES") || "5");
  const spikeThreshold = Number(Deno.env.get("ALERT_ERROR_SPIKE_THRESHOLD") || "25");

  const windowStart = new Date(
    Date.now() - (Number.isFinite(spikeWindowMinutes) ? spikeWindowMinutes : 5) * 60 * 1000,
  ).toISOString();

  const { count: recentErrorCount } = await supabaseAdmin
    .from("monitoring_events")
    .select("id", { count: "exact", head: true })
    .in("severity", ["error", "critical"])
    .gte("created_at", windowStart);

  if ((recentErrorCount || 0) >= (Number.isFinite(spikeThreshold) ? spikeThreshold : 25)) {
    const allowAlert = await shouldSendWithCooldown(
      supabaseAdmin,
      "error-spike",
      900,
      {
        requestId,
        recentErrorCount,
      },
    );

    if (allowAlert) {
      const sent = await sendSlackAlert("Error spike detected", {
        requestId,
        recentErrorCount,
        windowStart,
      });
      alerted = alerted || sent;
    }
  }

  await insertAuditLog(supabaseAdmin, {
    action: "monitoring_ingest_processed",
    requestId,
    actorType: "system",
    targetType: "monitoring_events",
    metadata: {
      ingested: normalizedRows.length,
      alerted,
    },
  });

  return jsonResponse(
    200,
    {
      ok: true,
      message: "Monitoring events processed",
      requestId,
      ingested: normalizedRows.length,
      alerted,
    },
    request,
  );
});
