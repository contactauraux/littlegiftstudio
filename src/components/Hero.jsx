import React, { useState, useRef, useEffect } from 'react';
import { HERO_BANNERS } from '../data/heroBanners';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Eye } from 'lucide-react';

export default function Hero({ products = [], onQuickView, onAddToCart }) {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerTrackRef = useRef(null);
  const picksScrollRef = useRef(null);
  const isHoveredRef = useRef(false);

  // Automatic horizontal scrolling for the top 4 banner cards
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHoveredRef.current || !bannerTrackRef.current) return;

      const track = bannerTrackRef.current;
      const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 380;
      const maxScrollLeft = track.scrollWidth - track.clientWidth;

      if (track.scrollLeft >= maxScrollLeft - 20) {
        // Wrap around to start
        track.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveBannerIndex(0);
      } else {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
        const nextIdx = Math.min(
          HERO_BANNERS.length - 1,
          Math.round((track.scrollLeft + cardWidth) / cardWidth)
        );
        setActiveBannerIndex(nextIdx);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleBannerScroll = () => {
    if (!bannerTrackRef.current) return;
    const track = bannerTrackRef.current;
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 380;
    const currentIdx = Math.round(track.scrollLeft / cardWidth);
    setActiveBannerIndex(Math.min(HERO_BANNERS.length - 1, Math.max(0, currentIdx)));
  };

  const scrollBanners = (direction) => {
    if (!bannerTrackRef.current) return;
    const track = bannerTrackRef.current;
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 380;
    track.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollToBannerIndex = (index) => {
    if (!bannerTrackRef.current) return;
    const track = bannerTrackRef.current;
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 380;
    track.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveBannerIndex(index);
  };

  const scrollPicks = (direction) => {
    if (picksScrollRef.current) {
      const scrollAmount = 280;
      picksScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="top" className="py-4 space-y-6 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. TOP AUTOMATIC HORIZONTAL BANNER SCROLLER (4 CARDS) */}
        <div
          className="relative group"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
          {/* Horizontal Scrolling Track */}
          <div
            ref={bannerTrackRef}
            onScroll={handleBannerScroll}
            className="flex items-stretch gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {HERO_BANNERS.map((banner, idx) => (
              <div
                key={banner.id}
                className={`w-[85vw] sm:w-[420px] md:w-[460px] lg:w-[480px] shrink-0 snap-start relative rounded-3xl p-5 sm:p-6 border shadow-soft flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-card-hover group/card ${
                  banner.bgClass
                }`}
              >
                {/* Top Badge & Text */}
                <div className="z-10 max-w-[62%]">
                  {banner.badge && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/90 text-stone-800 text-[11px] font-bold shadow-xs mb-2">
                      {banner.badge}
                    </span>
                  )}

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                    {banner.title}
                  </h3>

                  <div className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1.5 tracking-tight">
                    {banner.highlight}
                  </div>

                  <p className="text-stone-600 text-xs mt-1 line-clamp-2">
                    {banner.subtitle}
                  </p>

                  <div className="mt-4">
                    <a
                      href={banner.link}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-transform group-hover/card:scale-105 ${banner.btnClass}`}
                    >
                      <span>{banner.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Product Image Showcase on Right */}
                <div className="absolute -bottom-2 -right-3 w-36 sm:w-44 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md transform rotate-2 group-hover/card:rotate-0 group-hover/card:scale-105 transition-all duration-300">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows on Hover */}
          <button
            onClick={() => scrollBanners('left')}
            aria-label="Scroll banners left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-stone-200 shadow-md flex items-center justify-center text-stone-800 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBanners('right')}
            aria-label="Scroll banners right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 border border-stone-200 shadow-md flex items-center justify-center text-stone-800 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Indicators (Round Dots) */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {HERO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToBannerIndex(idx)}
                aria-label={`Go to banner slide ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeBannerIndex === idx
                    ? 'bg-studio-600 ring-2 ring-studio-300 scale-110'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>


        {/* 2. BOTTOM QUICK PICKS / DEALS HORIZONTAL SHELF */}
        <div className="bg-gradient-to-r from-studio-50/80 via-white to-rosebud-50/60 p-4 sm:p-6 rounded-3xl border border-studio-100 shadow-sm relative">
          
          {/* Header with Title and Scroll Arrows */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                🌸 Grab your favorite handmade picks!
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Popular everlasting floral stems, hampers & accessories made to order
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollPicks('left')}
                aria-label="Scroll picks left"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-studio-50 flex items-center justify-center shadow-xs transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollPicks('right')}
                aria-label="Scroll picks right"
                className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-studio-50 flex items-center justify-center shadow-xs transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={picksScrollRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
          >
            {products.map((item) => {
              const discountPercent = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : null;

              return (
                <div
                  key={item.id}
                  className="w-48 sm:w-56 shrink-0 bg-white rounded-2xl border border-stone-200/80 p-3 flex flex-col justify-between hover:shadow-card-hover hover:border-studio-300 transition-all duration-200 group"
                >
                  {/* Image with discount badge */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-studio-50 mb-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {discountPercent && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                        ↓{discountPercent}%
                      </span>
                    )}

                    <button
                      onClick={() => onQuickView && onQuickView(item)}
                      aria-label="Quick view product"
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-stone-700 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div>
                    <span className="text-[10px] text-studio-600 font-bold uppercase tracking-wider block">
                      {item.categoryLabel}
                    </span>
                    <h4
                      onClick={() => onQuickView && onQuickView(item)}
                      className="font-serif text-xs sm:text-sm font-bold text-stone-900 truncate hover:text-studio-600 cursor-pointer mt-0.5"
                    >
                      {item.name}
                    </h4>
                  </div>

                  {/* Price & Add button */}
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-extrabold text-sm sm:text-base text-stone-900">
                          ₹{item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-stone-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart && onAddToCart(item)}
                      aria-label="Add product to cart"
                      className="p-1.5 rounded-lg bg-studio-600 hover:bg-studio-700 text-white shadow-xs transition-colors"
                      title="Add to Hamper"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
