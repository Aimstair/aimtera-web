# Aimtera Web

This project includes a React frontend and Supabase backend for:

1. Lume waitlist submissions.
2. SymmetryAI waitlist submissions.
3. Account deletion requests with email verification.
4. Live waitlist count retrieval.
5. Monitoring ingest and Slack-backed alerting.
6. Admin dashboard reports and deletion status management.
7. Audit/change logging for sensitive operations.

## Frontend Environment

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set:

1. `VITE_SUPABASE_URL`
2. `VITE_SUPABASE_ANON_KEY`
3. `VITE_MONITORING_INGEST_URL` (optional)
4. `VITE_MONITORING_API_KEY` (optional override for monitoring ingest auth)
5. `VITE_TURNSTILE_SITE_KEY` (Cloudflare Turnstile site key)

## Supabase Schema

Migration files:

1. `supabase/migrations/20260405173000_waitlists_and_account_deletion.sql`
2. `supabase/migrations/20260405190000_rate_limit_and_deletion_verification.sql`
3. `supabase/migrations/20260406103000_observability_admin_audit.sql`

Tables:

1. `lume_waitlist` (`id`, `email`, `created_at`)
2. `symmetryai_waitlist` (`id`, `email`, `created_at`)
3. `account_deletion_requests` (`id`, `email`, `services`, `reason`, `status`, `verification_token_hash`, `verification_expires_at`, `verified_at`, `created_at`)
4. `request_rate_limits` (`id`, `rate_key`, `created_at`)
5. `audit_logs` (`id`, `action`, `request_id`, `actor_type`, `actor_id`, `target_type`, `target_id`, `metadata`, `created_at`)
6. `monitoring_events` (`id`, `event_type`, `severity`, `event_timestamp`, `request_id`, `source`, `event_payload`, `created_at`)
7. `alert_notifications` (`id`, `alert_key`, `last_sent_at`, `details`, `updated_at`)

## Edge Functions

Functions:

1. `submit-waitlist`
2. `submit-account-deletion`
3. `get-waitlist-count`
4. `confirm-account-deletion`
5. `monitoring-ingest`
6. `admin-reports`
7. `admin-update-deletion-status`

Shared helpers:

1. `supabase/functions/_shared/http.ts`

## Required Supabase Function Secrets

Supabase automatically injects these secrets for edge functions:

1. `SUPABASE_URL`
2. `SUPABASE_SERVICE_ROLE_KEY`

You only need to set these manually:

3. `RESEND_API_KEY`
4. `DELETION_EMAIL_FROM` (verified sender in Resend)
5. `WAITLIST_EMAIL_FROM` (verified sender in Resend for waitlist confirmations; falls back to `DELETION_EMAIL_FROM` when omitted)
6. `FRONTEND_URL` (recommended for account deletion verification links and waitlist email links)
7. `TURNSTILE_SECRET_KEY`
8. `REQUIRE_TURNSTILE` (`true` for production)
9. `CORS_ALLOWED_ORIGINS` (comma-separated allowlist)
10. `SLACK_ALERT_WEBHOOK_URL`
11. `ADMIN_ALLOWLIST_EMAILS` (comma-separated)
12. `ALERT_COOLDOWN_SECONDS` (optional)
13. `ALERT_ERROR_SPIKE_THRESHOLD` (optional)
14. `ALERT_SPIKE_WINDOW_MINUTES` (optional)

Example:

```bash
supabase secrets set RESEND_API_KEY="<resend-api-key>"
supabase secrets set DELETION_EMAIL_FROM="Aimtera Labs <support@yourdomain.com>"
supabase secrets set WAITLIST_EMAIL_FROM="Aimtera Labs <hello@yourdomain.com>"
supabase secrets set FRONTEND_URL="https://www.aimteralabs.com"
supabase secrets set TURNSTILE_SECRET_KEY="<turnstile-secret>"
supabase secrets set REQUIRE_TURNSTILE="true"
supabase secrets set CORS_ALLOWED_ORIGINS="https://aimteralabs.com,https://www.aimteralabs.com"
supabase secrets set SLACK_ALERT_WEBHOOK_URL="https://hooks.slack.com/services/..."
supabase secrets set ADMIN_ALLOWLIST_EMAILS="admin1@aimteralabs.com,admin2@aimteralabs.com"
```

