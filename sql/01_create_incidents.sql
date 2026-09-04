-- STEP 1: incidents table
-- Supabase Dashboard -> SQL Editor -> New query -> paste -> Run

create table incidents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  severity    text not null,
  status      text not null default 'Open',
  created_at  timestamptz default now()
);
