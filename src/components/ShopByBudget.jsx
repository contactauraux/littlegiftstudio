import React from 'react';
import { ArrowRight, Tag, Gift, Sparkles, Heart } from 'lucide-react';

const BUDGET_TIERS = [
  {
    id: 'under-249',
    title: 'Under ₹249',
    label: 'Pocket Treats & Charms',
    desc: 'Cute keychains, initial charms & single blossom stems.',
    icon: '🎀',
    color: 'from-amber-50 to-orange-50 border-amber-200 text-amber-900',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'under-499',
    title: 'Under ₹499',
    label: 'Everyday Smiles & Clips',
    desc: 'Hair clip pairs, mini claw sets & desk blossom wraps.',
    icon: '🌸',
    color: 'from-rose-50 to-pink-50 border-rose-200 text-rose-900',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
  },
  {
    id: 'under-799',
    title: 'Under ₹799',
    label: 'Everlasting Bouquets',
    desc: '3 to 5 stem tulip, sunflower & lavender bouquets.',
    icon: '💐',
    color: 'from-purple-50 to-fuchsia-50 border-purple-200 text-purple-900',
    btnBg: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'under-1499',
    title: 'Luxury Hampers',
    label: 'All-In-One Gift Boxes',
    desc: 'Complete hamper with fairy lights, cards & accessories.',
    icon: '🎁',
    color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900',
    btnBg: 'bg-emerald-700 hover:bg-emerald-800',
  },
];

export default function ShopByBudget({ onNavigate }) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butter-100/90 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            Thoughtful Gifting Made Affordable
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Shop by Gifting Budget
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Handcrafted with love for every budget — from small spontaneous tokens to grand celebration hampers.
          </p>
        </div>

        {/* 4 Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUDGET_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => onNavigate && onNavigate('shop')}
              className={`p-5 rounded-3xl bg-gradient-to-b ${tier.color} border shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {tier.icon}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold px-3 py-1 rounded-full bg-white/95 text-stone-900 shadow-xs">
                    {tier.title}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                  {tier.label}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-900/10 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 group-hover:text-[#c75b45] transition-colors">
                  Explore Picks
                </span>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-700 shadow-xs group-hover:bg-[#c75b45] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
