import React from 'react';
import FAQ from '../components/FAQ';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function FaqPage() {
  return (
    <div className="py-2 space-y-6">
      <FAQ />

      {/* Direct Help Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-studio-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
            💬
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Have a custom requirement or special deadline?
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            Chat directly with our maker on WhatsApp to finalize colors, custom flower stems, photo cards, or bulk orders.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20have%20a%20question%20about%20a%20custom%20order%20%F0%9F%8C%B8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Maker on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
