import React from 'react';
import { Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import FAQ from '../components/FAQ';

export default function ContactPage() {
  return (
    <div className="py-2 space-y-10">
      
      {/* Contact Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rosebud-100/80 border border-rosebud-200/70 text-studio-700 text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-studio-500" />
            We’d Love to Hear From You
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Get in Touch with Our Maker
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Have questions about a custom bouquet, special deadline, color palette, or bulk order? Connect directly with us on Instagram!
          </p>
        </div>

        {/* Official Instagram Card */}
        <div className="max-w-lg mx-auto mb-12">
          <a
            href="https://instagram.com/little.gift.studio._"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border border-pink-200 shadow-soft hover:shadow-card-hover hover:scale-102 transition-all duration-300 group flex flex-col justify-between block"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 block mb-1">
                Official Instagram Page
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                @little.gift.studio._
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Follow our daily flower making reels, sneak peeks, and explore our newest design releases!
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs sm:text-sm font-bold text-pink-700">
              <span>Visit Instagram Profile</span>
              <span className="text-lg group-hover:translate-x-1.5 transition-transform">➔</span>
            </div>
          </a>
        </div>

      </section>

      {/* Embedded FAQ Scroller in Contact Page */}
      <FAQ />

    </div>
  );
}
