import React from 'react';
import { Palette, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function CustomizerPromoBanner({ onNavigate }) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#3B1E19] via-[#4A2820] to-[#3B1E19] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rosebud-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-studio-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-rosebud-200 text-xs font-bold uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-rosebud-300" />
                <span>Interactive Studio Customizer</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-white">
                Design Your Dream Bouquet or Gift Hamper Stem-by-Stem
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Choose your favorite flower mix (tulips, sunflowers, daisies, roses), pick the wrapping color palette, add cute hair clips or fairy lights, and generate an instant Instagram DM order in seconds.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-rosebud-500 to-[#c75b45] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Customizer Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://ig.me/m/little.gift.studio._"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>Discuss Idea on Instagram DM</span>
                </a>
              </div>
            </div>

            {/* Right Visual Feature Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 shadow-2xl space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-bold text-rosebud-200">
                  <span>How Customizing Works</span>
                  <span>✨ 100% Tailored</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-lg">🌷</span>
                    <div>
                      <p className="font-bold text-white">1. Select Flower Stems</p>
                      <p className="text-[11px] text-stone-300">Mix tulips, sunflowers, or daisies</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-lg">🎨</span>
                    <div>
                      <p className="font-bold text-white">2. Pick Color & Wrapping</p>
                      <p className="text-[11px] text-stone-300">Korean matte, vintage kraft, or luxury box</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-lg">💌</span>
                    <div>
                      <p className="font-bold text-white">3. Add-ons & Free Note</p>
                      <p className="text-[11px] text-stone-300">Keychains, clips, fairy lights & calligraphy card</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-rosebud-300 font-medium">
                    Made to order in 2–3 days with love ❤️
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
