import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 px-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-primary" size={32} />
        </div>
        <h1 className="font-display text-3xl font-bold text-center mb-2 text-secondary">Admin Access</h1>
        <p className="text-sm text-gray-500 mb-8 text-center font-body">Secure login for Vinayak Trading Co. management.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="admin@vinayaktrading.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-black transition mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
