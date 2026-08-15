import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-white border-t border-slate-200 text-slate-600 mt-auto">
      <div className="flex flex-col items-center gap-3">
        <NavLink to="/">
          <img
            src="/Logo.jpg"
            alt="EstateLite Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </NavLink>
        <p className="text-slate-500 text-sm max-w-sm">
          Next-generation real estate listing platform MVP. Simple, clean, and intuitive property browsing.
        </p>
      </div>

      <div className="flex gap-6 text-slate-600 text-sm font-medium">
        <NavLink to="/" className="hover:text-primary transition-colors">
          Dashboard
        </NavLink>
        <NavLink to="/properties" className="hover:text-primary transition-colors">
          Properties
        </NavLink>
        <NavLink to="/add-property" className="hover:text-primary transition-colors">
          Add Property
        </NavLink>
      </div>

      <div className="border-t border-slate-100 w-full pt-4 text-xs text-slate-400">
        EstateLite © 2026 • Real Estate Listing Platform • Prototype Process Model
      </div>
    </footer>
  );
}

export default Footer;