## Local Development (Supabase)

```bash
supabase start
supabase db reset
supabase functions serve --no-verify-jwt
```

`--no-verify-jwt` is useful for local testing only.

## Deploy Backend

```bash
supabase db push
supabase functions deploy submit-waitlist
supabase functions deploy submit-account-deletion
supabase functions deploy get-waitlist-count
supabase functions deploy confirm-account-deletion
supabase functions deploy monitoring-ingest
supabase functions deploy admin-reports
supabase functions deploy admin-update-deletion-status
```

## SPA Rewrites

This project uses `BrowserRouter`, so deep links must rewrite to `index.html`.

1. Netlify-style rewrite is provided in `public/_redirects`.
2. Vercel rewrites are provided in `vercel.json`.
3. For other hosts, configure a catch-all rewrite to `/index.html`.

## Account Deletion Verification Flow

1. User submits deletion request on `/account-deletion`.
2. Backend stores request with `pending_email_verification` status and token hash.
3. User receives email with a verification link.
4. Frontend calls `confirm-account-deletion` using the token.
5. Backend marks request `pending` with `verified_at` timestamp.

## Abuse Protection

Public functions apply server-side throttling using `request_rate_limits`:

1. Waitlist submit: per-IP and per-email-key throttles.
2. Account deletion submit: per-IP and per-email-key throttles.
3. Account deletion confirm: per-IP verification throttles.
4. Monitoring ingest: per-IP event ingest throttles.
5. Cloudflare Turnstile challenge verification on public forms.

## Admin Reports Dashboard

Route:

1. `/admin/reports`

Auth model:

1. Sign in via Supabase magic link.
2. Backend validates the access token and checks `ADMIN_ALLOWLIST_EMAILS`.

Capabilities:

1. View pending account deletion queue.
2. Review rate-limit incident summaries.
3. Review monitoring severity counts.
4. Update deletion request status (`pending`, `processed`, `rejected`) with admin notes.

## Monitoring

Frontend supports optional error and API timing ingest:

1. Set `VITE_MONITORING_INGEST_URL` to enable client error + API metric forwarding.
2. Set `VITE_MONITORING_API_KEY` (or rely on `VITE_SUPABASE_ANON_KEY`) for authenticated ingest.
3. Backend persists monitoring events and can emit Slack alerts for critical and spike conditions.

## CI/CD, Smoke, and Uptime

GitHub workflows:

1. `.github/workflows/ci.yml`
2. `.github/workflows/uptime-checks.yml`

Quality gates include:

1. Lint
2. Typecheck
3. Unit tests
4. Build
5. Performance budget checks
6. Playwright end-to-end tests

Smoke checks:

1. `npm run smoke:prod`
2. Requires `SMOKE_BASE_URL`.
3. Optional function probe via `SMOKE_FUNCTIONS_URL` and `SMOKE_SUPABASE_ANON_KEY`.

Runbook:

1. `docs/deployment-runbook.md`

## SymmetryAI Legacy CSV Migration

Use:

1. `supabase/scripts/import_symmetryai_waitlist.sql`

Workflow:

1. Load legacy CSV into staging table `symmetryai_waitlist_import`.
2. Run insert section to normalize and deduplicate into `symmetryai_waitlist`.
3. Validate counts.
4. Drop staging table.

Expected legacy columns:

1. `email`
2. `created_at` (optional)

## Runtime Behavior

1. Waitlist submissions are idempotent per email (duplicate emails return a handled response).
2. Account deletion requests require email-link verification before entering processing queue.
3. Audit records are written for sensitive deletion and admin lifecycle actions.
4. Route metadata is updated client-side for title/description/canonical/OG tags.
5. Chat assistant is local, deterministic, and limited to product/support guidance.
