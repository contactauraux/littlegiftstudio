import React from 'react';
import { Star, ShoppingBag, Eye, MessageCircle, Heart } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart, onDirectWhatsApp }) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-card-hover hover:border-studio-300 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Product Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full bg-studio-600 text-white text-[11px] font-semibold tracking-wide shadow-sm">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3.8] overflow-hidden bg-studio-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="p-2.5 rounded-full bg-white text-stone-800 hover:bg-studio-50 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 rounded-full bg-studio-600 text-white hover:bg-studio-700 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all"
            title="Add to Hamper Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-medium text-studio-600 uppercase text-[10px] tracking-wider">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-studio-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-stone-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Color preview tags */}
          {product.colors && (
            <div className="mt-3 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 font-medium">Available:</span>
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

        {/* Pricing and Action Buttons */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-stone-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              Made to order (2-3d)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onAddToCart(product)}
              className="px-3.5 py-2 rounded-xl bg-studio-600 hover:bg-studio-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button
              onClick={() => onDirectWhatsApp(product)}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
              title="Order directly via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
