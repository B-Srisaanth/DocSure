import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, RefreshCcw, Send, CheckCircle2, XCircle, MoreVertical, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DocumentCard from '../components/DocumentCard';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingDocs, setPendingDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [remark, setRemark] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // 'Approve' or 'Reject'

  useEffect(() => {
    fetchPendingDocs();
  }, []);

  const fetchPendingDocs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/documents/pending');
      setPendingDocs(res.data.documents || []);
    } catch (err) {
      console.error('Login failed to load pending docs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (doc, action) => {
    setSelectedDoc(doc);
    setActionType(action);
    setRemark('');
    setIsModalOpen(true);
  };

  const submitAction = async () => {
    if (!selectedDoc) return;
    
    try {
      await api.patch(`/documents/${selectedDoc._id}/status`, {
        status: actionType === 'Approve' ? 'Approved' : 'Rejected',
        remark: remark,
      });
      
      toast.success(`Verification ${actionType}d successfully!`, {
        style: { background: '#0F172A', color: '#E2E8F0', border: '1px solid rgba(255,255,255,0.1)' },
      });
      
      setIsModalOpen(false);
      fetchPendingDocs();
    } catch (err) {
      toast.error('Action failed. Core integrity compromised.');
    }
  };

  return (
    <div className="min-screen flex flex-col bg-background-end">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-text-light tracking-tight flex items-center gap-4">
                  Security Nucleus
                  <div className="px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full text-xs font-bold text-accent-cyan">ADMIN CORE</div>
                </h1>
                <p className="text-text-dim mt-2">Overseeing document verification across the DocSure network</p>
              </div>
              <button
                onClick={fetchPendingDocs}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 text-text-dim hover:text-white transition-all active:rotate-180 duration-700 shadow-xl"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                  { label: 'PENDING TASKS', value: pendingDocs.length, icon: RefreshCcw, color: 'text-primary-glow' },
                  { label: 'AVRG. UPTIME', value: '99.99%', icon: Send, color: 'text-success' },
                  { label: 'DATA INTEGRITY', value: 'OPTIMAL', icon: ShieldCheck, color: 'text-accent-cyan' },
                  { label: 'ENCRYPTION CORE', value: 'AES-256', icon: Lock, color: 'text-primary' },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/[0.02] rounded-full group-hover:scale-150 transition-transform duration-500" />
                  <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                  <h4 className="text-[10px] font-black text-text-dim tracking-[0.2em]">{stat.label}</h4>
                  <p className="text-2xl font-black text-text-light mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-40">
                <Loader size="lg" className="mb-4" />
                <p className="text-text-dim font-bold text-sm tracking-tighter">SYNCHRONIZING VERIFICATION DATA...</p>
              </div>
            ) : (
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5">
                <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
                   <h3 className="text-xl font-bold text-text-light">Verification Queue</h3>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-glow animate-pulse" />
                      <span className="text-[10px] font-bold text-text-dim tracking-widest">{pendingDocs.length} DOCS DETECTED</span>
                   </div>
                </div>
                
                {pendingDocs.length === 0 ? (
                  <div className="p-20 text-center flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-success/30 mb-6" />
                    <h4 className="text-2xl font-black text-white/50 lowercase tracking-tighter italic">Queue fully processed. Core stable.</h4>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-white/[0.01] text-[10px] text-text-dim uppercase tracking-[0.2em]">
                          <th className="px-10 py-5 font-black">Network ID</th>
                          <th className="px-6 py-5 font-black">Document Hash</th>
                          <th className="px-6 py-5 font-black">User Identity</th>
                          <th className="px-10 py-5 font-black text-right">Verification Protocols</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingDocs.map((doc, idx) => (
                          <motion.tr
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            key={doc._id}
                            className="group hover:bg-white/[0.03] transition-all border-b border-white/5 last:border-0"
                          >
                            <td className="px-10 py-5">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 glass-card rounded-xl group-hover:bg-primary/20 transition-colors flex items-center justify-center p-0.5 border-primary/20 shadow-inner">
                                    <ShieldCheck className="w-5 h-5 text-primary-glow" />
                                  </div>
                                  <span className="font-bold text-text-light font-mono text-xs">{doc._id.substring(0, 10).toUpperCase()}</span>
                               </div>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex flex-col">
                                  <span className="font-bold text-text-light truncate max-w-[150px]">{doc.name}</span>
                                  <span className="text-[10px] text-text-dim uppercase tracking-tighter">SHA-256 ENCRYPTED</span>
                               </div>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 glass rounded-full flex items-center justify-center text-[10px] font-black">{doc.user?.username?.charAt(0) || 'U'}</div>
                                  <div className="flex flex-col">
                                     <span className="text-sm font-bold text-text-light">{doc.user?.username || 'Redacted'}</span>
                                     <span className="text-[10px] text-text-dim italic">{doc.user?.email || 'N/A'}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-5 text-right flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleActionClick(doc, 'Approve')}
                                className="w-10 h-10 glass-card border-success/30 hover:bg-success/20 text-success rounded-xl transition-all hover:scale-110 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                title="Approve"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleActionClick(doc, 'Reject')}
                                className="w-10 h-10 glass-card border-error/30 hover:bg-error/20 text-error rounded-xl transition-all hover:scale-110 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${actionType === 'Approve' ? 'AUTHENTICATE' : 'REJECT'} PROTOCOL`}
      >
        <div className="flex flex-col gap-6">
           <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
             actionType === 'Approve' ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'
           }`}>
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
               actionType === 'Approve' ? 'bg-success text-white' : 'bg-error text-white'
             }`}>
               {actionType === 'Approve' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
             </div>
             <div>
               <h4 className="font-black text-text-light">Verification Signature</h4>
               <p className="text-xs text-text-dim italic line-clamp-1">Target: {selectedDoc?.name}</p>
             </div>
           </div>

           <div className="space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                   <MessageSquare className="w-3.5 h-3.5" />
                   Verification Remarks
                </label>
                <span className="text-[10px] text-text-dim/50 italic capitalize">{actionType.toLowerCase()}ion log will be archived</span>
             </div>
             <textarea
               className="w-full glass-input min-h-[120px] resize-none text-sm placeholder:italic"
               placeholder="Add remarks for the user account logs here..."
               value={remark}
               onChange={(e) => setRemark(e.target.value)}
             />
           </div>

           <div className="flex gap-4">
             <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 glass text-text-dim font-bold py-3 rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
             >
                Abort Protocol
             </button>
             <button
                onClick={submitAction}
                className={`flex-1 font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs shadow-lg hover:scale-105 ${
                  actionType === 'Approve' ? 'bg-success text-white hover:shadow-success/30' : 'bg-error text-white hover:shadow-error/30'
                }`}
             >
                Confirm Signature
             </button>
           </div>
        </div>
      </Modal>
    </div>
  );
};

const Lock = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
)

export default AdminDashboard;
