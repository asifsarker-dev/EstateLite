import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer footer-center p-8 bg-slate-950/80 border-t border-white/10 text-white mt-auto">
      <div className="flex items-center gap-2 text-xl font-bold">
        <img src="/favicon.jpg" alt="EstateLite Logo" className="w-7 h-7 rounded-md object-cover" />
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EstateLite</span>
      </div>
      <div className="flex gap-6 text-slate-400 text-sm">
        <NavLink to="/" className="hover:text-white transition-colors">Dashboard</NavLink>
        <NavLink to="/properties" className="hover:text-white transition-colors">Properties</NavLink>
        <NavLink to="/add-property" className="hover:text-white transition-colors">Add Property</NavLink>
      </div>
      <p className="text-slate-500 text-xs">
        EstateLite © 2026 — Real Estate Listing Platform MVP • Prototype Model
      </p>
    </footer>
  );
}

export default Footer;
