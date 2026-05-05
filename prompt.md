# 🏗️ Website Prompt: Vinayak Trading Company
### Hardware & Astral Paint Shop — Palsana, Sikar, Rajasthan

---

## 🎯 Project Overview

Build a **luxury yet budget-friendly, trust-first** website for **Vinayak Trading Company** — a well-established hardware and paint shop located in **Palsana, Sikar, Rajasthan**. The shop is an **authorized dealer of Astral Paints** and sells a wide range of hardware items. The primary customers are **local walk-in customers, contractors, builders, and long-time connection-based buyers** who trust the shop for quality products at fair prices.

The website must feel like a **premium local brand** — not a generic store. It should radiate **trust, community roots, quality, and reliability**, while being visually stunning enough to attract new customers who discover it online.

---

## 🎨 Design Direction & Aesthetic

**Theme:** Warm Industrial Luxury — think rich deep ochres, earthy terracotta tones, metallic gold accents, and cream whites. The palette should evoke the feeling of freshly painted walls, iron hardware, and sunlit Rajasthani architecture.

**Color Palette:**
- Primary: Deep Ochre / Turmeric Gold (`#C8922A`)
- Secondary: Charcoal Iron (`#2B2B2B`)
- Accent: Astral Blue (`#1A3A6B`) — reflecting Astral Paint branding
- Background: Off-white Cream (`#FAF6EF`)
- Highlight: Burnt Sienna (`#A0522D`)

**Typography:**
- Display/Hero Font: `Playfair Display` or `Cormorant Garamond` — elegant, commanding, premium
- Body Font: `DM Sans` or `Nunito` — readable, friendly, approachable
- Accent Labels: `Bebas Neue` — for product tags, section headers, bold callouts

**Visual Motifs:**
- Subtle Rajasthani jaali (lattice) pattern as a background texture overlay
- Paint brush stroke dividers between sections
- Metallic shimmer effects on headings and CTAs
- Animated paint drip effect on the hero section
- Product cards with a slight elevation shadow and hover tilt effect
- Smooth scroll with staggered fade-in animations on all sections

---

## 🌐 Website Structure & Pages

### 1. 🏠 Homepage (Landing Page)

**Hero Section:**
- Full-width cinematic banner with a **dramatic background** showing freshly painted walls, hardware tools, and paint buckets arranged beautifully
- Animated headline: *"Where Quality Meets Trust — Since [Year Est.]"*
- Subheadline: *"Authorized Astral Paint Dealer | Hardware & Paint Shop | Palsana, Sikar"*
- Two CTA buttons: `Explore Products` and `Contact Us / Get Directions`
- Subtle animated paint drip from the top of the hero image
- A golden trust badge: *"Serving Palsana & Sikar for [X] Years"*

**Marquee / Trust Bar:**
- Scrolling horizontal ticker showing: ✅ Astral Authorized Dealer | 🔨 Quality Hardware | 🎨 500+ Paint Shades | 📍 Palsana, Sikar | 💰 Wholesale & Retail | 🏗️ Trusted by Contractors

**About Us Section:**
- Warm, story-driven copy about Vinayak Trading Company's roots in Palsana
- A handwritten-style quote from the owner
- Two columns: left side — short brand story, right side — illustrated icons showing: *Years in Business, Happy Customers, Product Range, Location*
- A beautiful background texture of Rajasthani motifs

**Why Choose Us Section (4 Feature Cards):**
1. 🎨 **Astral Certified** — Official authorized dealer for Astral Paints, Rajasthan
2. 🔨 **Complete Hardware** — Everything from nails to heavy tools under one roof
3. 💰 **Fair & Transparent Pricing** — Best rates for locals, contractors & bulk buyers
4. 🤝 **Trusted by the Community** — Decades of relationships in Palsana & Sikar

**Featured Products Section:**
- Grid of 6–8 featured product cards (managed via Admin Panel)
- Each card: Product image, name, short description, optional price tag or "Ask for Price" badge
- Hover effect: Card lifts + golden border glows
- Filter tabs: All | Paints | Hardware | Astral Products

