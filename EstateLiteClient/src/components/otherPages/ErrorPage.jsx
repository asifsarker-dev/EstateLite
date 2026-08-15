import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-6 bg-slate-950 px-4">
      <h1 className="text-8xl font-black text-primary">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-slate-400 text-center max-w-md">
        The real estate page or property module you are looking for does not exist or has been moved.
      </p>
      <button onClick={() => navigate('/')} className="btn btn-primary px-8">
        Return to Dashboard
      </button>
    </div>
  );
}

export default ErrorPage;
