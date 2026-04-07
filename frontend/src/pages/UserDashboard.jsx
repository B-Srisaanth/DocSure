import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.service';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { Plus, LayoutDashboard, FileText, ExternalLink, Calendar, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents/my');
      setDocuments(response.documents);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-fixed pt-24 pb-12 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold text-white mb-2">My Documents</h1>
            <p className="text-white/40 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-primary-400" />
              Manage and track your document verification status
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/user/upload')}
            className="btn-primary py-3.5 px-6 flex items-center justify-center gap-2 text-base self-start"
          >
            <Plus className="w-5 h-5" />
            Upload New Document
          </motion.button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-white/10 rounded-full animate-spin"></div>
          </div>
        ) : documents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card rounded-3xl p-16 text-center"
          >
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No documents found</h3>
            <p className="text-white/40 max-w-md mx-auto mb-8">
              You haven't uploaded any documents for verification yet. Click the button above to get started.
            </p>
            <button
               onClick={() => navigate('/user/upload')}
               className="text-primary-400 hover:text-primary-300 font-semibold underline underline-offset-4"
            >
              Upload your first document
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={doc._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-2xl overflow-hidden group border border-white/5 hover:border-primary-500/30 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <FileText className="w-6 h-6 text-primary-400" />
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{doc.title}</h3>
                  <p className="text-white/40 text-sm mb-6 uppercase tracking-wider font-medium">{doc.type}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-3 rounded-lg">
                       <Calendar className="w-4 h-4 text-primary-400 shrink-0" />
                       <div className="flex flex-col">
                          <span className="text-[10px] text-white/30 uppercase font-bold">Uploaded On</span>
                          <span>{new Date(doc.uploadedAt).toLocaleDateString(undefined, {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}</span>
                       </div>
                    </div>

                    {doc.remarks && (
                      <div className="flex items-start gap-3 text-sm text-rose-300/80 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                         <Info className="w-4 h-4 shrink-0 mt-0.5" />
                         <div className="flex flex-col">
                            <span className="text-[10px] text-rose-400 uppercase font-bold">Admin Remarks</span>
                            <span>{doc.remarks}</span>
                         </div>
                      </div>
                    )}
                  </div>

                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm transition-all border border-white/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Document
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
