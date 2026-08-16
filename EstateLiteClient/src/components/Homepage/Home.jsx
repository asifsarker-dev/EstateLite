import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider';
import axios from 'axios';
import { motion, useReducedMotion } from 'framer-motion';
import { FaHome, FaPlusCircle, FaUserLock, FaBuilding, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

function Home() {
  const { user } = useContext(AuthContext);
  const [propertyCount, setPropertyCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/properties`)
      .then((res) => {
        setPropertyCount(res.data.length);
        setLoadingStats(false);
      })
      .catch(() => {
        setLoadingStats(false);
      });
  }, []);

  // Entrance animation — disabled entirely when prefers-reduced-motion is set
  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      };

  const fadeUpDelayed = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
        };

  // Subtle continuous float for the hero illustration
  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        animate: {
          y: [0, -8, 0],
        },
        transition: {
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        },
      };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden mb-10">
        <div className="flex flex-col lg:flex-row items-center gap-0">

          {/* Left — text content */}
          <div className="flex-1 p-8 sm:p-12 text-center lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              {...fadeUpDelayed(0)}
            >
              <FaCheckCircle className="text-primary text-xs" />
              <span>Real Estate Listing Platform • MVP Prototype</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto lg:mx-0 mb-4"
              {...fadeUpDelayed(0.08)}
            >
              Discover &amp; List Quality Real Estate with{' '}
              <span className="text-primary">EstateLite</span>
            </motion.h1>

            <motion.p
              className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed"
              {...fadeUpDelayed(0.16)}
            >
              A streamlined platform for browsing verified properties, submitting listings,
              and navigating real estate data with ease.
            </motion.p>

            {user && (
              <motion.div
                className="mb-6 inline-block bg-slate-50 border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-xl"
                {...fadeUpDelayed(0.22)}
              >
                Welcome back,{' '}
                <span className="font-semibold text-primary">{user.email}</span>!
              </motion.div>
            )}

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3"
              {...fadeUpDelayed(0.24)}
            >
              <NavLink
                to="/properties"
                className="btn btn-primary px-7 rounded-xl font-semibold text-white shadow-xs"
              >
                <FaBuilding className="mr-1 text-sm" />
                Browse Properties
              </NavLink>

              {user ? (
                <NavLink
                  to="/add-property"
                  className="btn btn-outline border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 px-6 rounded-xl font-semibold"
                >
                  <FaPlusCircle className="mr-1 text-sm text-primary" />
                  Add a Property
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="btn btn-outline border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 px-6 rounded-xl font-semibold"
                >
                  <FaUserLock className="mr-1 text-sm text-slate-500" />
                  Login to Submit
                </NavLink>
              )}
            </motion.div>
          </div>

          {/* Right — hero illustration */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50/60 to-slate-100/40 p-8 sm:p-10 lg:min-h-[360px] w-full lg:w-auto">
            <motion.img
              src="/hero-illustration.jpg"
              alt="Isometric illustration of a modern residential apartment building with trees and greenery"
              className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-sm"
              {...fadeUp}
              // continuous subtle float on top of the entrance animation
              {...(prefersReducedMotion
                ? {}
                : {
                    animate: { opacity: 1, y: [0, -8, 0] },
                    initial: { opacity: 0, y: 28 },
                    transition: {
                      opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      y: {
                        duration: 5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                        delay: 0.55, // start floating after entrance completes
                      },
                    },
                  })}
            />
          </div>

        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-xl flex-shrink-0">
            <FaBuilding />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {loadingStats ? <span className="loading loading-spinner loading-xs"></span> : propertyCount}
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Active Listings
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl flex-shrink-0">
            <FaMapMarkerAlt />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Dhaka &amp; Beyond</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Prime Locations
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
            <FaCheckCircle />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Prototype Model</div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Varsity MVP Framework
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NavLink
          to="/properties"
          className="group bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
            <FaHome />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
            Property Gallery
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Browse all real estate listings retrieved directly from the MongoDB database,
            showing price, location, bedrooms, and details.
          </p>
          <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:underline">
            View listings →
          </span>
        </NavLink>

        <NavLink
          to="/add-property"
          className="group bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
            <FaPlusCircle />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
            Submit New Listing
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Authenticated module providing an intuitive form to publish new real estate
            properties directly into the database.
          </p>
          <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:underline">
            Submit property →
          </span>
        </NavLink>

        <NavLink
          to="/login"
          className="group bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
            <FaUserLock />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
            User Authentication
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {user
              ? `Currently signed in as ${user.email}. Manage your active session and listings.`
              : 'Secure login interface for users to gain authorized access to publish listings.'}
          </p>
          <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 group-hover:underline">
            {user ? 'Account status →' : 'Access login →'}
          </span>
        </NavLink>
      </section>
    </div>
  );
}

export default Home;
