import React, { useState, useEffect } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { openInstagramDM } from '../lib/instagram';
import { getStoredFaqs } from '../lib/contentStore';

/**
 * FaqCard
 * Reusable card for a single FAQ item with Little Gift Studio aesthetic styling.
 */
export const FaqCard = ({ question, answer, icon = '🌸' }) => {
  return (
    <div className="flex flex-col items-start gap-3 p-6 sm:p-7 bg-white/95 backdrop-blur-md rounded-3xl border border-rosebud-100/90 shadow-[0_8px_30px_-6px_rgba(220,122,101,0.12)] hover:shadow-card-hover hover:border-rosebud-300 w-80 sm:w-96 flex-shrink-0 transition-all duration-300 group select-none">
      <div className="flex items-center gap-2">
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug group-hover:text-studio-600 transition-colors">
          {question}
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
        {answer}
      </p>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({ children, speed = '40s', direction = 'left' }) => {
  const animationClass =
    direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

  const style = { '--scroll-duration': speed };

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-1">
      <div className={`flex ${animationClass} w-max`} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* duplicate for seamless loop */}
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const [faqs, setFaqs] = useState(() => getStoredFaqs());

  useEffect(() => {
    const handleFaqsUpdated = (e) => {
      if (e.detail) {
        setFaqs(e.detail);
      } else {
        setFaqs(getStoredFaqs());
      }
    };

    window.addEventListener('lgs_faqs_updated', handleFaqsUpdated);
    return () => window.removeEventListener('lgs_faqs_updated', handleFaqsUpdated);
  }, []);

  // Split into two balanced horizontal rows
  const mid = Math.ceil(faqs.length / 2);
  const row1 = faqs.slice(0, mid);
  const row2 = faqs.slice(mid);

  return (
    <section id="faqs" className="relative flex flex-col items-center gap-10 py-16 w-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center z-10 max-w-2xl px-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rosebud-100/80 border border-rosebud-200/70 text-studio-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
        
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-xl">
          Everything you need to know about our handmade pipe cleaner bouquets, customization, and deliveries.
        </p>
      </div>

      {/* Horizontal Multi-Row Scroller */}
      <div className="flex flex-col gap-6 z-10 w-full">
        {row1.length > 0 && (
          <HorizontalScroller speed="38s" direction="left">
            {row1.map((item) => (
              <FaqCard key={item.id} icon={item.icon} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        )}

        {row2.length > 0 && (
          <HorizontalScroller speed="44s" direction="right">
            {row2.map((item) => (
              <FaqCard key={item.id} icon={item.icon} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        )}
      </div>

      {/* Direct Instagram Prompt */}
      <div className="text-center z-10 pt-2">
        <p className="text-xs text-stone-500 flex items-center justify-center gap-2">
          <span>Still have questions?</span>
          <button
            onClick={() => openInstagramDM('Hi Little Gift Studio! 🌸 I have a question about custom handmade gifts.')}
            className="text-pink-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
            Chat directly with us on Instagram DM
          </button>
        </p>
      </div>

    </section>
  );
};

export default FAQ;
