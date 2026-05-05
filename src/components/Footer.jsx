import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-background pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-6">Vinayak Trading Co.</h3>
            <p className="text-gray-400 mb-6 font-body">
              Your trusted partner for high-quality hardware and premium paints. Authorized Astral Paint Dealer serving Palsana & Sikar since established.
            </p>
            <div className="inline-block bg-accent text-white px-4 py-2 rounded-md font-medium text-sm">
              🌟 Authorized Astral Dealer
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 font-body">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition">All Products</Link></li>
              <li><Link to="/astral-paints" className="text-gray-400 hover:text-primary transition">Astral Paints</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 font-body text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <span>Vinayak Trading Company,<br/>Palsana, Sikar,<br/>Rajasthan - 332402</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+91 98284 21209</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={20} />
                <span>contact@vinayaktrading.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Business Hours</h4>
            <ul className="space-y-4 font-body text-gray-400">
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span className="flex items-center gap-2"><Clock size={16}/> Mon - Sat</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-2 text-gray-400">
                <span className="flex items-center gap-2"><Clock size={16}/> Sunday</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Vinayak Trading Company. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/admin" className="hover:text-primary transition">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
