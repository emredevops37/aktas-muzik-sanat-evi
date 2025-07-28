-- Enable Row Level Security on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on product_images table  
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for products table (public read access for product catalog)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policies for product_images table (public read access for product images)
CREATE POLICY "Anyone can view product images" 
ON public.product_images 
FOR SELECT 
USING (true);

-- Restrict write operations to authenticated users only (for future admin functionality)
CREATE POLICY "Only authenticated users can insert products" 
ON public.products 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update products" 
ON public.products 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can delete products" 
ON public.products 
FOR DELETE 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can insert product images" 
ON public.product_images 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update product images" 
ON public.product_images 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Only authenticated users can delete product images" 
ON public.product_images 
FOR DELETE 
TO authenticated 
USING (true);