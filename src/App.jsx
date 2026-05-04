import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Products from './pages/Products';
import AstralPaints from './pages/AstralPaints';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative font-body text-secondary bg-background">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/astral-paints" element={<AstralPaints />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;
