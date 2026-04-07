import React, { useState, useEffect } from 'react';
import { Files, Search, Filter, RefreshCcw, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DocumentCard from '../components/DocumentCard';
import Loader from '../components/Loader';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/documents/my-documents');
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocs = (documents || []).filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-text-light tracking-tight">Identity Vault</h1>
                <p className="text-text-dim mt-2">Manage and monitor your verified digital credentials</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim group-focus-within:text-primary-glow transition-colors" />
                  <input
                    type="text"
                    placeholder="Search Vault..."
                    className="glass-input pl-12 pr-4 py-2.5 w-64 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex glass rounded-xl p-1 shrink-0 border-white/5">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-primary/20 text-primary-glow shadow-inner' : 'text-text-dim hover:text-white'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-primary/20 text-primary-glow shadow-inner' : 'text-text-dim hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={fetchDocuments}
                  className="p-3 glass rounded-xl hover:bg-white/10 text-text-dim hover:text-white transition-all active:rotate-180 duration-500"
                  title="Refresh Encryption Core"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
            </header>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-40">
                <Loader size="lg" className="mb-6" />
                <p className="text-text-dim italic animate-pulse">Decrypting vault contents...</p>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-32 glass-card rounded-[2.5rem] border border-dashed border-white/10">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Files className="w-8 h-8 text-text-dim opacity-30" />
                </div>
                <h3 className="text-xl font-bold text-text-light">No Data Detected</h3>
                <p className="text-text-dim mt-2 mb-8">Initiate a document upload to populate your vault.</p>
                <button className="btn-glow">INITIATE FIRST UPLOAD</button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredDocs.map((doc, idx) => (
                    <DocumentCard key={doc._id || idx} doc={doc} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="glass-card rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] text-text-dim uppercase tracking-[0.2em]">
                      <th className="px-8 py-5 font-black">Document Details</th>
                      <th className="px-6 py-5 font-black">Verification Status</th>
                      <th className="px-6 py-5 font-black text-center">Timestamp</th>
                      <th className="px-8 py-5 font-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc, idx) => (
                      <motion.tr
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={doc._id || idx}
                        className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 glass rounded-xl flex items-center justify-center">
                              <Files className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-text-light">{doc.name}</span>
                              <span className="text-[10px] text-text-dim uppercase tracking-wider">{doc.type || 'DOCUMENT'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                           {/* Status Badge already has tailwind styles */}
                           <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-white/5 bg-white/5">
                             <div className={`w-2 h-2 rounded-full mr-2 ${
                               doc.status === 'Approved' ? 'bg-success' :
                               doc.status === 'Rejected' ? 'bg-error' :
                               'bg-yellow-500'
                             }`} />
                             {doc.status}
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center text-xs text-text-dim">
                          {new Date(doc.createdAt).toLocaleString()}
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button className="text-[10px] uppercase font-black tracking-widest text-primary-glow hover:text-white transition-colors">
                             View Details
                           </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MyDocuments;
