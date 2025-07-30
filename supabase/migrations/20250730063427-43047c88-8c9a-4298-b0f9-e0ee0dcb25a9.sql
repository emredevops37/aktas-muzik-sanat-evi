-- Ana sayfa ürünlerini Supabase'e ekle
INSERT INTO public.products (name, description, features, price) VALUES 
(
  'Zurna',
  'Zurna, Türk halk müziğinin vazgeçilmez nefesli çalgılarından biridir. Ahşap gövdesi ve kamış diliyle güçlü, etkileyici sesler çıkarır.',
  ARRAY['Profesyonel kalite ahşap gövde', 'El yapımı kamış dil', 'Geleneksel Türk müziği için ideal', 'Farklı tonlarda mevcut', 'Uzman sanatkarlar tarafından üretilmiştir'],
  '1.200 TL - 2.500 TL'
),
(
  'Balaban',
  'Balaban, Azerbaycan ve Türk müziğinin karakteristik nefesli çalgısıdır. Derin ve melankolik sesiyle dinleyicileri büyüler.',
  ARRAY['Özel ahşap işçiliği', 'Geleneksel yapım teknikleri', 'Profesyonel müzisyenler için', 'Authentic ses kalitesi', 'El yapımı kamış sistem'],
  '1.500 TL - 3.000 TL'
),
(
  'Mey',
  'Mey, Orta Asya kökenli geleneksel bir nefesli çalgıdır. Sade yapısı ve özgün sesiyle Türk müziğinin önemli enstrümanlarından biridir.',
  ARRAY['Geleneksel el işçiliği', 'Doğal ahşap malzeme', 'Özgün Türk müziği sesi', 'Profesyonel kalite', 'Farklı boyutlarda mevcut'],
  '800 TL - 1.800 TL'
);

-- Ürün görsellerini ekle  
INSERT INTO public.product_images (product_id, image_url, title, description, is_main) VALUES
-- Zurna görselleri
((SELECT id FROM public.products WHERE name = 'Zurna'), '/src/assets/zurna-product.jpg', 'Zurna Ana Görsel', 'Geleneksel Türk zurna çalgısı', true),
((SELECT id FROM public.products WHERE name = 'Zurna'), '/src/assets/zurna-gallery-1.jpg', 'Zurna Galeri 1', 'Zurna detay görünüm', false),
((SELECT id FROM public.products WHERE name = 'Zurna'), '/src/assets/zurna-gallery-2.jpg', 'Zurna Galeri 2', 'Zurna yan görünüm', false),
((SELECT id FROM public.products WHERE name = 'Zurna'), '/src/assets/zurna-gallery-3.jpg', 'Zurna Galeri 3', 'Zurna yakın plan', false),
((SELECT id FROM public.products WHERE name = 'Zurna'), '/src/assets/zurna-gallery-4.jpg', 'Zurna Galeri 4', 'Zurna koleksiyon', false),

-- Balaban görselleri
((SELECT id FROM public.products WHERE name = 'Balaban'), '/src/assets/balaban-product.jpg', 'Balaban Ana Görsel', 'Geleneksel balaban çalgısı', true),
((SELECT id FROM public.products WHERE name = 'Balaban'), '/src/assets/balaban-gallery-1.jpg', 'Balaban Galeri 1', 'Balaban detay görünüm', false),
((SELECT id FROM public.products WHERE name = 'Balaban'), '/src/assets/balaban-gallery-2.jpg', 'Balaban Galeri 2', 'Balaban yan görünüm', false),
((SELECT id FROM public.products WHERE name = 'Balaban'), '/src/assets/balaban-gallery-3.jpg', 'Balaban Galeri 3', 'Balaban yakın plan', false),

-- Mey görselleri
((SELECT id FROM public.products WHERE name = 'Mey'), '/src/assets/mey-product.jpg', 'Mey Ana Görsel', 'Geleneksel mey çalgısı', true),
((SELECT id FROM public.products WHERE name = 'Mey'), '/src/assets/mey-gallery-1.jpg', 'Mey Galeri 1', 'Mey detay görünüm', false),
((SELECT id FROM public.products WHERE name = 'Mey'), '/src/assets/mey-gallery-2.jpg', 'Mey Galeri 2', 'Mey yan görünüm', false),
((SELECT id FROM public.products WHERE name = 'Mey'), '/src/assets/mey-gallery-3.jpg', 'Mey Galeri 3', 'Mey yakın plan', false);