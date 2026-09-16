import React, { useState } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check, Palette, Tag } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

const THEMES = [
  { id: 'rose', name: 'Rose & Pink', preview: 'from-rose-100 to-rose-200 text-rose-700' },
  { id: 'purple', name: 'Lilac & Purple', preview: 'from-purple-100 to-purple-200 text-purple-700' },
  { id: 'amber', name: 'Warm Amber & Gold', preview: 'from-amber-100 to-amber-200 text-amber-700' },
  { id: 'emerald', name: 'Emerald & Sage Green', preview: 'from-emerald-100 to-emerald-200 text-emerald-700' },
  { id: 'sky', name: 'Sky & Soft Blue', preview: 'from-sky-100 to-sky-200 text-sky-700' }
];

const BADGE_PRESETS = [
  '🌸 Bestseller',
  '🎁 All-In-One Gift',
  '✨ Trending New',
  '🌻 Fan Favorite',
  '💐 Handcrafted With Love',
  '🎀 Limited Offer'
];

export default function BannerFormModal({ banner, onClose, onSave }) {
  const isEditing = Boolean(banner && banner.id);

  const [title, setTitle] = useState(banner?.title || '');
  const [highlight, setHighlight] = useState(banner?.highlight || 'From ₹249*');
  const [subtitle, setSubtitle] = useState(banner?.subtitle || 'Everlasting blooms that never wilt');
  const [badge, setBadge] = useState(banner?.badge || '🌸 Bestseller');
  const [theme, setTheme] = useState(banner?.theme || 'rose');
  const [image, setImage] = useState(
    banner?.image || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80'
  );
  const [cta, setCta] = useState(banner?.cta || 'Shop Bouquets');
  const [link, setLink] = useState(banner?.link || '#shop');

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadToCloudinary(file, 'littlegiftstudio/banners');
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
    if (!title.trim()) return;

    onSave({
      id: isEditing ? banner.id : `banner_${Date.now().toString(36)}`,
      title: title.trim(),
      highlight: highlight.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim(),
      theme,
      image: image.trim(),
      cta: cta.trim() || 'Explore Now',
      link: link.trim() || '#shop'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-studio-100 text-studio-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {isEditing ? 'Edit Hero Banner Card' : 'Add New Carousel Banner'}
            </h3>
            <p className="text-xs text-stone-500">
              This card appears in the horizontal sliding carousel right below the navbar
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          
          {/* Live Card Preview Box */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Live Banner Preview
            </span>
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
              theme === 'purple' ? 'bg-purple-50 border-purple-200' :
              theme === 'amber' ? 'bg-amber-50 border-amber-200' :
              theme === 'emerald' ? 'bg-emerald-50 border-emerald-200' :
              theme === 'sky' ? 'bg-sky-50 border-sky-200' :
              'bg-rose-50 border-rose-200'
            }`}>
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/80 font-bold text-[10px] text-stone-800 shadow-2xs">
                  {badge || '🌸 Bestseller'}
                </span>
                <h4 className="font-serif font-bold text-stone-900 text-base">{title || 'Banner Title'}</h4>
                <p className="text-xs font-semibold text-studio-600">{highlight || 'From ₹249*'}</p>
                <p className="text-[11px] text-stone-500">{subtitle || 'Banner subtitle description'}</p>
              </div>
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-black/10 shadow-sm">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Banner Photo Upload */}
          <div className="p-4 rounded-2xl bg-studio-50/60 border border-studio-100 space-y-3">
            <label className="font-semibold text-stone-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-studio-600" />
              <span>Banner Visual Photo (Cloudinary Upload)</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-studio-600 hover:bg-studio-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading to Cloudinary...' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Or paste direct image URL..."
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
              />
            </div>
          </div>

          {/* Title & Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Banner Headline Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pastel Dream Tulips"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Price Highlight Tag
              </label>
              <input
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="e.g. From ₹249*"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50 font-semibold text-studio-600"
              />
            </div>
          </div>

          {/* Subtitle & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Subtitle Teaser
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Everlasting blooms that never wilt"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Badge Label
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. 🌸 Bestseller"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
                />
              </div>
            </div>
          </div>

          {/* Theme Color Selector */}
          <div>
            <label className="block font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-studio-600" />
              <span>Card Gradient Theme</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={`p-2.5 rounded-xl border text-left font-semibold text-xs flex items-center justify-between transition-all ${
                    theme === t.id
                      ? 'border-studio-600 bg-studio-50/80 ring-2 ring-studio-300 text-stone-900 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-tr ${t.preview}`} />
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button Text & Target Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Button Text (CTA)
              </label>
              <input
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g. Shop Bouquets"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Target Page / Section
              </label>
              <select
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 font-medium"
              >
                <option value="#shop">Shop Page (#shop)</option>
                <option value="#custom">Custom Bouquet Builder (#custom)</option>
                <option value="#collection">Collection Grid (#collection)</option>
                <option value="#contact">Contact & Instagram DM (#contact)</option>
                <option value="#reviews">Reviews Wall (#reviews)</option>
              </select>
            </div>
          </div>

          {/* Modal Footer Buttons */}
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
              disabled={isUploading}
              className="px-6 py-2 rounded-xl bg-studio-600 hover:bg-studio-700 text-white font-semibold shadow-md transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Banner' : 'Publish Banner'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
