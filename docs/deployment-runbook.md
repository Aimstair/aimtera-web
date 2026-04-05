# Deployment Runbook

## Pre-Deploy Checklist

1. CI quality gates pass on the target commit.
2. `test:e2e` and `test:smoke` pass.
3. Required secrets are configured in Vercel, Supabase, and GitHub Actions.
4. Supabase migrations are applied (`supabase db push`).
5. Edge functions are deployed for all active endpoints.

## Required Edge Functions

1. `submit-waitlist`
2. `submit-account-deletion`
3. `confirm-account-deletion`
4. `get-waitlist-count`
5. `monitoring-ingest`
6. `admin-reports`
7. `admin-update-deletion-status`

## Required Function Secrets

1. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (managed by Supabase)
2. `RESEND_API_KEY`
3. `DELETION_EMAIL_FROM`
4. `WAITLIST_EMAIL_FROM` (optional fallback to `DELETION_EMAIL_FROM`, recommended to set explicitly)
5. `FRONTEND_URL`
6. `TURNSTILE_SECRET_KEY`
7. `CORS_ALLOWED_ORIGINS`

## Deploy Procedure

1. Merge approved PR into `main`.
2. Wait for `CI Quality Gates` workflow success.
3. Verify Vercel production deployment completes.
4. Run production smoke workflow if it did not auto-run.
5. Confirm synthetic uptime checks are green.

## Smoke Validation

Check these routes:

1. `/`
2. `/lume`
3. `/symmetryai`
4. `/account-deletion`

Check at least one function endpoint:

1. `get-waitlist-count` for product `lume`

## Rollback Procedure

1. In Vercel dashboard, locate the last known healthy deployment.
2. Promote that deployment to production.
3. Re-run smoke checks against production.
4. If issue is migration-related, deploy a hotfix migration or restore from latest backup snapshot.
5. Post incident summary in internal Slack with root cause and fix plan.

## Incident Severity Guidelines

1. Critical: Home route down, account deletion flow blocked, or all public forms failing.
2. High: Any one product waitlist unavailable or elevated 5xx rate.
3. Medium: Delayed alerts, isolated admin dashboard failures.

## Post-Incident Actions

1. Add an audit log entry for manual admin actions.
2. Capture timeline, impact, and remediation tasks.
3. Create follow-up PR with automated guardrails if gap was not covered by CI.
