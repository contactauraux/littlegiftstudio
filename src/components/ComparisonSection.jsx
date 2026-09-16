import React from 'react';
import { Check, X, Sparkles, Heart } from 'lucide-react';

export default function ComparisonSection({ onNavigate }) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#c75b45] bg-rosebud-100/80 px-3 py-0.5 rounded-full inline-block mb-1">
            Why Choose Pipe Cleaner Blooms?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Everlasting Flowers vs Real Fresh Flowers
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            A thoughtful, long-lasting alternative that becomes a permanent memory.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Fresh Real Flowers Column */}
          <div className="p-6 rounded-3xl bg-stone-100/80 border border-stone-200/80 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
              <span className="text-2xl">🥀</span>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-800">Fresh Real Flowers</h3>
                <p className="text-[11px] text-stone-500">Traditional short-lived option</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Wilts and turns brown within 3 to 5 days</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Requires constant water changes and smelly vase maintenance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Fragile petals fall off easily during transport</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Limited to standard seasonal flower colors</span>
              </li>
            </ul>
          </div>

          {/* Little Gift Studio Everlasting Blooms Column */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-rosebud-50 via-cream to-butter-50/70 border-2 border-rosebud-300 shadow-soft space-y-4 relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-studio-600 text-white text-[10px] font-bold shadow-xs">
                ✨ Forever Keepsake
              </span>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-rosebud-200/80">
              <span className="text-2xl">🌸</span>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">Little Gift Studio Blooms</h3>
                <p className="text-[11px] text-studio-600 font-semibold">Hand-twisted Chenille Floral Art</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-stone-800 font-medium">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Never wilts:</strong> Stays vibrant and fluffy on desks & shelves for years</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero maintenance:</strong> No watering, no trimming, no mess</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Handcrafted:</strong> Twisted petal-by-petal with high-density plush chenille</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Custom Color Themes:</strong> Pastel lilacs, blush pinks, butter yellow, and custom combos</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('shop', { category: 'bouquets' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-2xl bg-studio-600 hover:bg-studio-700 text-white text-xs font-bold shadow-sm transition-colors"
              >
                Explore Everlasting Bouquets
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
