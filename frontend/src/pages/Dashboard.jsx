import React, { useState, useCallback } from 'react';
import { UploadCloud, File, X, CheckCircle2, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setIsDone(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      // Simulate progress for UI effect
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      clearInterval(interval);
      setUploadProgress(100);
      setIsDone(true);
      toast.success('Document uploaded for verification!', {
        icon: <ShieldCheck className="text-success" />,
        style: { background: '#0F172A', color: '#E2E8F0', border: '1px solid rgba(16,185,129,0.2)' },
      });
      
      // Clear after success
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setIsDone(false);
        setUploadProgress(0);
      }, 3000);

    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed. Security protocols triggered.', {
        style: { background: '#0F172A', color: '#F43F5E', border: '1px solid rgba(244,63,94,0.2)' },
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-screen flex flex-col bg-background-end">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-black text-text-light tracking-tight">Vault Upload</h1>
                <p className="text-text-dim mt-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-glow" />
                  Securely upload documents for AI-powered verification
                </p>
              </div>
              <div className="flex gap-4">
                <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-text-dim">Network Active</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <motion.div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`relative h-96 glass-card rounded-[2rem] border-2 border-dashed transition-all duration-500 overflow-hidden group flex flex-col items-center justify-center p-10 ${
                    file ? 'border-primary shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'border-white/10 hover:border-primary/50'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!file ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center flex flex-col items-center"
                      >
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                           <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-125" />
                           <UploadCloud className="w-12 h-12 text-primary relative" />
                        </div>
                        <h3 className="text-2xl font-bold text-text-light mb-2">Ingest Document</h3>
                        <p className="text-text-dim text-sm max-w-xs mb-8">
                          Drag and drop your PDF, JPG or PNG file here to initiate encryption.
                        </p>
                        <label className="btn-primary cursor-pointer hover:shadow-primary/40 flex items-center gap-3 group">
                          <input type="file" className="hidden" onChange={onFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                          <File className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                          Select from Core
                        </label>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex flex-col"
                      >
                        <div className="flex-1 rounded-2xl overflow-hidden glass border border-white/10 relative group/preview">
                          {file.type.startsWith('image/') ? (
                             <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                          ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                                <File className="w-16 h-16 text-primary-glow mb-4" />
                                <span className="text-sm font-bold text-text-dim uppercase tracking-tighter">{file.name.split('.').pop()} Document</span>
                             </div>
                          )}
                          <div className="absolute inset-0 bg-background-end/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                             <button onClick={() => {setFile(null); setPreview(null);}} className="p-3 bg-error text-white rounded-xl hover:scale-110 transition-transform">
                                <X className="w-6 h-6" />
                             </button>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                           <div>
                              <p className="font-bold text-text-light truncate max-w-[250px]">{file.name}</p>
                              <p className="text-xs text-text-dim">{(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for ingestion</p>
                           </div>
                           {!isDone && (
                             <button
                               onClick={handleUpload}
                               disabled={isUploading}
                               className="btn-glow flex items-center gap-2"
                             >
                               {isUploading ? 'UPLOADING...' : 'INITIATE UPLOAD'}
                               <ArrowRight className="w-4 h-4" />
                             </button>
                           )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress Overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background-end/80 backdrop-blur-md p-10">
                      <div className="w-full max-w-sm">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-primary-glow uppercase tracking-tighter">Encrypting & Uploading</span>
                          <span className="text-sm font-bold text-white">{uploadProgress}%</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            className="h-full bg-gradient-to-r from-primary to-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                          />
                        </div>
                        <p className="text-center mt-6 text-xs text-text-dim italic">"Establishing secure tunnel to DocSure nodes..."</p>
                      </div>
                    </div>
                  )}

                  {isDone && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background-end/90 backdrop-blur-xl"
                    >
                      <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6 border border-success/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-12 h-12 text-success" />
                      </div>
                      <h3 className="text-2xl font-black text-white">UPLOAD COMPLETE</h3>
                      <p className="text-text-dim mt-2">Document queued for verification.</p>
                      <button onClick={() => {setFile(null); setPreview(null); setIsDone(false);}} className="mt-8 text-sm text-primary-glow font-bold hover:underline">
                        Upload Another Document
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                   <h4 className="text-lg font-bold text-text-light mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary-glow" />
                      Protocol Guidelines
                   </h4>
                   <ul className="space-y-4 text-sm text-text-dim">
                      <li className="flex gap-3">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                         Ensure data clarity for AI scanning algorithms.
                      </li>
                      <li className="flex gap-3">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                         Maximum file payload: 10MB per unit.
                      </li>
                      <li className="flex gap-3">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                         Supported schemas: PDF, JPEG, PNG exclusively.
                      </li>
                   </ul>
                </div>

                <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-indigo-500/5 to-transparent">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center">
                         <Files className="w-6 h-6 text-primary-glow" />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-text-light uppercase tracking-tighter leading-none">Security Tier</h4>
                         <p className="text-2xl font-black text-white leading-tight">PREMIUM</p>
                      </div>
                   </div>
                   <p className="text-xs text-text-dim">Your uploads are encrypted with AES-256 standard before verification.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const Files = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
)

export default Dashboard;
