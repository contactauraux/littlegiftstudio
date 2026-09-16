import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag, Gift, Sparkles, Heart } from 'lucide-react';
import { getStoredBudgetTiers } from '../lib/curationStore';

export default function ShopByBudget({ onNavigate }) {
  const [budgetTiers, setBudgetTiers] = useState(getStoredBudgetTiers());

  useEffect(() => {
    const handleUpdate = () => {
      setBudgetTiers(getStoredBudgetTiers());
    };
    window.addEventListener('lgs_budget_tiers_updated', handleUpdate);
    return () => window.removeEventListener('lgs_budget_tiers_updated', handleUpdate);
  }, []);
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
          {budgetTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => onNavigate && onNavigate('shop', { budget: tier.id })}
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
