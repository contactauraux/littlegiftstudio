import React, { useState } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check, Palette, Tag } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

const THEMES = [
  { id: 'rose', name: 'Rose & Pink', preview: 'from-rose-50 to-pink-100/60 border-rose-200', btnColor: 'bg-rose-600 hover:bg-rose-700' },
  { id: 'purple', name: 'Purple & Lilac', preview: 'from-purple-50 to-indigo-100/60 border-purple-200', btnColor: 'bg-purple-600 hover:bg-purple-700' },
  { id: 'amber', name: 'Warm Amber & Gold', preview: 'from-amber-50 to-yellow-100/60 border-amber-200', btnColor: 'bg-amber-600 hover:bg-amber-700' },
  { id: 'emerald', name: 'Emerald & Sage', preview: 'from-emerald-50 to-teal-100/60 border-emerald-200', btnColor: 'bg-emerald-600 hover:bg-emerald-700' },
];

export default function CategoryTileModal({ tile, onClose, onSave }) {
  const [title, setTitle] = useState(tile?.title || '');
  const [subtitle, setSubtitle] = useState(tile?.subtitle || '');
  const [tag, setTag] = useState(tile?.tag || 'Popular');
  const [targetCategory, setTargetCategory] = useState(tile?.id || 'bouquets');
  const [image, setImage] = useState(
    tile?.image || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80'
  );
  const [colorTheme, setColorTheme] = useState('rose');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadToCloudinary(file, 'littlegiftstudio/categories');
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

    const selectedThemeObj = THEMES.find(t => t.id === colorTheme) || THEMES[0];

    onSave({
      ...tile,
      title: title.trim(),
      subtitle: subtitle.trim(),
      tag: tag.trim(),
      image: image.trim(),
      color: selectedThemeObj.preview,
      btnColor: selectedThemeObj.btnColor,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 my-6 max-h-[92vh] overflow-y-auto">
        
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
              Edit Category Tile
            </h3>
            <p className="text-xs text-stone-500">
              Customize the "Shop by Category" card title, image, and badge
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Card Preview */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Live Tile Preview
            </span>
            <div className="p-4 rounded-2xl border bg-white flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {tag || 'Tag'}
                </span>
                <h4 className="font-serif font-bold text-stone-900 text-base">{title || 'Category Title'}</h4>
                <p className="text-xs text-stone-500">{subtitle || 'Category subtitle details'}</p>
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border shadow-xs">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="p-4 rounded-2xl bg-studio-50/60 border border-studio-100 space-y-2.5">
            <label className="font-semibold text-stone-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-studio-600" />
              <span>Tile Image</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-gradient-to-r from-rose-500 to-studio-600 hover:opacity-95 text-white font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
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

          {/* Title & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tile Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Everlasting Bouquets"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Popular, All-In-One, Everyday Cute"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50 font-semibold"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Subtitle / Items Listed
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Tulips, Sunflowers, Daisies & Roses"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
            />
          </div>

          {/* Theme Color */}
          <div>
            <label className="block font-semibold text-stone-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-studio-600" />
              <span>Card Background Theme</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setColorTheme(t.id)}
                  className={`p-2.5 rounded-xl border text-center font-semibold text-xs transition-all ${
                    colorTheme === t.id
                      ? 'border-studio-600 bg-studio-50 ring-2 ring-studio-300 text-stone-900 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  {t.name}
                </button>
              ))}
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
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-studio-600 hover:opacity-95 text-white font-semibold shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Category Tile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}