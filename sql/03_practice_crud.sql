-- STEP 3: CRUD practice (ek ek line select karke Run karo)

-- READ -------------------------------------------------
select * from incidents;

select title, severity from incidents;

-- WHERE ------------------------------------------------
select * from incidents where severity = 'High';

select * from incidents where status = 'Open';

select * from incidents where severity in ('High', 'Critical');

select * from incidents where title ilike '%login%';

-- ORDER BY / LIMIT -------------------------------------
select * from incidents order by created_at desc;

select * from incidents order by created_at desc limit 2;

-- UPDATE -----------------------------------------------
update incidents
set status = 'Investigating'
where title = 'Suspicious Login';

update incidents
set status = 'Resolved'
where severity = 'Medium';

-- DELETE (careful: where lagana zaroori hai) -----------
delete from incidents
where title = 'Phishing Email';

-- COUNT / GROUP BY (bonus, dashboard ke liye kaam aayega)
select severity, count(*) as total
from incidents
group by severity
order by total desc;

select status, count(*) from incidents group by status;
