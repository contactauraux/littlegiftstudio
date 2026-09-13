import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, Heart, Quote } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-studio-50/50 border-t border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rosebud-100 text-rosebud-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rosebud-500 text-rosebud-500" />
            Loved by 300+ Gifters
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Real Stories, Real Smiles
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            See why people choose our handmade pipe cleaner bouquets and hampers for their special moments.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-soft flex flex-col justify-between hover:shadow-card-hover transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-studio-200/80 absolute top-5 right-5" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-studio-100 flex items-center justify-center text-base shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{review.name}</h4>
                  <p className="text-[11px] text-stone-500">{review.location} • <span className="text-studio-600">{review.product}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
