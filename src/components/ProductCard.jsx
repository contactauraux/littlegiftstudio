import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function ProductCard({ product, onQuickView }) {
  const handleClick = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden hover:shadow-card-hover hover:border-studio-300 transition-all duration-300 flex flex-col h-full relative cursor-pointer select-none"
    >
      {/* Product Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-studio-600 text-white text-[11px] font-bold tracking-wide shadow-sm">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3.8] overflow-hidden bg-studio-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-studio-600 uppercase text-[10px] tracking-wider">
              {product.categoryLabel || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-studio-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-stone-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color preview tags */}
          {product.colors && (
            <div className="mt-3 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 font-medium">Shades:</span>
              {product.colors.slice(0, 3).map((color, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium"
                >
                  {color}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-stone-400">+{product.colors.length - 3} more</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing and Direct Click Indicator */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-stone-900">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              Made to order (2-3d)
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-studio-50 group-hover:bg-studio-600 text-studio-700 group-hover:text-white text-xs font-semibold transition-all shadow-xs">
            <span>View & Order</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

      </div>
    </div>
  );
}
