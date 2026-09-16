import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ProductCatalog({
  products,
  onQuickView,
  onAddToCart,
  onDirectInstagramOrder,
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.categoryLabel && product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });

  return (
    <section id="collection" className="py-16 sm:py-20 bg-cream relative scroll-mt-28 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Handcrafted with Care & Heart
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Explore our signature everlasting floral arrangements, cute hair accessories, and bespoke gift hampers.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-studio-600 text-white shadow-craft scale-105'
                      : 'bg-white text-stone-700 hover:bg-studio-50 border border-stone-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search and Sort controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Search input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bouquets, clips..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-studio-500 focus:border-transparent shadow-xs"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full border border-stone-200 bg-white text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-studio-500 shadow-xs cursor-pointer"
              >
                <option value="featured">✨ Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Customer Rating</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <Sparkles className="w-10 h-10 text-studio-400 mx-auto mb-3 animate-pulse" />
            <h3 className="font-serif text-xl font-bold text-stone-800">No matching creations found</h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              Try searching with another keyword or pick a different category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onDirectInstagramOrder={onDirectInstagramOrder}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
