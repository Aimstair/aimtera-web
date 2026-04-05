create table if not exists public.request_rate_limits (
  id bigserial primary key,
  rate_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_request_rate_limits_key_created_at
  on public.request_rate_limits (rate_key, created_at desc);

alter table public.account_deletion_requests
  add column if not exists verification_token_hash text,
  add column if not exists verification_expires_at timestamptz,
  add column if not exists verified_at timestamptz;

create index if not exists idx_account_deletion_requests_verification_token_hash
  on public.account_deletion_requests (verification_token_hash);

alter table public.account_deletion_requests
  drop constraint if exists account_deletion_requests_status_check;

alter table public.account_deletion_requests
  add constraint account_deletion_requests_status_check
  check (
    status in (
      'pending_email_verification',
      'pending',
      'confirmation_email_failed',
      'verification_expired',
      'processed',
      'rejected'
    )
  );

alter table public.request_rate_limits enable row level security;
revoke all on table public.request_rate_limits from anon, authenticated;
