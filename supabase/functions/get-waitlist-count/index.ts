import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import {
  errorResponse,
  getRequestId,
  jsonResponse,
  optionsResponse,
  safeJsonParse,
} from "../_shared/http.ts";

type ProductKey = "lume" | "symmetryai";

const tableByProduct: Record<ProductKey, "lume_waitlist" | "symmetryai_waitlist"> = {
  lume: "lume_waitlist",
  symmetryai: "symmetryai_waitlist",
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
  if (!(product in tableByProduct)) {
    return errorResponse(400, "Unsupported product", requestId, request);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return errorResponse(500, "Supabase function is not configured", requestId, request);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const tableName = tableByProduct[product as ProductKey];
  const { count, error } = await supabaseAdmin
    .from(tableName)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error(`[get-waitlist-count][${requestId}]`, error);
    return errorResponse(500, "Could not fetch waitlist count", requestId, request);
  }

  return jsonResponse(200, {
    ok: true,
    message: "Waitlist count fetched",
    requestId,
    product,
    count: typeof count === "number" ? count : 0,
  }, request);
});