**Astral Paint Spotlight Section:**
- Dedicated premium-looking section showcasing Astral Paint products
- Full-width gradient background in Astral Blue and Gold
- Sub-sections: Interior Paints | Exterior Paints | Waterproofing | Primers & Putty
- CTA: *"Visit the shop to explore 500+ shades"*
- Paint swatch color strip animation (colors slide across like a palette)

**Testimonials / Social Proof Section:**
- 3–4 review cards from trusted local customers / contractors
- Star ratings, customer name, locality (e.g., "Ramesh Ji, Contractor, Sikar")
- Soft golden card background

**Our Location Section:**
- Embedded Google Maps pointing to Palsana, Sikar, Rajasthan
- Address: Vinayak Trading Company, Palsana, Sikar, Rajasthan
- Phone number, WhatsApp CTA button
- Opening hours display
- A "Get Directions" button linking to Google Maps

**Footer:**
- Logo + tagline
- Quick links: Home, Products, About, Contact
- Social media icons (WhatsApp, Facebook, Instagram — if applicable)
- Astral Paint authorized dealer badge
- Copyright notice

---

### 2. 🛍️ Products Page

- Full searchable, filterable product catalog
- Categories: **Paints** | **Hardware** | **Astral Products** | **Tools & Accessories** | **Waterproofing**
- Each product card: Image, Name, Category badge, Short Description, Price or "Enquire Now" button
- Search bar at top
- Sidebar filters: Category, Price range, Brand
- All product data managed via Admin Panel (Supabase backend)

---

### 3. 🎨 Astral Paints Page (Dedicated Brand Page)

- Premium branded page fully dedicated to Astral Paint products
- Sections: About Astral Paints, Product Range (Interior/Exterior/Primer/Putty/Waterproofing)
- Color Visualizer teaser: *"Visit our shop to explore 500+ shades with our color guide"*
- Astral Paint logos, official color chips display
- CTA: WhatsApp to enquire about specific shades

---

### 4. 📞 Contact Page

- Contact form: Name, Phone, Message, Product Enquiry (optional)
- WhatsApp direct chat button (floating on all pages too)
- Google Maps embed
- Full address: Vinayak Trading Company, Palsana, Sikar, Rajasthan
- Business hours
- A warm message: *"Walk in anytime — we're always happy to help you find what you need."*

---

### 5. 🔐 Admin Panel (Secure, Password-Protected)

> **The admin panel connects to Supabase. On first use, the shop owner is prompted to enter their Supabase Project URL and Supabase Anon API Key to link the panel to their database.**

**Admin Login Screen:**
- Clean, secure login page
- Username + Password authentication
- Supabase credentials setup wizard on first visit

**Supabase Setup Prompt (First-Time):**
> *"To get started, please enter your Supabase credentials. These will connect your admin panel to your product database. You can find these in your Supabase project settings under API."*
- Input: `Supabase Project URL` = "https://wnwmlaxcdepdeilsgiss.supabase.co"
- Input: `Supabase Anon Key` = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indud21sYXhjZGVwZGVpbHNnaXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTQ4MDcsImV4cCI6MjA5MzQ3MDgwN30.7Y4SzV4mCCDeONXQ4ZXKByBTrRrToZuQHi1BldQxeUc"
- Button: `Connect & Save`

**Admin Dashboard Features:**

1. **Product Management**
   - Add new product: Name, Category, Description, Price, Image upload, Visibility toggle
   - Edit existing products
   - Delete products
   - Mark product as "Featured" (shows on homepage)
   - Toggle "In Stock / Out of Stock"

2. **Category Management**
   - Add / edit / delete product categories
   - Reorder categories

3. **Homepage Banner Management**
   - Change hero section headline and subheadline
   - Upload a new hero background image
   - Update CTA button text and links

4. **Testimonials Management**
   - Add, edit, delete customer reviews
   - Toggle visibility of each review

