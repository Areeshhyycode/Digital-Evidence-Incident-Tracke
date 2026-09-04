-- STEP 7: JOIN practice -- incident + uska evidence ek saath

-- 1. har evidence ke saath uske incident ka title
select
  i.title      as incident,
  i.severity,
  e.evidence_type,
  e.description
from evidence e
join incidents i on i.id = e.incident_id
order by i.title;

-- 2. sirf ek incident ka saara evidence (detail page ka data)
select e.*
from evidence e
join incidents i on i.id = e.incident_id
where i.title = 'Suspicious Login';

-- 3. har incident ke paas kitne evidence hain
--    LEFT JOIN -- taake 0 evidence wale incidents bhi dikhein
select
  i.title,
  i.severity,
  count(e.id) as evidence_count
from incidents i
left join evidence e on e.incident_id = i.id
group by i.id, i.title, i.severity
order by evidence_count desc;

-- 4. jin incidents ka koi evidence nahi
select i.title
from incidents i
left join evidence e on e.incident_id = i.id
where e.id is null;
