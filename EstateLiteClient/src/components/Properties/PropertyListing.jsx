import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import { FaBuilding, FaSearch, FaRedo } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/properties`)
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch property listings. Please make sure the server is running.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FaBuilding className="text-primary" />
            Property Gallery
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse active listings retrieved directly from the database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-grow sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
              <FaSearch />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, area..."
              className="input input-bordered input-sm w-full pl-9 bg-white border-slate-200 text-slate-800 rounded-xl"
            />
          </div>

          <button
            onClick={fetchProperties}
            className="btn btn-outline btn-sm border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl"
            title="Refresh listings"
          >
            <FaRedo className={`text-xs ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
          <span className="loading loading-spinner loading-lg text-primary mb-3"></span>
          <p className="text-slate-500 text-sm">Fetching properties from database...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl text-center max-w-lg mx-auto">
          <p className="font-semibold mb-2">Connection Error</p>
          <p className="text-sm mb-4">{error}</p>
          <button onClick={fetchProperties} className="btn btn-error btn-sm text-white rounded-xl">
            Retry Connection
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProperties.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
          <img src="/Logo.jpg" alt="EstateLite" className="h-12 w-auto mx-auto mb-4 opacity-70" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Listings Found</h3>
          <p className="text-slate-500 text-xs mb-6">
            {searchTerm ? `No results match "${searchTerm}".` : 'No properties are currently in the database.'}
          </p>
          <NavLink to="/add-property" className="btn btn-primary btn-sm rounded-xl px-5 text-white">
            Add First Listing
          </NavLink>
        </div>
      )}

      {/* Grid of Property Cards */}
      {!loading && !error && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyListing;
