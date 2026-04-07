import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-12 text-center rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
          <AlertCircle className="w-12 h-12 text-rose-500" />
        </div>
        
        <h1 className="text-8xl font-black text-white mb-4 italic opacity-5">404</h1>
        <h2 className="text-4xl font-extrabold text-white mb-4">Page Not Found</h2>
        <p className="text-white/40 text-lg mb-10 leading-relaxed font-medium capitalize italic">The document you're looking for was never signed, sealed, or delivered.</p>
        
        <Link to="/" className="btn-primary py-4 px-10 text-lg flex items-center justify-center gap-3 w-full">
          <ArrowLeft className="w-5 h-5" />
          Back to Safety
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
