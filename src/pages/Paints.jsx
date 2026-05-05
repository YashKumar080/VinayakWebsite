import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { MessageCircle, Phone, MapPin, Palette, Shield, Droplet, Leaf, ArrowRight } from 'lucide-react';

const Paints = () => {
  const [paints, setPaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const phone = "919828421209";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPaints = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'Paints')
          .order('created_at', { ascending: false });

        if (data && !error) {
          setPaints(data);
        }
      } catch (err) {
        console.error('Error fetching paints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaints();
  }, []);

  const filters = ['All', 'Interior', 'Exterior', 'Waterproofing', 'Primer & Putty', 'Wood & Metal Enamel'];

  const filteredPaints = paints.filter(p => {
    if (activeFilter === 'All') return true;
    const searchStr = `${p.name} ${p.description || ''}`.toLowerCase();
    
    switch(activeFilter) {
      case 'Interior': return searchStr.includes('interior');
      case 'Exterior': return searchStr.includes('exterior') || searchStr.includes('weather');
      case 'Waterproofing': return searchStr.includes('waterproof') || searchStr.includes('damp');
      case 'Primer & Putty': return searchStr.includes('primer') || searchStr.includes('putty');
      case 'Wood & Metal Enamel': return searchStr.includes('wood') || searchStr.includes('metal') || searchStr.includes('enamel');
      default: return true;
    }
  });

  const handleEnquire = (productName) => {
    const text = `Hi, I'm interested in the paint product: ${productName}. Can you share more details?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const colorSwatches = [
    { name: 'Ivory Coast', color: '#F2E8C6' },
    { name: 'Desert Sand', color: '#E1C699' },
    { name: 'Terracotta', color: '#E2725B' },
    { name: 'Ocean Depths', color: '#1B4D3E' },
    { name: 'Midnight Blue', color: '#191970' },
    { name: 'Dusty Rose', color: '#DCAE96' },
    { name: 'Sage Green', color: '#B2AC88' },
    { name: 'Charcoal Grey', color: '#36454F' },
    { name: 'Golden Ochre', color: '#C8922A' },
    { name: 'Warm Beige', color: '#F5F5DC' }
  ];

  const getCategoryColor = (name, desc) => {
    const str = `${name} ${desc || ''}`.toLowerCase();
    if (str.includes('interior')) return 'bg-pink-400';
    if (str.includes('exterior')) return 'bg-blue-400';
    if (str.includes('waterproof')) return 'bg-cyan-500';
    if (str.includes('wood') || str.includes('metal')) return 'bg-amber-600';
    return 'bg-primary';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" 
            alt="Paints Background" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white mt-12">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block bg-primary/20 border border-primary/50 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6 backdrop-blur-sm shadow-lg"
          >
            AUTHORIZED ASTRAL DEALER — PALSANA, SIKAR
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-glow"
          >
            Colors That Tell Your Story
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xl text-gray-200 max-w-3xl mx-auto mb-10"
          >
            Explore our premium Astral Paint collection — 500+ shades for every wall, every mood, every home.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#products-grid" className="bg-primary text-secondary px-8 py-4 rounded-md font-bold hover:bg-yellow-600 transition box-glow flex items-center justify-center gap-2">
              Browse Paints <ArrowRight size={20} />
            </a>
            <a href={`https://wa.me/${phone}?text=Hi, I want to see the Astral Paint Shade Card`} target="_blank" rel="noreferrer" className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-md font-bold hover:bg-white/20 transition flex items-center justify-center gap-2">
              <MessageCircle size={20} /> WhatsApp for Shade Card
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER BAR & PRODUCTS GRID */}
      <section id="products-grid" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pills */}
        <div 
          className="flex overflow-x-auto pb-4 mb-12 gap-3 justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-primary text-secondary shadow-md scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : filteredPaints.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <Palette className="mx-auto text-primary opacity-50 mb-4" size={48} />
            <h3 className="font-display text-2xl font-bold text-secondary mb-3">Our paint collection is being updated.</h3>
            <p className="text-gray-600 font-body mb-6">
              Visit the shop or WhatsApp us for the full range of Astral Paints. We have 500+ shades available in-store!
            </p>
            <a href={`https://wa.me/${phone}?text=Hi, I'd like to know about your paint collection`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-md font-bold hover:bg-black transition">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaints.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 flex flex-col relative group"
              >
                {/* Colored Stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getCategoryColor(product.name, product.description)} z-10`}></div>
                
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image_url || `https://picsum.photos/seed/${product.id}/400/300`} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded shadow text-secondary uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col pl-8">
                  <h3 className="font-display text-2xl font-bold text-secondary mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{product.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="font-bold text-lg text-secondary">{product.price || 'Ask for Price'}</div>
                    <button 
                      onClick={() => handleEnquire(product.name)}
                      className="bg-primary/10 hover:bg-primary text-secondary p-2.5 rounded-full transition-colors group/btn flex items-center gap-2 px-4"
                    >
                      <MessageCircle size={18} className="text-primary group-hover/btn:text-secondary" />
                      <span className="text-sm font-bold group-hover/btn:text-secondary text-primary">Enquire</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 3. COLOR INSPIRATION STRIP */}
      <section className="bg-white py-16 border-y border-gray-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-jaali opacity-5 pointer-events-none"></div>
        <div className="text-center mb-10 relative z-10">
          <h2 className="font-display text-3xl font-bold text-secondary">Find Your Perfect Shade</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="relative w-full flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex gap-10 px-4 whitespace-nowrap"
          >
            {[...colorSwatches, ...colorSwatches, ...colorSwatches].map((swatch, i) => (
               <div key={i} className="flex flex-col items-center gap-3">
                 <div 
                  className="w-24 h-24 rounded-full shadow-lg border-4 border-white transform hover:scale-110 transition-transform cursor-pointer" 
                  style={{ backgroundColor: swatch.color }}
                 ></div>
                 <span className="text-sm font-bold text-secondary font-display italic">{swatch.name}</span>
               </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY ASTRAL PAINTS SECTION */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">Why Choose Astral?</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '500+ Computerized Shades', icon: Palette },
              { title: 'Anti-Viral & Weather-Proof Technology', icon: Shield },
              { title: 'Superior Washability', icon: Droplet },
              { title: 'Eco-Friendly & Low VOC', icon: Leaf },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group text-center"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <feature.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-secondary">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTRACTOR CALLOUT BANNER */}
      <section className="bg-accent py-16 relative overflow-hidden">
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
      </section>

      {/* 6. BOTTOM CTA SECTION */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-secondary mb-4">Can't find your shade? We'll help.</h2>
          <p className="font-body text-lg text-gray-600 mb-10">
            Visit our shop in Palsana or WhatsApp us — we carry shade cards for the full Astral range.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://maps.app.goo.gl/BVbaXLSPV2ZRRYkv5" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-md font-bold hover:bg-black transition">
              <MapPin size={20} /> Get Directions
            </a>
            <a href={`https://wa.me/${phone}?text=Hi, I need help finding a paint shade.`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-md font-bold hover:bg-green-600 transition shadow-lg shadow-green-500/30">
              <MessageCircle size={20} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Paints;
