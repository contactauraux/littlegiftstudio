import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, CheckCircle2, Clock, Sparkles, Shield, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function ProductModal({ product, onClose, onAddToCart, onDirectInstagramOrder }) {
  if (!product) return null;

  // Build color variants list
  const colorVariants = Array.isArray(product.colorVariants) && product.colorVariants.length > 0
    ? product.colorVariants
    : (product.colors || []).map((c, idx) => ({
        name: c,
        image: (product.images && product.images[idx]) || product.image
      }));

  // Build gallery from main image + any variant images
  const gallery = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    colorVariants.length > 0 ? colorVariants[0].name : (product.colors?.[0] || '')
  );
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');

  // Reset when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    const initialColor = colorVariants.length > 0 ? colorVariants[0].name : (product.colors?.[0] || '');
    setSelectedColor(initialColor);
    setQuantity(1);
    setCustomNote('');
  }, [product]);

  // When user clicks a color theme button: switch selectedColor AND switch the preview image to that color variant!
  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    const matchedVariant = colorVariants.find(v => v.name.toLowerCase() === colorName.toLowerCase());
    if (matchedVariant && matchedVariant.image) {
      const imgIdx = gallery.findIndex(url => url === matchedVariant.image);
      if (imgIdx > -1) {
        setActiveImageIndex(imgIdx);
      } else {
        // If not in gallery array directly, set image directly
        setActiveImageIndex(0);
      }
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, customNote);
    onClose();
  };

  const handleInstagramDM = () => {
    if (onDirectInstagramOrder) {
      onDirectInstagramOrder(product, selectedColor, customNote, quantity);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Find active image URL based on index or selected color variant
  const matchedVariantForColor = colorVariants.find(v => v.name.toLowerCase() === selectedColor.toLowerCase());
  const currentImage = gallery[activeImageIndex] || matchedVariantForColor?.image || product.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Backdrop Click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Dynamic Color Variant Photo Viewer */}
        <div className="md:w-1/2 bg-studio-50 p-4 sm:p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-stone-100">
          
          {/* Main Display Image */}
          <div className="relative aspect-square sm:aspect-[4/4] rounded-2xl overflow-hidden bg-stone-100 shadow-inner group">
            <img
              src={currentImage}
              alt={`${product.name} - ${selectedColor}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full bg-studio-600 text-white text-xs font-semibold shadow-sm">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Active Color Variant Floating Pill */}
            {selectedColor && (
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-stone-900/70 text-white text-[11px] font-medium backdrop-blur-sm flex items-center gap-1.5 shadow">
                <Palette className="w-3 h-3 text-rosebud-300" />
                <span>Showing: <strong>{selectedColor}</strong></span>
              </div>
            )}

            {/* Gallery Navigation Arrows (if > 1 image) */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md transition-all opacity-80 hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 shadow-md transition-all opacity-80 hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-stone-900/60 text-white text-[10px] backdrop-blur-sm">
                  {activeImageIndex + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          {/* Color Variant Visual Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1 px-0.5">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-studio-600 ring-2 ring-studio-300 scale-105 shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
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
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">₹{product.originalPrice * quantity}</span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ₹{(product.originalPrice - product.price) * quantity}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Interactive Color Variant Selector that switches photos */}
            {colorVariants.length > 0 && (
              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-800">
                    Select Color Variant: <span className="text-studio-600 font-medium">{selectedColor}</span>
                  </label>
                  <span className="text-[10px] text-stone-400 italic">Click to preview color</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorVariants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => handleColorSelect(variant.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        selectedColor === variant.name
                          ? 'bg-studio-600 text-white shadow-sm ring-2 ring-studio-300 scale-105'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {variant.image && (
                        <span className="w-2.5 h-2.5 rounded-full border border-white/60 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${variant.image})` }} />
                      )}
                      <span>{variant.name}</span>
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
            {product.includes && product.includes.length > 0 && (
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
              onClick={handleInstagramDM}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-pink-800 border border-pink-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>Direct Instant Instagram DM Order</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