5. **Shop Info Management**
   - Update shop address, phone number, WhatsApp number
   - Update opening hours
   - Update "Years in Business" and taglines

6. **Enquiries / Contact Messages**
   - View all form submissions from the Contact page
   - Mark as read / unread
   - Delete old enquiries

7. **Gallery (Optional)**
   - Upload shop photos, product photos, before-after paint jobs
   - These display in a gallery section on the website

---

## ⚙️ Technical Requirements

- **Frontend:** React.js (with Tailwind CSS or styled-components)
- **Backend / Database:** Supabase (PostgreSQL) — for products, enquiries, testimonials, settings
- **Authentication:** Supabase Auth for admin login
- **Image Hosting:** Supabase Storage for product and gallery images
- **Animations:** Framer Motion for page transitions and scroll animations
- **Maps:** Google Maps Embed API
- **WhatsApp Integration:** WhatsApp Chat API floating button (always visible)
- **Fonts:** Google Fonts (Playfair Display + DM Sans + Bebas Neue)
- **Responsive:** Fully mobile-first responsive design (most local customers browse on phones)
- **SEO:** Meta tags optimized for "Astral Paint dealer Sikar", "Hardware shop Palsana", "Paint shop Sikar Rajasthan"

---

## 💡 Creative Add-ons (Unique Touches)

1. **Paint Shade Explorer** — An interactive color palette section where visitors can browse popular Astral paint shades, click a shade to see its name and code, and WhatsApp the shop directly to enquire. *("I'm interested in shade: Sunset Amber AF-102")*

2. **Floating WhatsApp Button** — Always visible on every page. Clicking it opens WhatsApp with a pre-filled message: *"Hi Vinayak Trading Company, I'd like to enquire about [Product/Paint]."*

3. **"Get a Quote" Flow** — Visitors can select a product category, enter quantity, and submit a quick enquiry that goes directly to the shop owner's WhatsApp or email.

4. **Trust Counter Animation** — Animated number counters on the homepage: *500+ Products | 1000+ Happy Customers | 15+ Years of Trust | Rajasthan's Trusted Dealer*

5. **Astral Color of the Month** — A small featured section where admin can set a "trending paint shade this month" — keeps the site feeling fresh and updated.

6. **Contractor Corner** — A subtle section on the homepage addressing contractors directly: *"Building something big? We offer bulk pricing, credit accounts, and fast delivery for contractors in Sikar district. Call us today."*

7. **Seasonal Offers Banner** — A dismissible top banner (managed from admin panel) for showing current offers or announcements like *"Monsoon Waterproofing Sale — 10% off Astral Damp Proof this month!"*

---

## 📱 Mobile Experience

- Mobile-first design — most walk-in and local customers will browse on smartphones
- Large tap targets, thumb-friendly navigation
- Sticky bottom nav bar on mobile: Home | Products | Call | WhatsApp | Location
- Fast loading — optimized images via Supabase CDN
- One-tap WhatsApp and Call buttons visible above the fold on mobile

---

## 🗂️ Supabase Database Schema (Suggested)

**Tables:**
- `products` — id, name, category, description, price, image_url, is_featured, in_stock, created_at
- `categories` — id, name, display_order
- `testimonials` — id, customer_name, location, review, rating, is_visible
- `enquiries` — id, name, phone, message, product_interest, is_read, created_at
- `settings` — key, value (for hero text, shop info, WhatsApp number, etc.)
- `gallery` — id, image_url, caption, created_at

---

## 🏁 Final Tone & Feel Summary

> Vinayak Trading Company's website should feel like walking into a beautifully organized, well-lit hardware and paint shop — warm, welcoming, trustworthy, and impressive. It's not a cold e-commerce giant. It's a **community shop with pride**, now dressed in a **luxury digital presence** that makes locals proud and attracts new customers searching online. Every color, font, and animation should quietly say: *"We've been here, we know our craft, and we're here for you."*

---

*Prompt crafted with full creative direction. Ready to be handed to any developer or AI tool to build the complete website.*