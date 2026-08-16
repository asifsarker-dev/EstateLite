import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaBed, FaMapMarkerAlt } from 'react-icons/fa';

function PropertyCard({ property }) {
  const { title, price, location, description, bedrooms, createdAt, imageUrl } = property;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="h-44 relative border-b border-slate-100 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50/50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Property image for ${title}`}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <img src="/favicon.jpg" alt="Property placeholder" className="w-12 h-12 object-contain opacity-85" />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
          <FaBed className="text-primary text-xs" />
          <span>{bedrooms || 0} Beds</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            ৳ {price?.toLocaleString()}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-800 line-clamp-1 mb-1.5 hover:text-primary transition-colors">
          {title}
        </h2>

        <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3 font-medium">
          <FaMapMarkerAlt className="text-primary text-xs flex-shrink-0" />
          <span className="truncate">{location}</span>
        </p>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            {createdAt ? formatDistanceToNow(new Date(createdAt)) + ' ago' : 'Recently added'}
          </span>
          <span className="text-primary font-semibold text-xs">Verified MVP</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
