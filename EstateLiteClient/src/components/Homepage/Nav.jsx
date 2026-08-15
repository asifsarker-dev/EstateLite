import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider';

function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold bg-white/10' : 'text-white hover:text-primary'
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold bg-white/10' : 'text-white hover:text-primary'
          }
        >
          Browse Properties
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/add-property"
            className={({ isActive }) =>
              isActive ? 'text-primary font-bold bg-white/10' : 'text-white hover:text-primary'
            }
          >
            Add Property
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white mr-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-2xl bg-slate-900 border border-white/10 rounded-box w-52 z-50 text-white"
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-wide">
          <img src="/favicon.jpg" alt="EstateLite Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EstateLite</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm hidden md:inline-block">
              {user.email?.split('@')[0]}
            </span>
            <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm px-5">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Nav;
