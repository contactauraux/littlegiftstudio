import React, { useState } from 'react';
import { X, Check, Sparkles, Tag, DollarSign } from 'lucide-react';

const THEMES = [
  { id: 'amber', name: 'Amber & Gold', color: 'from-amber-50 to-orange-50 border-amber-200 text-amber-900', btnBg: 'bg-amber-600 hover:bg-amber-700' },
  { id: 'rose', name: 'Rose & Pink', color: 'from-rose-50 to-pink-50 border-rose-200 text-rose-900', btnBg: 'bg-rose-600 hover:bg-rose-700' },
  { id: 'purple', name: 'Lilac & Purple', color: 'from-purple-50 to-fuchsia-50 border-purple-200 text-purple-900', btnBg: 'bg-purple-600 hover:bg-purple-700' },
  { id: 'emerald', name: 'Emerald & Teal', color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900', btnBg: 'bg-emerald-700 hover:bg-emerald-800' },
];

const EMOJI_OPTIONS = ['🎀', '🌸', '💐', '🎁', '✨', '🧸', '🌷', '🌻', '🌼', '💎', '💌', '🍬'];

export default function BudgetTierModal({ tier, onClose, onSave }) {
  const [title, setTitle] = useState(tier?.title || 'Under ₹249');
  const [maxPrice, setMaxPrice] = useState(tier?.maxPrice || 249);
  const [minPrice, setMinPrice] = useState(tier?.minPrice || 0);
  const [label, setLabel] = useState(tier?.label || 'Pocket Treats & Charms');
  const [desc, setDesc] = useState(tier?.desc || 'Cute keychains, initial charms & single blossom stems.');
  const [icon, setIcon] = useState(tier?.icon || '🎀');
  const [selectedTheme, setSelectedTheme] = useState('amber');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const themeObj = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

    onSave({
      ...tier,
      title: title.trim(),
      maxPrice: Number(maxPrice),
      minPrice: Number(minPrice),
      label: label.trim(),
      desc: desc.trim(),
      icon,
      color: themeObj.color,
      btnBg: themeObj.btnBg,
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
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Edit Budget Tier & Price Deciding
            </h3>
            <p className="text-xs text-stone-500">
              Configure maximum price cap, card title, and descriptions
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Card Preview */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Live Budget Card Preview
            </span>
            <div className="p-4 rounded-2xl border bg-white flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-900">
                    {title || 'Under ₹249'}
                  </span>
                  <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                    Max: ₹{maxPrice}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">{label || 'Tier Label'}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{desc || 'Description text'}</p>
              </div>
            </div>
          </div>

          {/* Title & Maximum Price (Price Deciding) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Tier Display Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Under ₹249, Under ₹299, Luxury Hampers"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Max Price Filter (₹) *
              </label>
              <input
                type="number"
                required
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 249, 499, 799, 99999"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 font-bold text-amber-900"
              />
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Products up to this price will be filtered
              </span>
            </div>
          </div>

          {/* Subtitle / Label */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Tier Subtitle / Collection Name
            </label>
            <input
              type="text"
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Pocket Treats & Charms, Everyday Smiles & Clips"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50 font-semibold"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Description / Included Items
            </label>
            <input
              type="text"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Cute keychains, initial charms & single blossom stems."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50/50"
            />
          </div>

          {/* Icon Emoji Picker */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">
              Icon Emoji
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(em => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setIcon(em)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    icon === em
                      ? 'bg-amber-100 ring-2 ring-amber-400 scale-110 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {em}
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
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white font-semibold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Budget Tier</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}