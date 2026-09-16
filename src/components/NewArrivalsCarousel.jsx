import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Eye, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { PRODUCTS } from '../data/products';
import { orderProductViaInstagram } from '../lib/instagram';

export default function NewArrivalsCarousel({ onQuickView, onAddToCart, onNavigate }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Take the 7 bouquet products
  const newArrivals = PRODUCTS.filter((p) => p.category === 'bouquets').slice(0, 7);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = carouselRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const cardWidth = 290;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth * 2 : cardWidth * 2,
      behavior: 'smooth',
    });
  };

  const handleInstagramOrder = (product) => {
    orderProductViaInstagram(product, '', '', 1);
  };

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-rosebud-50/50 via-white to-rosebud-50/30 border-y border-rosebud-100/70 relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-rosebud-200/25 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-butter-200/25 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosebud-100 text-rosebud-800 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rosebud-600 animate-pulse" />
              Fresh From The Craft Table
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
              New Arrivals & Everlasting Stems
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Explore our latest handcrafted pipe cleaner bouquets, fresh pastel tulips & radiant sunflowers.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => onNavigate?.('shop', { category: 'bouquets' })}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-rosebud-700 hover:text-rosebud-800 transition-colors"
            >
              <span>View All Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-rosebud-50 hover:border-rosebud-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-rosebud-50 hover:border-rosebud-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              onClick={() => onQuickView?.(product)}
              className="w-[260px] sm:w-[285px] shrink-0 snap-start bg-white rounded-3xl border border-rosebud-200/80 overflow-hidden hover:shadow-card-hover hover:border-rosebud-300 transition-all duration-300 flex flex-col group relative cursor-pointer select-none"
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-xs">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative aspect-4/3.5 overflow-hidden bg-rosebud-50/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-semibold text-rosebud-700 uppercase tracking-wider text-[9px]">
                      {product.categoryLabel || product.category}
                    </span>
                    <span className="text-amber-500 font-bold flex items-center gap-0.5 text-[11px]">
                      ★ {product.rating}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-rosebud-700 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Colors */}
                  {product.colors && (
                    <div className="mt-2.5 flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] text-stone-400 font-medium">Shades:</span>
                      {product.colors.slice(0, 3).map((col, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-rosebud-50 border border-rosebud-100 text-stone-700 text-[9px] font-medium"
                        >
                          {col}
                        </span>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-[9px] text-stone-400 font-medium">
                          +{product.colors.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Price and Action Indicator */}
                <div className="pt-3 mt-3 border-t border-rosebud-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-base text-stone-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-stone-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-emerald-600 font-medium block">
                      Made to order (1-2d)
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rosebud-50 group-hover:bg-rosebud-600 text-rosebud-700 group-hover:text-white text-xs font-semibold transition-all shadow-2xs">
                    <span>View & Order</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
