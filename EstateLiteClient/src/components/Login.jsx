import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider';
import { FaLock, FaEnvelope } from 'react-icons/fa';

function Login() {
  const { login, notifySuccess, notifyFailed } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return notifyFailed('Please enter both email and password');
    }
    setLoading(true);
    try {
      await login(email, password);
      notifySuccess('Login successful!');
      navigate(location.state?.path || '/');
    } catch {
      notifyFailed('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-md p-8">
        <div className="text-center mb-8">
          <NavLink to="/" className="inline-block mb-3">
            <img src="/Logo.jpg" alt="EstateLite Logo" className="h-12 w-auto mx-auto object-contain" />
          </NavLink>
          <h2 className="text-xl font-bold text-slate-900">Sign in to EstateLite</h2>
          <p className="text-slate-500 text-xs mt-1">Authorized access to submit real estate listings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Email Address
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
                <FaEnvelope />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@estatelite.com"
                className="input input-bordered w-full pl-9 bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
                <FaLock />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full pl-9 bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-6 rounded-xl font-semibold text-white shadow-xs"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <p className="font-medium text-slate-600 mb-1">Prototype Demo Account</p>
          <code className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md inline-block">
            demo@estatelite.com • Demo@1234
          </code>
        </div>
      </div>
    </div>
  );
}

export default Login;
