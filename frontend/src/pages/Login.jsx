import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Successfully logged in!', {
        style: { background: '#0F172A', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)' },
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check credentials.', {
        style: { background: '#0F172A', color: '#F43F5E', border: '1px solid rgba(244,63,94,0.2)' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_transparent_50%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <Shield className="w-8 h-8 text-primary shadow-sm" />
          </motion.div>
          <h2 className="text-3xl font-black text-text-light tracking-tight">Access DocSure</h2>
          <p className="text-text-dim mt-2 font-medium">Verify. Secure. Authenticate.</p>
        </div>

        <motion.div
          whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)' }}
          className="glass-card rounded-[2rem] p-8 relative overflow-hidden"
        >
          {/* Subtle BG Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-cyan/5 blur-3xl -ml-16 -mb-16 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="floating-label-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                required
                value={formData.email}
                className="floating-input w-full glass-input pr-12 focus:border-primary peer"
                onChange={handleChange}
                autoFocus
              />
              <label className="floating-label flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="absolute right-4 top-3.5 text-text-dim peer-focus:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
            </div>

            <div className="floating-label-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                required
                value={formData.password}
                className="floating-input w-full glass-input pr-12 focus:border-primary peer"
                onChange={handleChange}
              />
              <label className="floating-label flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Secure Password
              </label>
              <div className="absolute right-4 top-3.5 text-text-dim peer-focus:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full btn-glow flex items-center justify-center gap-2 group py-4 font-bold tracking-wide"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  AUTHENTICATE
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-text-dim font-medium">
            New to the vault?{' '}
            <Link
              to="/register"
              className="text-primary-glow hover:underline hover:text-white transition-all font-bold inline-flex items-center gap-1 group"
            >
              Initialize Identity
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
