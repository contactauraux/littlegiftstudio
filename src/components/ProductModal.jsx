import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, CheckCircle2, Clock, Sparkles, Shield } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, onDirectWhatsApp }) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, customNote);
    onClose();
  };

  const handleWhatsApp = () => {
    onDirectWhatsApp(product, selectedColor, customNote, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Backdrop Click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Banner */}
        <div className="md:w-1/2 bg-studio-50 relative min-h-[280px] md:min-h-[420px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-studio-600 text-white text-xs font-semibold shadow-sm">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-7 overflow-y-auto max-h-[70vh] md:max-h-[85vh] flex flex-col justify-between">
          
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold text-studio-600 uppercase tracking-wider text-[11px]">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-stone-900">₹{product.price * quantity}</span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">₹{product.originalPrice * quantity}</span>
              )}
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                Save ₹{(product.originalPrice - product.price) * quantity}
              </span>
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-800 block mb-2">
                  Select Color Theme: <span className="text-studio-600 font-medium">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedColor === color
                          ? 'bg-studio-600 text-white shadow-sm ring-2 ring-studio-300'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800">Quantity:</span>
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-stone-900 bg-white min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* What is included checklist */}
            {product.includes && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-800 block mb-1.5">Package Includes:</span>
                <ul className="space-y-1">
                  {product.includes.map((inc, i) => (
                    <li key={i} className="text-[11px] text-stone-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-studio-500 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optional Gift Message */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Complimentary Gift Card Message (Optional):
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Happy Birthday Maya! Love, Rohit"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 focus:ring-1 focus:ring-studio-200"
              />
            </div>

          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
            <button
              onClick={handleAdd}
              className="w-full py-3 px-4 rounded-xl bg-studio-600 hover:bg-studio-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Hamper Cart (₹{product.price * quantity})
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Direct Instant WhatsApp Order
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
