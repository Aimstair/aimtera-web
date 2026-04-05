create extension if not exists "pgcrypto";

create table if not exists public.lume_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint lume_waitlist_email_unique unique (email),
  constraint lume_waitlist_email_lowercase check (email = lower(email))
);

create table if not exists public.symmetryai_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint symmetryai_waitlist_email_unique unique (email),
  constraint symmetryai_waitlist_email_lowercase check (email = lower(email))
);

create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  services text[] not null,
  reason text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  constraint account_deletion_requests_email_lowercase check (email = lower(email)),
  constraint account_deletion_requests_status_check check (
    status in ('pending', 'confirmation_email_failed', 'processed', 'rejected')
  )
);

create index if not exists idx_lume_waitlist_created_at on public.lume_waitlist (created_at desc);
create index if not exists idx_symmetryai_waitlist_created_at on public.symmetryai_waitlist (created_at desc);
create index if not exists idx_account_deletion_requests_created_at on public.account_deletion_requests (created_at desc);
create index if not exists idx_account_deletion_requests_email on public.account_deletion_requests (email);

alter table public.lume_waitlist enable row level security;
alter table public.symmetryai_waitlist enable row level security;
alter table public.account_deletion_requests enable row level security;

revoke all on table public.lume_waitlist from anon, authenticated;
revoke all on table public.symmetryai_waitlist from anon, authenticated;
revoke all on table public.account_deletion_requests from anon, authenticated;
