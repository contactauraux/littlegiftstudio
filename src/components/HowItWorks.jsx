import React from 'react';
import { ShoppingBag, MessageSquareText, Sparkles, Truck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: ShoppingBag,
      title: 'Pick or Customize',
      desc: 'Browse our ready catalogue or use the customizer to select flowers, colors, and add-on clips.',
    },
    {
      number: '02',
      icon: MessageSquareText,
      title: 'Quick WhatsApp Chat',
      desc: 'Connect directly with the maker to finalize your color scheme, recipient note, and delivery date.',
    },
    {
      number: '03',
      icon: Sparkles,
      title: 'Handcrafted With Love',
      desc: 'We twist and shape each flower by hand in 2–3 days with extreme attention to detail.',
    },
    {
      number: '04',
      icon: Truck,
      title: 'Safely Delivered',
      desc: 'Packaged in a sturdy box with aesthetic bubble wrap and shipped straight to your doorstep.',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-600 bg-studio-50 px-3 py-1 rounded-full">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            How Ordering Works
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            From our craft table to your loved one’s hands in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step circle */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-studio-100/90 text-studio-700 flex items-center justify-center group-hover:bg-studio-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
