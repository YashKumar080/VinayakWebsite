import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    product_interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{ ...formData, is_read: false }]);
        
      if (error) throw error;
      
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '', product_interest: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-24 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary mb-4 text-glow">Contact Us</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="font-body text-xl text-gray-600 max-w-2xl mx-auto">
            Walk in anytime — we're always happy to help you find what you need. Or send us a message below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-3xl font-bold text-secondary mb-8">Get in Touch</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Visit Our Shop</h3>
                  <p className="text-gray-600 font-body">Vinayak Trading Company,<br/>Main Market, Palsana,<br/>Sikar, Rajasthan - 332402</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Call or WhatsApp</h3>
                  <p className="text-gray-600 font-body">+91 98284 21209</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-gray-600 font-body">contact@vinayaktrading.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Business Hours</h3>
                  <p className="text-gray-600 font-body">Mon - Sat: 9:00 AM - 8:00 PM<br/><span className="text-red-500">Sunday: Closed</span></p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113426.37627449557!2d75.140889!3d27.486259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5e000000001%3A0x8e8db2d949437b01!2sPalsana%2C%20Rajasthan%20332402!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-bl-full opacity-10 pointer-events-none"></div>
            
            <h2 className="font-display text-3xl font-bold text-secondary mb-6">Send an Enquiry</h2>
            
            {success ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-lg border border-green-200 flex flex-col items-center justify-center text-center h-64">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                <p>We've received your enquiry and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="product_interest" className="block text-sm font-medium text-gray-700 mb-2">Interested In (Optional)</label>
                  <select
                    id="product_interest"
                    name="product_interest"
                    value={formData.product_interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition outline-none bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="astral-paints">Astral Paints</option>
                    <option value="hardware">Hardware & Tools</option>
                    <option value="waterproofing">Waterproofing Solutions</option>
                    <option value="other">Other / General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition outline-none resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={20} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
