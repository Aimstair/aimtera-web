-- Import flow for legacy SymmetryAI waitlist CSV
-- 1) Create the staging table.
create table if not exists public.symmetryai_waitlist_import (
  email text,
  created_at timestamptz
);

-- 2) Use Supabase SQL editor import UI or psql \copy to load CSV rows into public.symmetryai_waitlist_import.
--    Expected headers: email, created_at (created_at optional in source).

-- 3) Normalize + deduplicate into final table.
insert into public.symmetryai_waitlist (email, created_at)
select
  lower(trim(email)) as email,
  coalesce(created_at, now()) as created_at
from public.symmetryai_waitlist_import
where email is not null
  and trim(email) <> ''
on conflict (email) do nothing;

-- 4) Optional validation queries.
-- select count(*) as imported_rows from public.symmetryai_waitlist;
-- select * from public.symmetryai_waitlist order by created_at desc limit 20;

-- 5) Drop staging table when finished.
-- drop table if exists public.symmetryai_waitlist_import;
