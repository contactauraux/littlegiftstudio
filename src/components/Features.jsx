import React from 'react';
import { Scissors, Flower, Palette, Sparkles, HeartHandshake, PackageCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Scissors,
      title: '100% Handcrafted',
      desc: 'Never mass-produced in factories. Every petal, twist, and leaf is shaped by hand with high-density velvet chenille.',
      color: 'bg-rosebud-100 text-rosebud-700',
    },
    {
      icon: Flower,
      title: 'Everlasting Keepsake',
      desc: 'Real flowers fade in a few days. Our pipe cleaner bouquets stay vibrant and fresh forever as cozy bedroom decor.',
      color: 'bg-butter-100 text-amber-700',
    },
    {
      icon: Palette,
      title: 'Customizable Palette',
      desc: 'Pick your favorite flowers, color themes, wrapping aesthetic, and personalized letter charms for any occasion.',
      color: 'bg-lavender-100 text-purple-700',
    },
    {
      icon: HeartHandshake,
      title: 'Direct Maker Touch',
      desc: 'Friendly small-business feel. Direct WhatsApp chat to discuss custom requirements, photo cards, and dates.',
      color: 'bg-studio-100 text-studio-700',
    },
    {
      icon: PackageCheck,
      title: 'Crush-Proof Packaging',
      desc: 'Shipped in rigid aesthetic boxes with protective bubble wrap so your flowers arrive in pristine, fluffy shape.',
      color: 'bg-matcha-100 text-emerald-700',
    },
    {
      icon: Sparkles,
      title: 'Affordable Gifting',
      desc: 'Meaningful, handmade gifting starting from just ₹179. Thoughtful gifts that fit student and young adult budgets.',
      color: 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-studio-600 bg-studio-50 px-3 py-1 rounded-full">
            The Little Gift Studio Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
            Why Handmade Beats Mass-Produced
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Every creation tells a story of care, patience, and heartfelt memories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-craftcard/70 border border-studio-100/80 hover:bg-white hover:shadow-soft hover:border-studio-200 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
