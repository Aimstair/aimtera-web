const baseUrl = (process.env.SMOKE_BASE_URL || "").replace(/\/$/, "");
const functionsUrl = (process.env.SMOKE_FUNCTIONS_URL || "").replace(/\/$/, "");
const anonKey = process.env.SMOKE_SUPABASE_ANON_KEY || "";

if (!baseUrl) {
  console.error("SMOKE_BASE_URL is required.");
  process.exit(1);
}

const routeChecks = [
  "/",
  "/lume",
  "/symmetryai",
  "/account-deletion",
];

const failures = [];

for (const route of routeChecks) {
  const url = `${baseUrl}${route}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "aimtera-smoke-check/1.0",
      },
    });

    if (!response.ok) {
      failures.push(`${url} returned ${response.status}`);
      continue;
    }

    const html = await response.text();
    if (!html.includes("id=\"root\"")) {
      failures.push(`${url} did not include root app container.`);
    }
  } catch (error) {
    failures.push(`${url} failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (functionsUrl && anonKey) {
  const functionName = "get-waitlist-count";
  const url = `${functionsUrl}/${functionName}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ product: "lume" }),
    });

    if (!response.ok) {
      failures.push(`${url} returned ${response.status}`);
    } else {
      const parsed = await response.json();
      if (!parsed || parsed.ok !== true || typeof parsed.count !== "number") {
        failures.push(`${url} returned an unexpected payload.`);
      }
    }
  } catch (error) {
    failures.push(`${url} failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error("Smoke checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Smoke checks passed.");
