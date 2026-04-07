import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Mail, Shield, Calendar, Award, ChevronLeft, X, Save, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const navigate = useNavigate();

  if (!user) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setModalOpen(false);
      setFormData({ ...formData, password: '' });
    } catch (err) {
      // toast already handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-fixed pt-24 pb-12 px-6">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-white/40 hover:text-primary-400 transition-colors group font-bold tracking-widest text-xs uppercase"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return</span>
        </button>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card rounded-[3rem] p-10 lg:p-16 relative overflow-hidden"
        >
           <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="relative group">
                  <div className="w-40 h-40 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center text-6xl font-black text-white shadow-2xl shadow-primary-500/20 group-hover:scale-105 transition-transform">
                      {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-400" />
                  </div>
              </div>

              <div className="text-center md:text-left flex-1">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight uppercase tracking-tight">{user.name}</h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/40 font-medium">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                        <Shield className="w-4 h-4 text-primary-400" />
                        {user.role}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                        <Mail className="w-4 h-4 text-primary-400" />
                        {user.email}
                      </span>
                  </div>
              </div>
           </div>

           <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
               {[
                   { label: 'Security Status', val: 'Verified Account', icon: Shield, color: 'primary' },
                   { label: 'Member Since', val: new Date(user.createdAt || Date.now()).getFullYear(), icon: Calendar, color: 'cyan' }
               ].map((item, idx) => (
                   <div key={idx} className="glass rounded-[2rem] p-8 border-white/5 flex gap-6 items-center">
                        <div className={`w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center`}>
                            <item.icon className="w-8 h-8 text-primary-400" />
                        </div>
                        <div>
                            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-xl font-extrabold text-white">{item.val}</p>
                        </div>
                   </div>
               ))}
           </div>
           
           <div className="mt-12 pt-12 border-t border-white/5 relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
                <div>
                   <h3 className="text-xl font-bold text-white mb-1 italic">Account Intelligence</h3>
                   <p className="text-white/30 text-sm max-w-sm">Every document you upload is analyzed by our system experts with the highest level of scrutiny.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                       onClick={() => setModalOpen(true)}
                       className="btn-primary py-3 px-8 text-sm font-bold shadow-primary-500/20"
                    >
                      Edit Profile
                    </button>
                    <button className="btn-secondary py-3 px-8 text-sm font-bold">Security Settings</button>
                </div>
           </div>
        </motion.div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card rounded-[2.5rem] p-10 w-full max-w-md relative border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Update Profile</h2>
                  <button onClick={() => setModalOpen(false)} className="text-white/20 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-white/40 mb-2 ml-1">New Password (Optional)</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary-400" />
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white font-medium placeholder-white/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 text-base font-black flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-t-white border-white/20 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
