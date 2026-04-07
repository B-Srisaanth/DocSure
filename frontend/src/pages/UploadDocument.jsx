import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api.service';
import Navbar from '../components/Navbar';
import { Upload, X, FileText, CheckCircle2, ChevronLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UploadDocument = () => {
  const [formData, setFormData] = useState({ title: '', type: 'Aadhaar Card' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) return toast.error('File too large (>10MB)');
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) handleFile({ target: { files: [selectedFile] } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file');
    
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('type', formData.type);
    data.append('file', file);

    try {
      await api.post('/documents/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Document uploaded successfully!');
      navigate('/user/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 bg-fixed pt-24 pb-12 px-6 overflow-x-hidden">
      <Navbar />

      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-white/40 hover:text-white transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 lg:p-12"
        >
          <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary-400" />
              </div>
              <div>
                  <h1 className="text-3xl font-extrabold text-white mb-1">Verify New Document</h1>
                  <p className="text-white/40">Secure end-to-end encrypted upload process</p>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1 uppercase tracking-wider">Document Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="glass-input w-full px-5 py-3.5 rounded-2xl text-white placeholder-white/10"
                  placeholder="Ex. My Graduation Certificate"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/70 ml-1 uppercase tracking-wider">Verification Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="glass-input w-full px-5 py-3.5 rounded-2xl text-white bg-[#1e293b]"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Graduation Certificate">Graduation Certificate</option>
                  <option value="Financial Statement">Financial Statement</option>
                  <option value="Work Experience">Work Experience</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1 uppercase tracking-wider">File Attachment</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className={`
                  relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden
                  ${dragActive ? 'border-primary-400 bg-primary-500/10 scale-102' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFile}
                  className="hidden"
                  accept="image/*,.pdf"
                />

                <AnimatePresence mode="wait">
                  {!file ? (
                    <motion.div
                      key="upload-prompt"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-10 h-10 text-primary-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Select file to verify</h3>
                      <p className="text-white/30 text-sm max-w-xs">
                        Drag and drop your file here, or click to browse. Supports PDF, JPG, or PNG (Max 10MB).
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                        key="file-preview"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="w-full flex flex-col items-center"
                    >
                        <div className="relative w-32 h-32 mb-6 group/preview">
                             {file.type.startsWith('image/') ? (
                                <img src={preview} className="w-full h-full object-cover rounded-2xl border-4 border-primary-500/20" />
                             ) : (
                                <div className="w-full h-full bg-primary-500/10 rounded-2xl flex items-center justify-center border-4 border-primary-500/20">
                                   <FileText className="w-12 h-12 text-primary-400" />
                                </div>
                             )}
                             <button
                               onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                               className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover/preview:scale-110 transition-transform active:scale-95"
                             >
                               <X className="w-4 h-4" />
                             </button>
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold border border-emerald-500/20 mb-2">
                           <CheckCircle2 className="w-4 h-4" />
                           {file.name}
                        </div>
                        <span className="text-white/30 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Visual pulse for drag effect */}
                {dragActive && (
                  <div className="absolute inset-0 pointer-events-none border-4 border-primary-400 animate-pulse-slow rounded-3xl" />
                )}
              </div>
            </div>

            <div className="bg-primary-500/5 border border-primary-500/10 p-5 rounded-2xl flex gap-4">
               <AlertCircle className="w-6 h-6 text-primary-400 shrink-0" />
               <p className="text-sm text-white/50 leading-relaxed italic">
                 Providing accurate document titles and types will speed up the verification process by our administrators. Please ensure the file is clearly legible.
               </p>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`btn-primary w-full py-5 text-xl flex items-center justify-center gap-4 transition-all ${loading ? 'opacity-70 disabled:cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
                  <span>Securely Uploading...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-6 h-6" />
                  Submit for Verification
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadDocument;
