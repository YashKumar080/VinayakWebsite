-- ============================================================
-- Vinayak Trading Company - Supabase Database Setup
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 0. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 2. ENQUIRIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  product_interest TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 3. FEATURED CATEGORIES TABLE (for Home page management)
-- ============================================================
CREATE TABLE IF NOT EXISTS featured_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_to TEXT DEFAULT '/products',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- 4. DISABLE ROW LEVEL SECURITY (for easy dev/testing)
-- NOTE: Enable and add policies before going to production!
-- ============================================================
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE featured_categories DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- 5. SUPABASE STORAGE - Create 'product-images' bucket
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (allow public reads & anonymous uploads for dev)
-- NOTE: Drop policies first if they already exist and re-run fails

-- Allow public read access
CREATE POLICY "Public Read - product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow anyone to upload
CREATE POLICY "Public Upload - product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Allow anyone to update/replace
CREATE POLICY "Public Update - product-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Allow anyone to delete
CREATE POLICY "Public Delete - product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- ============================================================
-- 6. SEED DATA - Products
-- ============================================================
INSERT INTO products (name, category, description, price, image_url, is_featured, in_stock)
VALUES
  ('Astral Damp Proof', 'Waterproofing', 'Advanced waterproofing solution for roofs and terraces.', '₹550/L', 'https://images.unsplash.com/photo-1588612144347-1510abdf1e6b?q=80&w=800&auto=format&fit=crop', true, true),
  ('Astral Interior Silk Emulsion', 'Paints', 'Premium interior paint with a smooth silk finish and easy washability.', '₹420/L', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop', true, true),
  ('Heavy Duty Hammer Drill', 'Hardware', 'Professional grade 850W hammer drill for heavy masonry work.', '₹3200', 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop', true, true);

-- ============================================================
-- 7. SEED DATA - Featured Categories
-- ============================================================
INSERT INTO featured_categories (name, description, image_url, link_to, display_order)
VALUES
  ('Astral Interior Paints', 'Premium interior paints for your home', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop', '/products', 1),
  ('Heavy Duty Hardware', 'Professional tools and hardware for every job', 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop', '/products', 2),
  ('Waterproofing Solutions', 'Complete waterproofing solutions for your property', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop', '/products', 3);
