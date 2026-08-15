import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <NavLink to="/" className="mb-6">
        <img src="/Logo.jpg" alt="EstateLite Logo" className="h-14 w-auto mx-auto object-contain" />
      </NavLink>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md shadow-xs">
        <h1 className="text-6xl font-black text-primary mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">
          The property module or URL you are trying to visit does not exist.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary w-full rounded-xl text-white">
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
