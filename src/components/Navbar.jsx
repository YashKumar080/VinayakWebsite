import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Astral Paints', path: '/astral-paints' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background shadow-md py-3' : 'bg-background/90 backdrop-blur-md py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary">Vinayak Trading Co.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-secondary'}`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+919828421209" className="bg-primary text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-yellow-600 transition font-medium">
              <Phone size={18} /> Call Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-secondary focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-gray-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-secondary hover:bg-primary/10 hover:text-primary transition"
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+919828421209" className="block w-full text-center mt-4 bg-primary text-white px-5 py-3 rounded font-medium">
                Call Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
