create table if not exists public.audit_logs (
  id bigserial primary key,
  action text not null,
  request_id text,
  actor_type text not null default 'system',
  actor_id text,
  target_type text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_logs_action_created_at
  on public.audit_logs (action, created_at desc);

create index if not exists idx_audit_logs_target
  on public.audit_logs (target_type, target_id, created_at desc);

create table if not exists public.monitoring_events (
  id bigserial primary key,
  event_type text not null,
  severity text not null default 'info',
  event_timestamp timestamptz not null,
  request_id text,
  source text,
  event_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint monitoring_events_event_type_check check (
    event_type in ('client-error', 'api-metric', 'uptime-check', 'function-error')
  ),
  constraint monitoring_events_severity_check check (
    severity in ('info', 'warning', 'error', 'critical')
  )
);

create index if not exists idx_monitoring_events_type_created_at
  on public.monitoring_events (event_type, created_at desc);

create index if not exists idx_monitoring_events_severity_created_at
  on public.monitoring_events (severity, created_at desc);

create table if not exists public.alert_notifications (
  id bigserial primary key,
  alert_key text not null unique,
  last_sent_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_alert_notifications_last_sent_at
  on public.alert_notifications (last_sent_at desc);

alter table public.account_deletion_requests
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by text,
  add column if not exists admin_notes text;

alter table public.audit_logs enable row level security;
alter table public.monitoring_events enable row level security;
alter table public.alert_notifications enable row level security;

revoke all on table public.audit_logs from anon, authenticated;
revoke all on table public.monitoring_events from anon, authenticated;
revoke all on table public.alert_notifications from anon, authenticated;
