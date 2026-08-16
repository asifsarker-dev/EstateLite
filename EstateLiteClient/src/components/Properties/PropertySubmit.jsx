import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider';
import axios from 'axios';
import { FaPlusCircle, FaBuilding, FaMapMarkerAlt, FaBed, FaAlignLeft, FaMoneyBillWave, FaImage, FaTimes } from 'react-icons/fa';

function PropertySubmit() {
  const { user, notifySuccess, notifyFailed } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    description: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      return notifyFailed('Image must be under 5 MB');
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );
    return response.data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location || !form.description) {
      return notifyFailed('Please fill in all required fields (Title, Price, Location, Description)');
    }

    setLoading(true);
    let imageUrl = '';

    // Step 1 — upload image if one was selected
    if (imageFile) {
      setImageUploading(true);
      try {
        imageUrl = await uploadToImgBB(imageFile);
      } catch {
        notifyFailed('Image upload failed. Submitting property without image.');
        imageUrl = '';
      } finally {
        setImageUploading(false);
      }
    }

    // Step 2 — submit property with or without imageUrl
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}/api/properties`,
        {
          ...form,
          addedBy: user?.email || 'anonymous',
          ...(imageUrl && { imageUrl }),
        }
      );
      notifySuccess('Property listing published successfully!');
      setForm({ title: '', price: '', location: '', bedrooms: '', description: '' });
      clearImage();
      navigate('/properties');
    } catch {
      notifyFailed('Failed to submit property. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = () => {
    if (imageUploading) return <><span className="loading loading-spinner loading-sm"></span><span className="ml-2">Uploading image…</span></>;
    if (loading) return <><span className="loading loading-spinner loading-sm"></span><span className="ml-2">Publishing…</span></>;
    return 'Publish Listing';
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
          {/* Property Title */}
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

          {/* Price + Bedrooms */}
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

          {/* Location */}
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

          {/* Description */}
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

          {/* Property Image — optional */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaImage className="text-primary text-xs" /> Property Image
                <span className="text-slate-400 font-normal normal-case tracking-normal ml-1">(optional)</span>
              </span>
            </label>

            {/* Preview */}
            {imagePreview && (
              <div className="relative mb-3 w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img
                  src={imagePreview}
                  alt="Selected property preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-1.5 text-slate-600 hover:text-red-500 transition-colors shadow-xs"
                  title="Remove image"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            )}

            <input
              type="file"
              id="propertyImage"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="file-input file-input-bordered w-full bg-slate-50 border-slate-200 text-slate-700 text-sm rounded-xl focus:border-primary disabled:opacity-50"
            />
            <label className="label py-1">
              <span className="label-text-alt text-slate-400">
                JPG, PNG, WebP — max 5 MB. Image is uploaded to ImgBB and stored as a URL.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto px-8 rounded-xl font-semibold text-white shadow-xs"
              disabled={loading}
            >
              {buttonLabel()}
            </button>
            <NavLink
              to="/properties"
              className="btn btn-ghost w-full sm:w-auto text-slate-600 rounded-xl"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertySubmit;
