import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Search, Filter, ShoppingCart, MessageCircle } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        throw new Error('Fallback to mock data');
      }
      setProducts(data);
    } catch (err) {
      // Fallback mock data if Supabase is not setup
      setProducts([
        {
          id: '1',
          name: 'Astral Damp Proof',
          category: 'Waterproofing',
          description: 'Advanced waterproofing solution for roofs and terraces.',
          price: '₹550/L',
          image_url: 'https://images.unsplash.com/photo-1588612144347-1510abdf1e6b?q=80&w=800&auto=format&fit=crop',
          is_featured: true,
          in_stock: true
        },
        {
          id: '2',
          name: 'Astral Interior Silk Emulsion',
          category: 'Paints',
          description: 'Premium interior paint with a smooth silk finish and easy washability.',
          price: '₹420/L',
          image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
          is_featured: true,
          in_stock: true
        },
        {
          id: '3',
          name: 'Heavy Duty Hammer Drill',
          category: 'Hardware',
          description: 'Professional grade 850W hammer drill for heavy masonry work.',
          price: '₹3200',
          image_url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop',
          is_featured: true,
          in_stock: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnquire = (productName) => {
    const phone = "919828421209";
    const text = `Hi, I'm interested in the product: ${productName}. Can you share more details?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-24 min-h-screen bg-background"
    >
      {/* Header */}
      <div className="bg-secondary text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary">Our Catalog</h1>
          <p className="font-body text-xl max-w-2xl mx-auto text-gray-300">
            Browse our extensive collection of premium paints, heavy-duty hardware, and professional tools.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b pb-2"><Filter size={20}/> Filters</h3>
              
              <div className="mb-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-secondary">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${selectedCategory === cat ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img src={product.image_url || `https://picsum.photos/seed/${product.id}/400/300`} alt={product.name} className="w-full h-full object-cover" />
                      {product.is_featured && (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">Featured</span>
                      )}
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-red-500 text-white font-bold px-4 py-1 rounded-full shadow">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{product.category}</div>
                      <h3 className="font-display text-xl font-bold text-secondary mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="font-bold text-lg">{product.price || 'Ask Price'}</div>
                        <button 
                          onClick={() => handleEnquire(product.name)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-transform hover:scale-110 shadow-sm"
                          title="Enquire on WhatsApp"
                        >
                          <MessageCircle size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Products;
