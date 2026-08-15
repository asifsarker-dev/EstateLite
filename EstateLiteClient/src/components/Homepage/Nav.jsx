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
            isActive
              ? 'text-primary font-semibold bg-blue-50 rounded-lg px-3.5 py-2'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg px-3.5 py-2 transition-colors'
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold bg-blue-50 rounded-lg px-3.5 py-2'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg px-3.5 py-2 transition-colors'
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
              isActive
                ? 'text-primary font-semibold bg-blue-50 rounded-lg px-3.5 py-2'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg px-3.5 py-2 transition-colors'
            }
          >
            Add Property
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="navbar bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 px-4 md:px-8 shadow-xs">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-slate-700 mr-2 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white border border-slate-200 rounded-xl w-56 z-50 text-slate-700"
          >
            {navLinks}
          </ul>
        </div>
        
        {/* Real EstateLite Logo - seamlessly integrated */}
        <NavLink to="/" className="flex items-center group py-1">
          <img
            src="/Logo.jpg"
            alt="EstateLite Logo"
            className="h-10 md:h-12 w-auto object-contain rounded-md transition-transform group-hover:scale-102"
          />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1 text-sm font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-sm hidden md:inline-block font-medium">
              {user.email?.split('@')[0]}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm rounded-lg font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-primary btn-sm rounded-lg px-5 font-semibold text-white shadow-xs"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Nav;
