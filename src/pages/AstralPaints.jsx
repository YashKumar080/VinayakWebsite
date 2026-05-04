import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';

const AstralPaints = () => {
  const phone = "919828421209";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-accent">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://picsum.photos/seed/astralhero/1920/1080" alt="Astral Paints Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <span className="bg-primary/20 text-primary border border-primary/50 px-4 py-1 rounded-full font-bold text-sm tracking-wider mb-6 inline-block">AUTHORIZED DEALER</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">Astral Paints Collection</h1>
          <p className="font-body text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Transform your spaces with India's most innovative paint technology. Discover over 500+ shades for every mood and surface.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/products" className="bg-primary text-secondary px-8 py-3 rounded-md font-bold hover:bg-white transition">
              Browse Catalog
            </Link>
            <a href={`https://wa.me/${phone}?text=Hi, I want to see the Astral Paint Shade Card`} target="_blank" rel="noreferrer" className="bg-white/10 border border-white/30 px-8 py-3 rounded-md font-bold hover:bg-white/20 transition flex items-center gap-2">
              <MessageCircle size={20} /> Request Shade Card
            </a>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-secondary mb-4">Our Product Range</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Interior Emulsions', desc: 'Luxury finish, washable, and anti-bacterial paints for your indoor spaces.', img: 'https://picsum.photos/seed/interior/400/300' },
              { title: 'Exterior Weather-Proof', desc: 'Advanced protection against harsh sun, rain, and dust for exterior walls.', img: 'https://picsum.photos/seed/exterior/400/300' },
              { title: 'Waterproofing', desc: 'Damp-proof solutions to protect your home from leaks and moisture.', img: 'https://picsum.photos/seed/waterproofing/400/300' },
              { title: 'Wood & Metal Enamel', desc: 'Glossy and protective coatings for doors, windows, and grills.', img: 'https://picsum.photos/seed/enamel/400/300' },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition"
              >
                <div className="h-48 overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cat.desc}</p>
                  <a href={`https://wa.me/${phone}?text=Enquiring about ${cat.title}`} target="_blank" rel="noreferrer" className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Enquire Now <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Astral */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="https://picsum.photos/seed/astralfeature/800/600" alt="Why Astral" className="rounded-2xl shadow-lg border border-gray-100" />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-secondary mb-6">Why Choose Astral Paints?</h2>
              <p className="text-gray-600 font-body mb-8">
                Astral Paints brings advanced chemical engineering into the paint industry, offering unmatched durability, finish, and protection.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Advanced Anti-Viral & Anti-Bacterial Technology',
                  'Superior Washability for Easy Maintenance',
                  'Excellent Coverage (Value for Money)',
                  'Eco-Friendly & Low VOC formulation',
                  '500+ Computerized Shades Available In-Store'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <span className="font-body text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default AstralPaints;
