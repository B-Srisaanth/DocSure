import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileSearch, CheckCircle, ArrowRight, Zap, Users, Lock, Sparkles, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import heroImg from '../assets/hero_bg.png';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 bg-fixed overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
        {/* Abstract Image Background */}
        <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] opacity-30 select-none pointer-events-none overflow-hidden">
           <img 
              src={heroImg} 
              alt="Futuristic Document Verification Background" 
              className="w-full h-full object-cover object-center scale-110 blur-sm lg:blur-none"
           />
           <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900 lg:from-transparent/10" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-bold tracking-wide"
          >
            <Sparkles className="w-4 h-4" />
            Empowering Digital Trust
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Verification for <br />
            <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">The Modern World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            Secure, end-to-end encrypted document verification portal. Speed up your workflows with our automated and administrator-led validation process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/register" className="btn-primary py-4 px-10 text-lg flex items-center gap-2 group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-secondary py-4 px-10 text-lg">
              Sign In to Portal
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: 'Unmatched Security', 
                desc: 'Your documents are encrypted and treated with the highest data security standards.',
                color: 'blue'
              },
              { 
                icon: Zap, 
                title: 'High Velocity', 
                desc: 'Get your documents verified in as little as 24 hours through our optimized queue.',
                color: 'primary'
              },
              { 
                icon: Users, 
                title: 'Expert Approval', 
                desc: 'Every document is manually verified by trained professionals to ensure authenticity.',
                color: 'cyan'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 rounded-3xl border border-white/5 group hover:border-primary-500/30 transition-all"
              >
                <div className={`w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="glass rounded-[3rem] p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 relative bg-white/5">
                <div className="max-w-md">
                    <h2 className="text-4xl font-black text-white mb-6">Trusted by 10,000+ professionals globally</h2>
                    <p className="text-white/40 text-lg mb-8 italic font-medium leading-relaxed">"VerifyPro has completely transformed our onboarding process. What used to take weeks now takes minutes."</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full border border-white/10" />
                        <div>
                            <p className="text-white font-bold">Marcus Sterling</p>
                            <p className="text-primary-400 text-sm">CTO, SecureCorp</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    {[
                        { label: 'Verified Files', val: '2.5M+' },
                        { label: 'Wait Time', val: '<24h' },
                        { label: 'Uptime', val: '99.9%' },
                        { label: 'Security Score', val: '98/100' },
                    ].map((s, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-3xl text-center border-white/10 backdrop-blur-2xl">
                             <h4 className="text-3xl font-black text-white mb-1">{s.val}</h4>
                             <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary-600 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to secure your documents?</h2>
          <Link to="/register" className="bg-white text-primary-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 inline-block shadow-2xl">
            Register Portal Account
          </Link>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 relative bg-slate-950/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8 group cursor-pointer w-fit">
              <ShieldCheck className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                VerifyPro
              </span>
            </div>
            <p className="text-white/30 text-lg leading-relaxed max-w-sm mb-8 font-medium italic">
              Empowering the next generation of digital document verification with speed, security, and human-led precision.
            </p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-primary-400 hover:border-primary-500/20 transition-all cursor-pointer">
                    <Sparkles className="w-4 h-4" />
                 </div>
               ))}
            </div>
          </div>

          <div>
             <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Platform</h4>
             <ul className="space-y-4">
                {['Direct Upload', 'Enterprise verification', 'API Integration', 'Verification Status'].map(item => (
                  <li key={item} className="text-white/30 hover:text-primary-400 cursor-pointer transition-colors text-sm font-bold uppercase tracking-tight">{item}</li>
                ))}
             </ul>
          </div>

          <div>
             <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Company</h4>
             <ul className="space-y-4">
                {['Security Protocol', 'Privacy Policy', 'Terms of Service', 'Support Center'].map(item => (
                  <li key={item} className="text-white/30 hover:text-primary-400 cursor-pointer transition-colors text-sm font-bold uppercase tracking-tight">{item}</li>
                ))}
             </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-white/20 text-xs font-black uppercase tracking-widest leading-loose">
             © 2026 VerifyPro Systems Inc. Built with passion for data security.
           </p>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-opacity">
              <span>GDPR Compliant</span>
              <span>ISO 27001</span>
              <span>256-bit AES</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
