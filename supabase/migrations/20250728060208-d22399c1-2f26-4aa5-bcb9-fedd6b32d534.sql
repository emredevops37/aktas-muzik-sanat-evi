-- Insert sample products and images from the current static data
INSERT INTO products (name, description, features, price) VALUES 
('Zurna', 'Geleneksel Türk halk müziğinin vazgeçilmez nefesli çalgısı. El işçiliği ile özenle işlenmiş ahşap gövde ve kaliteli kamış ile üretilmektedir.', ARRAY['El işçiliği ahşap gövde', 'Kaliteli doğal', 'Geleneksel boyama teknikleri', 'Uzun ömürlü kullanım'], ''),
('Balaban', 'Azerbaycan ve Türk müzik kültürünün önemli çalgılarından biri. Derin ve melodik sesi ile dinleyicileri büyüler.', ARRAY['Özel seçilmiş ahşap', 'Profesyonel kamış sistemi', 'Ergonomik tutuş tasarımı', 'Zengin ton kalitesi'], ''),
('Mey', 'Orta Asya kökenli bu güzel çalgı, sıcak ve duygusal tınısı ile halk müziğimizin vazgeçilmez parçasıdır.', ARRAY['Geleneksel el işçiliği', 'Doğal malzemeler', 'Özel tuning sistemi', 'Ürün çeşitliliği'], '');

-- Insert product images for each instrument
-- Zurna images
INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/zurna-product.jpg', 'Zurna', 'Ana ürün resmi', true
FROM products p WHERE p.name = 'Zurna';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/zurna-gallery-1.jpg', 'Zurna Takım', 'Sol, Sol Diyez, La, Si, Do', false
FROM products p WHERE p.name = 'Zurna';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/zurna-gallery-2.jpg', 'Zurna Çeşitlerimiz (La zurna)', 'Farklı boyut ve ahşap türlerinde zurna koleksiyonumuz', false
FROM products p WHERE p.name = 'Zurna';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/zurna-gallery-3.jpg', 'Üretim Süreci', 'Usta ellerde şekillenen zurna yapım aşaması (Sol zurna)', false
FROM products p WHERE p.name = 'Zurna';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/zurna-gallery-4.jpg', 'Profesyonel Zurna', 'Kamış detayı ile profesyonel kalitede zurna (Sol Diyez)', false
FROM products p WHERE p.name = 'Zurna';

-- Balaban images
INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/balaban-product.jpg', 'Balaban', 'Ana ürün resmi', true
FROM products p WHERE p.name = 'Balaban';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/balaban-gallery-1.jpg', 'Balaban Detay', 'Geleneksel Azerbaycan balaban çalgısı', false
FROM products p WHERE p.name = 'Balaban';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/balaban-gallery-2.jpg', 'Balaban Koleksiyonu', 'Farklı türlerde balaban çeşitlerimiz', false
FROM products p WHERE p.name = 'Balaban';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/balaban-gallery-3.jpg', 'Profesyonel Balaban', 'Komple balaban seti', false
FROM products p WHERE p.name = 'Balaban';

-- Mey images
INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/mey-product.jpg', 'Mey', 'Ana ürün resmi', true
FROM products p WHERE p.name = 'Mey';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/mey-gallery-1.jpg', 'Mey Çalgısı', 'Orta Asya kökenli geleneksel mey', false
FROM products p WHERE p.name = 'Mey';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/mey-gallery-2.jpg', 'Mey Çeşitleri', 'Değişik boyutlarda mey koleksiyonumuz', false
FROM products p WHERE p.name = 'Mey';

INSERT INTO product_images (product_id, image_url, title, description, is_main) 
SELECT p.id, '/src/assets/mey-gallery-3.jpg', 'Mey Üretimi', 'Geleneksel yöntemlerle mey yapım süreci', false
FROM products p WHERE p.name = 'Mey';

-- Create admin roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check if user has admin role
CREATE OR REPLACE FUNCTION public.has_admin_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Update RLS policies to use admin role for write operations
DROP POLICY IF EXISTS "Only authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Only authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Only authenticated users can delete products" ON public.products;

CREATE POLICY "Only admins can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (public.has_admin_role(auth.uid()));

CREATE POLICY "Only admins can update products" 
ON public.products 
FOR UPDATE 
USING (public.has_admin_role(auth.uid()));

CREATE POLICY "Only admins can delete products" 
ON public.products 
FOR DELETE 
USING (public.has_admin_role(auth.uid()));

-- Update product_images RLS policies
DROP POLICY IF EXISTS "Only authenticated users can insert product images" ON public.product_images;
DROP POLICY IF EXISTS "Only authenticated users can update product images" ON public.product_images;
DROP POLICY IF EXISTS "Only authenticated users can delete product images" ON public.product_images;

CREATE POLICY "Only admins can insert product images" 
ON public.product_images 
FOR INSERT 
WITH CHECK (public.has_admin_role(auth.uid()));

CREATE POLICY "Only admins can update product images" 
ON public.product_images 
FOR UPDATE 
USING (public.has_admin_role(auth.uid()));

CREATE POLICY "Only admins can delete product images" 
ON public.product_images 
FOR DELETE 
USING (public.has_admin_role(auth.uid()));