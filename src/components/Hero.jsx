import React from 'react';
import { Sparkles, ArrowRight, Heart, Flower2, Gift, ShieldCheck, Play } from 'lucide-react';

export default function Hero({ onExploreClick, onCustomizerClick }) {
  return (
    <section id="top" className="relative overflow-hidden pt-4 pb-16 lg:pb-20 scroll-mt-32 bg-gradient-to-b from-cream via-studio-50/50 to-cream">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rosebud-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-5 w-80 h-80 bg-butter-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-72 h-72 bg-matcha-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-100/90 border border-studio-200 text-studio-800 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-studio-500 animate-ping" />
              🌸 100% Handmade in Small Batches • Made to Order
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.15] font-bold tracking-tight">
              Thoughtful Gifts &{' '}
              <span className="relative inline-block text-studio-600">
                Everlasting Blooms
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-studio-300 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>{' '}
              That Never Wilt.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We shape soft, colorful pipe cleaner bouquets, cute hair clips, keychains, and curated hampers designed for birthdays, anniversaries, and cozy everyday surprises.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#collection"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-studio-600 hover:bg-studio-700 text-white font-semibold text-base shadow-craft hover:shadow-card-hover transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#customizer"
                onClick={onCustomizerClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-studio-50 text-studio-800 font-semibold text-base border border-studio-200 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-studio-500" />
                <span>Build Your Bouquet</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-start gap-2">
                <Flower2 className="w-4 h-4 text-studio-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-800">Never Wilts</h4>
                  <p className="text-[11px] text-stone-500">Forever vibrant keepsakes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gift className="w-4 h-4 text-rosebud-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-800">Custom Colors</h4>
                  <p className="text-[11px] text-stone-500">Tailored to your theme</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-800">Safe Packing</h4>
                  <p className="text-[11px] text-stone-500">Sturdy rigid box delivery</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Main Showcase Card */}
            <div className="relative mx-auto max-w-md bg-white p-4 sm:p-5 rounded-3xl shadow-soft border border-studio-100 transform hover:rotate-1 transition-transform duration-300">
              
              {/* Top Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-butter-200/90 text-amber-900 text-[11px] font-cursive font-bold rounded shadow-sm rotate-[-2deg]">
                ✨ Hand-twisted with love
              </div>

              {/* Main Image Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/4.2] bg-studio-100">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80"
                  alt="Little Gift Studio Handmade Bouquets"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                
                {/* Overlay Text Inside Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-studio-600/90 text-[11px] font-semibold mb-1">
                    Featured Bouquet
                  </span>
                  <h3 className="font-serif text-lg font-bold">Pastel Tulip Garden Bundle</h3>
                  <p className="text-xs text-stone-200">5 stems • Korean matte wrap • Free gift note</p>
                </div>

                {/* Video Preview Anchor */}
                <a
                  href="#craft-video"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-studio-700 hover:text-studio-900 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                >
                  <Play className="w-3 h-3 fill-studio-600 text-studio-600" />
                  Watch Craft Reel
                </a>
              </div>

              {/* Bottom Quick Feature Tag Bar */}
              <div className="mt-4 flex items-center justify-between px-2 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <span className="w-6 h-6 rounded-full bg-rosebud-200 border-2 border-white flex items-center justify-center text-[10px]">🌸</span>
                    <span className="w-6 h-6 rounded-full bg-lavender-200 border-2 border-white flex items-center justify-center text-[10px]">🌷</span>
                    <span className="w-6 h-6 rounded-full bg-butter-200 border-2 border-white flex items-center justify-center text-[10px]">🌻</span>
                  </div>
                  <span className="text-xs text-stone-600 font-medium">350+ Custom Orders</span>
                </div>
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                  <span>★ 4.9</span>
                  <span className="text-stone-400 font-normal">(180+ reviews)</span>
                </div>
              </div>

            </div>

            {/* Floating Cute Floating Badges */}
            <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-studio-100 flex items-center gap-3 animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-rosebud-100 flex items-center justify-center text-lg">
                💐
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Zero Wilting Ever</p>
                <p className="text-[10px] text-stone-500">Cherish it for years</p>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-studio-100 items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-butter-100 flex items-center justify-center text-lg">
                💌
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Handwritten Note</p>
                <p className="text-[10px] text-stone-500">Free with every gift</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
