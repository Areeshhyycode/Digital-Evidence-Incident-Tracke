-- STEP 8: RLS (Row Level Security)
-- Next.js anon key se connect hota hai. RLS off ho to koi bhi tumhara
-- data parh AUR badal sakta hai. Isliye RLS on karke read-only policy do.

alter table incidents enable row level security;
alter table evidence  enable row level security;

-- sab ko sirf PARHNE ki ijazat (insert/update/delete band)
create policy "public read incidents"
  on incidents for select
  to anon, authenticated
  using (true);

create policy "public read evidence"
  on evidence for select
  to anon, authenticated
  using (true);

-- check: policies lag gayin?
select tablename, policyname, cmd
from pg_policies
where schemaname = 'public';
