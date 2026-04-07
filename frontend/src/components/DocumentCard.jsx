import React from 'react';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { motion } from 'framer-motion';

const DocumentCard = ({ doc, onApprove, onReject, isAdmin = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 0 25px rgba(34, 211, 238, 0.2)' }}
      className="glass-card rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <StatusBadge status={doc.status} />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-text-light truncate" title={doc.name}>
          {doc.name}
        </h3>
        <p className="text-xs text-text-dim">
          Added on {new Date(doc.createdAt).toLocaleDateString()}
        </p>
      </div>

      {doc.remark && (
        <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-xs text-text-dim italic">
          "{doc.remark}"
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
        {!isAdmin ? (
          <>
            <button className="flex-1 glass group hover:bg-white/10 p-2 rounded-lg flex items-center justify-center gap-2 text-xs transition-all duration-300">
              <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Download
            </button>
            <button className="flex-1 glass group hover:bg-error/10 hover:text-error p-2 rounded-lg flex items-center justify-center gap-2 text-xs transition-all duration-300">
              <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onApprove(doc)}
              className="flex-1 bg-success/20 hover:bg-success text-success hover:text-white p-2 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(doc)}
              className="flex-1 bg-error/20 hover:bg-error text-error hover:text-white p-2 rounded-lg flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300"
            >
              Reject
            </button>
          </>
        )}
      </div>
      
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent -mr-8 -mt-8 rounded-full blur-2xl" />
    </motion.div>
  );
};

export default DocumentCard;
