import React, { useState } from 'react';
import { X, Star, Upload, User, MapPin, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

export default function ReviewFormModal({ review, onClose, onSave }) {
  const isEditing = Boolean(review && review.id);

  const [name, setName] = useState(review?.name || '');
  const [role, setRole] = useState(review?.role || '');
  const [company, setCompany] = useState(review?.company || '');
  const [quote, setQuote] = useState(review?.quote || '');
  const [rating, setRating] = useState(review?.rating || 5);
  const [image, setImage] = useState(review?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  const [date, setDate] = useState(review?.date || 'Recent');
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadToCloudinary(file, 'littlegiftstudio/reviews');
      setImage(res.url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    onSave({
      id: isEditing ? review.id : `rev_${Date.now().toString(36)}`,
      name: name.trim(),
      role: role.trim() || 'Verified Buyer',
      company: company.trim() || 'Handmade Keepsake',
      quote: quote.trim(),
      rating: Number(rating),
      image: image.trim(),
      date: date.trim() || 'Recent'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 my-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {isEditing ? 'Edit Customer Review' : 'Add New Customer Review'}
            </h3>
            <p className="text-xs text-stone-500">
              Manage client testimonials shown on homepage & reviews wall
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Avatar & Photo */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-200 border-2 border-studio-200 shrink-0">
              <img src={image} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="block text-[11px] font-semibold text-stone-700">
                Reviewer Profile Photo
              </label>
              <div className="flex gap-2">
                <label className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-studio-600" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or paste photo URL..."
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Name & City/Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Bangalore"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>
          </div>

          {/* Product Tag & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Product / Item Purchased
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Pastel Tulip Bouquet"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Rating & Date Tag
              </label>
              <div className="flex gap-2">
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-white font-bold text-amber-600 focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 2 days ago"
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* Review Text / Quote */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Customer Testimonial / Feedback *
            </label>
            <textarea
              required
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Write the customer's quote or experience with Little Gift Studio..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white font-semibold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Review' : 'Publish Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
