import React from 'react';
import { HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

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

  // Inline style to set the CSS custom property for scroll duration.
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

const DEFAULT_FAQ_DATA = {
  mainTitle: 'Frequently Asked Questions',
  mainSubtitle: 'Everything you need to know about our handmade pipe cleaner bouquets, customization, and deliveries.',
  rows: [
    {
      id: 'row-1',
      speed: '38s',
      direction: 'left',
      faqItems: [
        {
          id: 'faq-1',
          icon: '🌷',
          question: 'How long do pipe cleaner flowers last?',
          answer: 'Forever! Unlike fresh flowers that wilt in 3-5 days, our handmade blooms are crafted from high-density chenille wire that keeps its shape, color, and plush texture for years.',
        },
        {
          id: 'faq-2',
          icon: '🎨',
          question: 'Can I pick custom colors or flower types?',
          answer: 'Yes, absolutely! You can use our interactive "Build Custom Bouquet" page or message us on WhatsApp to choose your dream color palette, wrapping paper, and flower stems.',
        },
        {
          id: 'faq-3',
          icon: '⏳',
          question: 'How much time does it take to make and deliver?',
          answer: 'Every piece is 100% handcrafted in small batches. Orders are lovingly crafted in 2–3 days and delivered within 2–5 days depending on your city/pincode.',
        },
        {
          id: 'faq-4',
          icon: '📦',
          question: 'Do you deliver pan-India safely?',
          answer: 'Yes! We ship across India. All bouquets and hampers are packaged in heavy-duty crush-proof rigid boxes with protective cushioning to ensure they arrive in perfect shape.',
        },
      ],
    },
    {
      id: 'row-2',
      speed: '44s',
      direction: 'right',
      faqItems: [
        {
          id: 'faq-5',
          icon: '💌',
          question: 'Can I include a personal handwritten message?',
          answer: 'Yes! Every bouquet and hamper includes a complimentary handwritten vintage calligraphy gift card. You can write your custom message during checkout.',
        },
        {
          id: 'faq-6',
          icon: '✨',
          question: 'How do I clean and care for the flowers?',
          answer: 'Keep them in a dry indoor space away from direct moisture. To remove any dust over time, gently dust with a soft dry brush or blow with a hairdryer on cool/low.',
        },
        {
          id: 'faq-7',
          icon: '🎀',
          question: 'Can I order bulk hampers for events & return gifts?',
          answer: 'Yes! We accept bulk hamper orders for birthdays, anniversaries, corporate events, and wedding return gifts with special discounted bundle pricing.',
        },
        {
          id: 'faq-8',
          icon: '💖',
          question: 'What is the payment and ordering process?',
          answer: 'You can build your order on the website and submit directly to our WhatsApp where you can review color photos, delivery timelines, and pay via UPI/GPay.',
        },
      ],
    },
  ],
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal scrolling rows.
 */
export const FAQ = ({ data = DEFAULT_FAQ_DATA }) => {
  return (
    <section id="faqs" className="relative flex flex-col items-center gap-10 py-16 w-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center z-10 max-w-2xl px-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rosebud-100/80 border border-rosebud-200/70 text-studio-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          {data.mainTitle}
        </h2>
        
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-xl">
          {data.mainSubtitle}
        </p>
      </div>

      {/* Horizontal Multi-Row Scroller */}
      <div className="flex flex-col gap-6 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard key={item.id} icon={item.icon} question={item.question} answer={item.answer} />
            ))}
          </HorizontalScroller>
        ))}
      </div>

      {/* Direct WhatsApp Prompt */}
      <div className="text-center z-10 pt-2">
        <p className="text-xs text-stone-500 flex items-center justify-center gap-2">
          <span>Still have questions?</span>
          <a
            href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20have%20a%20question%20%F0%9F%8C%B8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            Chat directly with us on WhatsApp
          </a>
        </p>
      </div>

    </section>
  );
};

export default FAQ;
