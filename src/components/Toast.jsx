import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function Toast({ message, show }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-stone-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-stone-700">
        <div className="w-5 h-5 rounded-full bg-studio-500 text-white flex items-center justify-center text-[10px]">
          <Check className="w-3 h-3" />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
}
