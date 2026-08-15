import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Welcome to EstateLite
      </h1>
      <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
        Your modern Real Estate Listing Platform control center. Explore properties, manage listings, and navigate easily.
      </p>
      <div className="flex justify-center gap-4">
        <NavLink to="/properties" className="btn btn-primary">
          Browse Properties
        </NavLink>
        <NavLink to="/add-property" className="btn btn-outline btn-accent">
          Add Listing
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
