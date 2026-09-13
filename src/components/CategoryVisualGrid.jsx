import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_TILES = [
  {
    id: 'bouquets',
    title: 'Everlasting Bouquets',
    subtitle: 'Tulips, Sunflowers, Daisies & Roses',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    color: 'from-rose-50 to-pink-100/60 border-rose-200',
    btnColor: 'bg-rose-600 hover:bg-rose-700',
  },
  {
    id: 'hampers',
    title: 'Curated Gift Hampers',
    subtitle: 'Bouquets + Clips + Lights + Cards',
    tag: 'All-In-One',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-50 to-indigo-100/60 border-purple-200',
    btnColor: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'clips',
    title: 'Fluffy Hair Clips & Claws',
    subtitle: 'Snap clips, mini claws & floral pins',
    tag: 'Everyday Cute',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-50 to-yellow-100/60 border-amber-200',
    btnColor: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'accessories',
    title: 'Keychains & Bag Charms',
    subtitle: 'Alphabet initials & beaded daisies',
    tag: 'Customizable',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-50 to-teal-100/60 border-emerald-200',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700',
  },
];

export default function CategoryVisualGrid({ onNavigate }) {
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
            onClick={() => onNavigate && onNavigate('shop')}
            className="text-xs sm:text-sm font-bold text-[#c75b45] hover:text-[#a64733] flex items-center gap-1 group transition-colors"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4-Category Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate && onNavigate('shop')}
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
