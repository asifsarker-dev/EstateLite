import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PropertyListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/properties`)
      .then(res => { setProperties(res.data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Gallery</h1>
      <p className="text-slate-400">Total available listings: {properties.length}</p>
    </div>
  );
}

export default PropertyListing;
