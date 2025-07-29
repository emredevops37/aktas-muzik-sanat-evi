-- Admin rolünü emrkts37@gmail.com kullanıcısına ata
INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'emrkts37@gmail.com'),
  'admin'
) 
ON CONFLICT (user_id, role) DO NOTHING;