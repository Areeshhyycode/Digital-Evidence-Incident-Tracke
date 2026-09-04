-- STEP 2: dummy incidents

insert into incidents (title, description, severity, status) values
  ('Suspicious Login',  'Multiple failed login attempts from unknown IP 45.132.88.10', 'High',     'Open'),
  ('Phishing Email',    'Employee received fake HR password-reset email',              'Medium',   'Investigating'),
  ('Malware Detected',  'Trojan found on finance department workstation',              'Critical', 'Open');

-- check
select * from incidents;
