import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider';
import axios from 'axios';
import { FaPlusCircle, FaBuilding, FaMapMarkerAlt, FaBed, FaAlignLeft, FaMoneyBillWave } from 'react-icons/fa';

function PropertySubmit() {
  const { user, notifySuccess, notifyFailed } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    description: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location || !form.description) {
      return notifyFailed('Please fill in all required fields (Title, Price, Location, Description)');
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/properties`, {
        ...form,
        addedBy: user?.email || 'anonymous',
      });
      notifySuccess('Property listing published successfully!');
      setForm({ title: '', price: '', location: '', bedrooms: '', description: '' });
      navigate('/properties');
    } catch {
      notifyFailed('Failed to submit property. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center text-xl flex-shrink-0">
            <FaPlusCircle />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Submit New Property</h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Enter real estate details to save directly into the MongoDB collection
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaBuilding className="text-primary text-xs" /> Property Title *
              </span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Modern 3-Bedroom Apartment in Gulshan-2"
              className="input input-bordered w-full bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FaMoneyBillWave className="text-primary text-xs" /> Price (in BDT ৳) *
                </span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 15000000"
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FaBed className="text-primary text-xs" /> Bedrooms
                </span>
              </label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="e.g. 3"
                min="0"
                max="20"
                className="input input-bordered w-full bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-primary text-xs" /> Location / Area *
              </span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Road 45, Gulshan-2, Dhaka"
              className="input input-bordered w-full bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
              required
            />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaAlignLeft className="text-primary text-xs" /> Detailed Description *
              </span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide key features, floor level, fittings, balcony, security, etc."
              className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 focus:bg-white focus:border-primary text-slate-800 text-sm rounded-xl"
              required
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto px-8 rounded-xl font-semibold text-white shadow-xs"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Publish Listing'}
            </button>
            <NavLink to="/properties" className="btn btn-ghost w-full sm:w-auto text-slate-600 rounded-xl">
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertySubmit;
