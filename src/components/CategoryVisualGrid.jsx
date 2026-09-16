import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getStoredCategoryTiles } from '../lib/curationStore';

export default function CategoryVisualGrid({ onNavigate }) {
  const [tiles, setTiles] = useState(getStoredCategoryTiles());

  useEffect(() => {
    const handleUpdate = () => {
      setTiles(getStoredCategoryTiles());
    };
    window.addEventListener('lgs_category_tiles_updated', handleUpdate);
    return () => window.removeEventListener('lgs_category_tiles_updated', handleUpdate);
  }, []);
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#c75b45] bg-rosebud-100/80 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Explore Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('shop', { category: 'all' })}
            className="text-xs sm:text-sm font-bold text-[#c75b45] hover:text-[#a64733] flex items-center gap-1 group transition-colors"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Category Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate && onNavigate('shop', { category: cat.id })}
              className={`p-4 rounded-3xl bg-gradient-to-b ${cat.color} border shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-stone-700 shadow-xs">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#c75b45] transition-colors leading-snug">
                  {cat.title}
                </h3>
                <p className="text-stone-600 text-xs mt-0.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>

              {/* Product preview image */}
              <div className="mt-4 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-white">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-bold shadow-md flex items-center gap-1">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
