import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Homepage/Nav';
import Footer from './Homepage/Footer';

function Root() {
  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
