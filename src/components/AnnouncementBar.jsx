import React from 'react';
import { Sparkles, Heart, Gift } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-rosebud-100 via-studio-100 to-butter-100 text-stone-700 text-xs sm:text-sm py-2 px-4 border-b border-rosebud-200/60 font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center flex-wrap">
        <span className="inline-flex items-center gap-1.5 font-semibold text-studio-700">
          <Sparkles className="w-3.5 h-3.5 text-studio-500 animate-sparkle" />
          Handmade in Small Batches
        </span>
        <span className="hidden sm:inline text-stone-300">•</span>
        <span className="inline-flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rosebud-500 fill-rosebud-400 inline" />
          Everlasting Pipe Cleaner Blooms & Hampers
        </span>
        <span className="hidden md:inline text-stone-300">•</span>
        <span className="hidden md:inline-flex items-center gap-1 text-studio-800">
          <Gift className="w-3.5 h-3.5 text-studio-600" />
          Free Handwritten Gift Note with Every Order
        </span>
      </div>
    </div>
  );
}
