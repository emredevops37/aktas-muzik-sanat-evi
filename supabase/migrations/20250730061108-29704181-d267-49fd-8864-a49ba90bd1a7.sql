-- Admin rolü atama
INSERT INTO public.user_roles (user_id, role) 
VALUES ('d52680a3-6369-45a4-8e54-879b8e795564', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;