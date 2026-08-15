import React, { useContext } from 'react';
import { AuthContext } from './Provider';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ path: location.pathname }} to="/login" replace />;
}

export default PrivateRoute;
