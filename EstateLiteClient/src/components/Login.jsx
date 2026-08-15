import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider';

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
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="card bg-slate-900/90 border border-white/10 shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">EstateLite Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text text-slate-300">Email</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@estatelite.com"
              className="input input-bordered bg-white/5 border-white/20 text-white"
              required
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text text-slate-300">Password</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input input-bordered bg-white/5 border-white/20 text-white"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
