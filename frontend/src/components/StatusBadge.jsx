import React from 'react';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const StatusBadge = ({ status, className }) => {
  const statusStyles = {
    Approved: 'bg-success/20 text-success border-success/30 icon-CheckCircle',
    Pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 icon-Clock',
    Rejected: 'bg-error/20 text-error border-error/30 icon-XCircle',
  };

  const icons = {
    Approved: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
    Pending: <Clock className="w-3.5 h-3.5 mr-1" />,
    Rejected: <XCircle className="w-3.5 h-3.5 mr-1" />,
  };

  const style = statusStyles[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  const icon = icons[status] || null;

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md',
        style,
        className
      )}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
