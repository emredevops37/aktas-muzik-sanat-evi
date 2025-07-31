-- Contact messages tablosu oluştur
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS aktifleştir
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Herkese insert izni ver (çünkü contact formu public)
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Sadmin rolü olanlar tüm mesajları görebilir
CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);