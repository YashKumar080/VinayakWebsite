import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, Wallet, Users, ArrowRight, MapPin, Phone, Star, Hammer, Paintbrush, HardHat, Building, Smile, Package, Handshake } from 'lucide-react';
import { supabase } from '../lib/supabase';

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'Astral Interior Paints', image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop', link_to: '/products' },
  { id: '2', name: 'Heavy Duty Hardware', image_url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop', link_to: '/products' },
  { id: '3', name: 'Waterproofing Solutions', image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop', link_to: '/products' },
];

const Home = () => {
  const [featuredCategories, setFeaturedCategories] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true);
      if (!error && data && data.length > 0) {
        setFeaturedCategories(data);
      }
    };
    fetchCategories();
  }, []);
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-background">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-secondary/70"></div>
          {/* Subtle Jaali pattern overlay */}
          <div className="absolute inset-0 bg-jaali opacity-30"></div>
        </div>

        {/* Animated Paint Drip */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-1/4 w-12 h-32 bg-primary rounded-b-full opacity-80 blur-[2px] z-10"
        />
        <motion.div 
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute top-0 right-1/3 w-8 h-48 bg-accent rounded-b-full opacity-70 blur-[2px] z-10"
        />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 text-white px-4 py-1.5 rounded-full mb-6 text-sm font-medium backdrop-blur-sm"
          >
            <Star size={16} className="text-primary fill-primary" />
            <span>Serving Palsana & Sikar for 15+ Years</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-glow"
          >
            Where Quality Meets <span className="text-primary">Trust</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto"
          >
            Authorized Astral Paint Dealer | Hardware & Paint Shop | Palsana, Sikar
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-4 w-full"
          >
            <Link to="/products" className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2 box-glow">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link to="/paints" className="w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              Explore Paints <Paintbrush size={20} />
            </Link>
            <Link to="/contact" className="w-full lg:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              Get Directions <MapPin size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Marquee / Trust Bar */}
      <div className="bg-secondary text-white py-4 overflow-hidden border-b-4 border-primary">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex whitespace-nowrap items-center font-accent text-xl tracking-wider gap-12"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="flex items-center gap-2"><ShieldCheck className="text-primary" size={24} /> Astral Authorized Dealer</span>
              <span className="flex items-center gap-2"><Hammer className="text-primary" size={24} /> Quality Hardware</span>
              <span className="flex items-center gap-2"><Paintbrush className="text-primary" size={24} /> 500+ Paint Shades</span>
              <span className="flex items-center gap-2"><MapPin className="text-primary" size={24} /> Palsana, Sikar</span>
              <span className="flex items-center gap-2"><Wallet className="text-primary" size={24} /> Wholesale & Retail</span>
              <span className="flex items-center gap-2"><HardHat className="text-primary" size={24} /> Trusted by Contractors</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. About Us Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-jaali opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-6">Deep Roots in Palsana, Sikar</h2>
              <p className="text-lg text-gray-600 mb-6 font-body leading-relaxed">
                For over 15 years, Vinayak Trading Company has been the cornerstone of building and renovation in our community. We started with a simple promise: to provide genuine, high-quality hardware and paints at honest prices. 
              </p>
              <p className="text-lg text-gray-600 mb-8 font-body leading-relaxed">
                Today, as an authorized dealer for premium brands like Astral Paints, we continue to serve locals, contractors, and builders with the same dedication and trust.
              </p>

              <p className="text-xl text-primary font-bold mb-8 font-body leading-relaxed">
                हम पलसाना और सीकर के हर घर, हर दुकान का भरोसा हैं। असली माल, सही दाम — यही है विनायक ट्रेडिंग कंपनी का वादा।
              </p>
              
              <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
                <p className="font-display text-xl italic text-secondary">
                  "Our business isn't just about selling tools; it's about building relationships that last generations."
                </p>
                <p className="mt-4 font-bold font-body text-highlight">— Owner, Vinayak Trading Co.</p>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: 'Years in Business', value: '15+', icon: <Building className="text-primary mx-auto mb-2" size={36} /> },
                { label: 'Happy Customers', value: '10k+', icon: <Smile className="text-primary mx-auto mb-2" size={36} /> },
                { label: 'Products', value: '500+', icon: <Package className="text-primary mx-auto mb-2" size={36} /> },
                { label: 'Trusted By', value: 'Locals', icon: <Handshake className="text-primary mx-auto mb-2" size={36} /> },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="mb-4">{stat.icon}</div>
                  <div className="font-display text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-body text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-secondary mb-4">Featured Categories</h2>
              <div className="w-24 h-1 bg-primary"></div>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-yellow-600 transition">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
              >
                <img src={cat.image_url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white font-display text-2xl font-bold mb-2">{cat.name}</h3>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
                {/* Golden glow border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors duration-300 rounded-xl"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-md font-medium">
              View All <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">Why Trust Us?</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: 'Astral Certified', desc: 'Official authorized dealer for Astral Paints in Rajasthan.', icon: ShieldCheck, color: 'text-accent' },
              { title: 'Complete Hardware', desc: 'Everything from nails to heavy machinery tools under one roof.', icon: Wrench, color: 'text-gray-700' },
              { title: 'Fair Pricing', desc: 'Best competitive rates for locals, contractors & bulk buyers.', icon: Wallet, color: 'text-green-600' },
              { title: 'Community Trusted', desc: 'Decades of deep relationships in Palsana & Sikar district.', icon: Users, color: 'text-primary' },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className="relative z-10">
                  <feature.icon className={`w-12 h-12 mb-6 ${feature.color}`} strokeWidth={1.5} />
                  <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Astral Paint Spotlight */}
      <section className="py-24 relative overflow-hidden bg-accent">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <span className="font-accent tracking-widest text-primary text-xl mb-4 block">PREMIUM COLLECTION</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">Bring Colors to Life with Astral.</h2>
              <p className="text-gray-300 text-lg mb-8 font-body">
                As the authorized dealer in Rajasthan, we bring you the complete catalog of Astral Paints. From advanced waterproofing to luxurious interior finishes.
              </p>
              
              <ul className="space-y-4 mb-10 font-body">
                {['Interior Emulsions', 'Exterior Weather-Proof', 'Primers & Putty', 'Advanced Waterproofing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/paints" className="inline-flex bg-primary text-secondary px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-accent transition duration-300">
                View 500+ Shades
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" alt="Paint Buckets" className="rounded-2xl shadow-2xl relative z-10 border-4 border-white/10" />
              {/* Color swatches floating */}
              <div className="absolute -right-8 top-10 flex flex-col gap-2 z-20">
                {['#FF5733', '#33FF57', '#3357FF', '#F3FF33'].map((color, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                    className="w-16 h-16 rounded-lg shadow-lg border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Contractor Corner */}
      <section className="py-16 bg-highlight/10 border-y border-highlight/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary  mb-4">Building Something Big?</h2>
          <p className="font-body text-xl text-highlight font-bold mb-8">
            हम bulk orders पर special rates देते हैं।
          </p>
          <p className="text-secondary font-body text-lg mb-8">
            We offer bulk pricing, credit accounts, and fast delivery for contractors and builders in Sikar district.
          </p>
          <a href="tel:+919828421209" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded font-medium hover:bg-black transition">
            <Phone size={18} /> Call for Bulk Rates
          </a>
        </div>
      </section>

      {/* <section className="">
        <div className="absolute inset-0 bg-jaali opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Painting a whole building?
          </h2>
          <p className="font-body text-xl text-primary font-bold mb-8">
            हम bulk orders पर special rates देते हैं।
          </p>
          <a href="tel:+919828421209" className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-4 rounded-md font-bold hover:bg-white transition shadow-lg hover:scale-105 duration-300">
            <Phone size={20} /> Call for Bulk Rates
          </a>
        </div>
      </section> */}

      {/* 8. Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">Trusted by the Community</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Ramesh Ji', role: 'Contractor, Sikar', text: 'I have been buying all my hardware and paint supplies from Vinayak Trading for 5 years. They always give the best wholesale rates and genuine products.' },
              { name: 'Sunil Sharma', role: 'Homeowner, Palsana', text: 'The Astral paint variety they have is amazing. The owner personally helped me select the perfect shades for my new home. Highly recommended!' },
              { name: 'Vikram Singh', role: 'Builder', text: 'Reliability is key in my business. Vinayak Trading Co. never delays deliveries and the quality is always top-notch.' },
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-primary/5 border border-primary/20 p-8 rounded-2xl relative"
              >
                <div className="text-primary mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-primary" />)}
                </div>
                <p className="text-gray-700 italic mb-6 font-body leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-display text-xl font-bold text-secondary">{review.name}</h4>
                  <p className="text-sm text-gray-500 font-body">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Location */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-secondary mb-6">Visit Our Shop</h2>
              <p className="text-gray-600 mb-8 font-body text-lg">
                Walk in anytime — we're always happy to help you find what you need. 
                Experience the Astral Paint shades in person!
              </p>
              
              <div className="space-y-6 mb-8 font-body text-secondary">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-gray-600">Vinayak Trading Company,<br/>Main Market, Palsana,<br/>Sikar, Rajasthan - 332402</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone / WhatsApp</h4>
                    <p className="text-gray-600">+91 98284 21209</p>
                  </div>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/BVbaXLSPV2ZRRYkv5" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded font-medium hover:bg-yellow-600 transition">
                Get Directions <MapPin size={18} />
              </a>
            </div>

            <a href="https://maps.app.goo.gl/BVbaXLSPV2ZRRYkv5" target="_blank" rel="noreferrer" className="block h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group cursor-pointer">
              {/* Map Placeholder */}
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="Map Location" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white text-secondary px-6 py-2 rounded-full font-bold flex items-center gap-2">
                  <MapPin className="text-primary" /> Open in Maps
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
