import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Homepage/Nav';
import Footer from './Homepage/Footer';

function Root() {
  return (
    <div
      className="min-h-screen flex flex-col font-inter bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-700"
      data-theme="estatelite"
    >
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Root;
