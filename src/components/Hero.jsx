import React, { useState, useRef, useEffect } from 'react';
import { getStoredBanners } from '../lib/bannerStore';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Eye } from 'lucide-react';

export default function Hero({ products = [], onQuickView, onAddToCart, onNavigate }) {
  const [banners, setBanners] = useState(() => getStoredBanners());
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerTrackRef = useRef(null);
  const picksScrollRef = useRef(null);
  const isHoveredRef = useRef(false);

  // Sync with banner updates from Admin Panel
  useEffect(() => {
    const handleBannersUpdated = (e) => {
      if (e.detail) {
        setBanners(e.detail);
      } else {
        setBanners(getStoredBanners());
      }
    };

    window.addEventListener('lgs_banners_updated', handleBannersUpdated);
    return () => window.removeEventListener('lgs_banners_updated', handleBannersUpdated);
  }, []);

  // Automatic horizontal scrolling for the top banner cards
  useEffect(() => {
    if (banners.length <= 1) return;

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
          banners.length - 1,
          Math.round((track.scrollLeft + cardWidth) / cardWidth)
        );
        setActiveBannerIndex(nextIdx);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleBannerScroll = () => {
    if (!bannerTrackRef.current) return;
    const track = bannerTrackRef.current;
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 16 : 380;
    const currentIdx = Math.round(track.scrollLeft / cardWidth);
    setActiveBannerIndex(Math.min(banners.length - 1, Math.max(0, currentIdx)));
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
    <section className="relative pt-2 sm:pt-4 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. TOP HORIZONTAL PROMO BANNERS CAROUSEL */}
      <div
        className="relative group mb-10"
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => (isHoveredRef.current = false)}
      >
        <div
          ref={bannerTrackRef}
          onScroll={handleBannerScroll}
          className="flex items-stretch gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`w-[85vw] sm:w-[420px] md:w-[460px] lg:w-[480px] shrink-0 snap-start relative rounded-3xl p-5 sm:p-6 border shadow-soft flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-card-hover group/card ${
                banner.bgClass || 'bg-rose-50 border-rose-200'
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
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        if (banner.link === '#customizer' || banner.link === '#custom') {
                          onNavigate('custom');
                        } else if (banner.link === '#contact') {
                          onNavigate('contact');
                        } else if (banner.link === '#reviews') {
                          onNavigate('reviews');
                        } else {
                          onNavigate('shop');
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-transform group-hover/card:scale-105 ${banner.btnClass || 'bg-rose-600 text-white'}`}
                  >
                    <span>{banner.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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
        {banners.length > 1 && (
          <>
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
              {banners.map((_, idx) => (
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
          </>
        )}
      </div>

      {/* 2. QUICK PICKS HORIZONTAL SHELF */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-studio-600 uppercase tracking-wider">
              Handmade Studio Curations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Quick Picks & Bestselling Hampers
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollPicks('left')}
              aria-label="Previous picks"
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 shadow-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollPicks('right')}
              aria-label="Next picks"
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 shadow-xs transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Row */}
        <div
          ref={picksScrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="w-60 sm:w-64 shrink-0 snap-start bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-card-hover hover:border-studio-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square bg-studio-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-studio-600 text-white text-[10px] font-bold shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="p-2 rounded-full bg-white text-stone-800 hover:bg-stone-100 shadow-md"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onAddToCart && onAddToCart(product)}
                      className="p-2 rounded-full bg-studio-600 text-white hover:bg-studio-700 shadow-md"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5">
                  <span className="text-[10px] font-semibold text-studio-600 uppercase tracking-wider block">
                    {product.categoryLabel || product.category}
                  </span>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 mt-0.5">
                    {product.name}
                  </h4>
                </div>
              </div>

              <div className="p-3.5 pt-0 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 text-sm">₹{product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-[10px] text-stone-400 line-through ml-1">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onAddToCart && onAddToCart(product)}
                  className="px-2.5 py-1 rounded-lg bg-studio-50 hover:bg-studio-600 hover:text-white text-studio-700 text-xs font-semibold transition-colors"
                >
                  + Hamper
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
