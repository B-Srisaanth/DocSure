import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-end">
        <Loader size="lg" className="mb-6" />
        <p className="text-text-dim text-sm tracking-widest uppercase font-black animate-pulse bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
          ESTABLISHING SECURE CONNECTION...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
