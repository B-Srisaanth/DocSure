import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(formData);
      toast.success('Registration successful!', {
        style: { background: '#0F172A', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)' },
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.', {
        style: { background: '#0F172A', color: '#F43F5E', border: '1px solid rgba(244,63,94,0.2)' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_0%_50%,_#1e293b_0%,_transparent_50%)]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <Shield className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-3xl font-black text-text-light">Create Identity</h2>
          <p className="text-text-dim mt-2 font-medium">Join the decentralized verification network</p>
        </div>

        <motion.div
          whileHover={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)' }}
          className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label-group">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  required
                  value={formData.name}
                  className="floating-input w-full glass-input peer"
                  onChange={handleChange}
                />
                <label className="floating-label flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
              </div>

              <div className="floating-label-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                  value={formData.email}
                  className="floating-input w-full glass-input peer"
                  onChange={handleChange}
                />
                <label className="floating-label flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
              </div>
            </div>

            <div className="floating-label-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                required
                value={formData.password}
                className="floating-input w-full glass-input peer"
                onChange={handleChange}
              />
              <label className="floating-label flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold text-text-dim uppercase tracking-widest px-1">Access Tier</label>
              <div className="grid grid-cols-2 gap-4">
                {['user', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`p-3 rounded-xl border transition-all duration-300 capitalize text-sm font-semibold flex items-center justify-center gap-2 ${formData.role === role
                        ? 'bg-primary/20 border-primary text-primary-glow shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        : 'bg-white/5 border-white/5 text-text-dim hover:bg-white/10'
                      }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${formData.role === role ? 'bg-primary' : 'bg-slate-500'}`} />
                    {role} Role
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full btn-glow flex items-center justify-center gap-2 py-4 group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  INITIALIZE IDENTITY
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-text-dim font-medium">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-primary-glow hover:underline hover:text-white transition-all font-bold inline-flex items-center gap-1 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Decryption
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
