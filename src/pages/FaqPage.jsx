import React from 'react';
import FAQ from '../components/FAQ';
import { Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { openInstagramDM } from '../lib/instagram';

export default function FaqPage() {
  return (
    <div className="py-2 space-y-6">
      <FAQ />

      {/* Direct Help Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-pink-50 via-white to-rosebud-50 p-6 sm:p-8 rounded-3xl border border-pink-200/80 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center mx-auto text-xl">
            💬
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Have a custom requirement or special deadline?
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            Chat directly with our maker on Instagram DM to finalize colors, custom flower stems, photo cards, or bulk orders.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openInstagramDM('Hi Little Gift Studio! 🌸 I have a question about a custom handmade gift order.')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-rosebud-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Chat with Maker on Instagram DM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
