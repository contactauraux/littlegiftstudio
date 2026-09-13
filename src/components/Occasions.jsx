import React from 'react';
import { OCCASIONS } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Occasions({ onSelectOccasion }) {
  return (
    <section id="occasions" className="py-16 bg-cream border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-studio-100 text-studio-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated For Every Milestone
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Find the Perfect Gift by Occasion
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Whether celebrating an anniversary, a friend's big milestone, or treating yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion(occ.title)}
              className={`p-6 rounded-3xl bg-gradient-to-br ${occ.color} border border-stone-200/70 hover:shadow-soft transition-all duration-300 cursor-pointer group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{occ.emoji}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 text-stone-700 shadow-sm">
                    {occ.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  {occ.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {occ.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-900/10 flex items-center justify-between text-xs font-bold text-stone-800 group-hover:text-studio-700">
                <span>Browse Hampers</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
