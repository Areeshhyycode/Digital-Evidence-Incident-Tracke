-- STEP 5: evidence table (foreign key -> incidents)

create table evidence (
  id            uuid primary key default gen_random_uuid(),

  incident_id   uuid not null
                references incidents(id)
                on delete cascade,

  evidence_type text not null,
  description   text,
  file_hash     text,
  collected_at  timestamptz default now()
);

-- lookup fast karne ke liye
create index evidence_incident_id_idx on evidence(incident_id);
