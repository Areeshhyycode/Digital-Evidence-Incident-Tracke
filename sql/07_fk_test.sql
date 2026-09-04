-- Foreign key kaam kar rahi hai? -- test karo

-- TEST 1: fake incident_id daalne ki koshish -> ERROR aana chahiye
insert into evidence (incident_id, evidence_type, description)
values ('00000000-0000-0000-0000-000000000000', 'Fake', 'ye fail hoga');
-- expected: violates foreign key constraint "evidence_incident_id_fkey"


-- TEST 2: incident delete karo -> uska evidence bhi khud delete ho jayega
--         (kyunki humne ON DELETE CASCADE lagaya hai)

select count(*) from evidence;              -- pehle ginti

delete from incidents where title = 'Malware Detected';

select count(*) from evidence;              -- ab kam ho gayi
