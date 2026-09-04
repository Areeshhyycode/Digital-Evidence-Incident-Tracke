-- STEP 6: evidence insert
-- incident_id UUID hai, hum hardcode nahi karte -- subquery se nikaalte hain

insert into evidence (incident_id, evidence_type, description, file_hash)
values
  ((select id from incidents where title = 'Suspicious Login'),
   'Login Log', '5 failed attempts between 02:11 and 02:14 UTC', null),

  ((select id from incidents where title = 'Suspicious Login'),
   'IP Address', 'Source IP 45.132.88.10 (Amsterdam, NL)', null),

  ((select id from incidents where title = 'Suspicious Login'),
   'Screenshot', 'Auth dashboard alert screenshot', null),

  ((select id from incidents where title = 'Malware Detected'),
   'File Hash', 'trojan.exe quarantined by EDR',
   'a3f5c9e21b7d4408f6c1e29b5d7a3f10c8b4e6d29a1f7c3b5e8d0a2f4c6b9e1d');

select * from evidence;
