import React from 'react';
import { Shield, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 w-full glass px-6 py-4 flex items-center justify-between border-b border-white/5"
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 group-hover:bg-primary/40 transition-colors" />
          <Shield className="w-8 h-8 text-primary relative group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <h1 className="text-xl font-black bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent leading-none">
            DOCSURE
          </h1>
          <p className="text-[10px] text-text-dim tracking-[0.2em] font-medium leading-none mt-1 uppercase">
            Digital Identity
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 glass-card rounded-xl flex items-center justify-center text-text-dim hover:text-white transition-all duration-300">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border border-background-end" />
        </button>

        <div className="h-8 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3 group px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-300 cursor-pointer relative overflow-hidden">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-text-light">{user?.name || 'Guest'}</span>
            <span className="text-[10px] text-text-dim uppercase tracking-wider">{user?.role || 'User'}</span>
          </div>
          <div className="w-9 h-9 glass-card rounded-lg flex items-center justify-center p-0.5 border-primary/20">
            <User className="w-full h-full text-primary-glow" />
          </div>
          <ChevronDown className="w-4 h-4 text-text-dim group-hover:translate-y-0.5 transition-transform" />
        </div>

        <button
          onClick={logout}
          className="w-10 h-10 glass hover:bg-error/10 hover:text-error rounded-xl flex items-center justify-center transition-all duration-300 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
