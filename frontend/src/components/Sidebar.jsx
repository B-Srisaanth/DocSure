import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Files, ShieldCheck, UserCog, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Upload', icon: UploadCloud, path: '/upload' },
    { title: 'My Documents', icon: Files, path: '/my-documents' },
  ];

  const adminItems = [
    { title: 'Admin Panel', icon: ShieldCheck, path: '/admin' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-0 top-20 bottom-0 w-64 glass-sidebar px-4 py-8 flex flex-col gap-8 z-30"
    >
      <div className="flex flex-col gap-2">
        <label className="text-[10px] text-text-dim/50 font-bold uppercase tracking-[0.2em] px-4 mb-2">Main Menu</label>
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                isActive
                  ? 'bg-primary/10 text-primary-glow border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-text-dim hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon className={`w-5 h-5 group-hover:scale-110 transition-transform`} />
            <span>{item.title}</span>
            <div className="ml-auto w-1 h-4 bg-primary rounded-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </div>

      {isAdmin && (
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-text-dim/50 font-bold uppercase tracking-[0.2em] px-4 mb-2">Administration</label>
          {adminItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  isActive
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'text-text-dim hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className={`w-5 h-5 group-hover:scale-110 transition-transform text-accent-cyan shadow-sm`} />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pb-6">
        <button className="flex items-center gap-3 px-4 py-3 text-text-dim hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 text-sm">
          <HelpCircle className="w-5 h-5" />
          Support
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-error/70 hover:text-error hover:bg-error/10 rounded-xl transition-all duration-300 text-sm group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout System
        </button>
      </div>

      {/* Glossy decorative curve */}
      <div className="absolute top-1/2 left-0 w-full h-32 bg-primary/5 blur-[80px] -translate-y-1/2 pointer-events-none" />
    </motion.aside>
  );
};

export default Sidebar;
