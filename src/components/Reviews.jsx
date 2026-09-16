import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { InfiniteSlider } from './ui/infinite-slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, Heart, Plus, Sparkles, X, CheckCircle, MessageSquare } from 'lucide-react';
import { getStoredReviews, addReview } from '../lib/contentStore';

export function Reviews() {
  const [testimonials, setTestimonials] = useState(() => getStoredReviews());

  useEffect(() => {
    const handleReviewsUpdated = (e) => {
      if (e.detail) {
        setTestimonials(e.detail);
      } else {
        setTestimonials(getStoredReviews());
      }
    };

    window.addEventListener('lgs_reviews_updated', handleReviewsUpdated);
    return () => window.removeEventListener('lgs_reviews_updated', handleReviewsUpdated);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formProduct, setFormProduct] = useState('Pastel Dream Tulip Bouquet');
  const [formRating, setFormRating] = useState(5);
  const [formQuote, setFormQuote] = useState('');
  const [formAvatar, setFormAvatar] = useState('🌸');

  const AVATAR_OPTIONS = ['🌸', '💖', '🌷', '✨', '🌻', '🎁', '🎀', '🧸'];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formQuote.trim()) return;

    const newReview = {
      name: formName.trim(),
      role: formLocation.trim() || 'Verified Customer',
      company: formProduct,
      rating: formRating,
      quote: formQuote.trim(),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      avatarEmoji: formAvatar,
      date: 'Just now',
    };

    addReview(newReview);
    setTestimonials(getStoredReviews());

    // Reset Form
    setFormName('');
    setFormLocation('');
    setFormQuote('');
    setIsModalOpen(false);

    // Show toast
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  // Split into 3 balanced columns for vertical infinite scroll
  const firstColumn = testimonials.filter((_, idx) => idx % 3 === 0);
  const secondColumn = testimonials.filter((_, idx) => idx % 3 === 1);
  const thirdColumn = testimonials.filter((_, idx) => idx % 3 === 2);

  return (
    <section id="reviews" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center gap-3 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rosebud-200/80 bg-rosebud-100/70 px-3.5 py-1 text-xs font-bold text-[#c75b45] uppercase tracking-wider shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rosebud-400 text-rosebud-500" />
            Loved by 500+ Happy Gifters
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight">
            Real Stories, Everlasting Smiles
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md">
            See what customers have to say about our handcrafted pipe cleaner bouquets, hair accessories, and curated hampers.
          </p>

          {/* Leave a Review Trigger Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-studio-600 hover:bg-studio-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Review</span>
              <Sparkles className="w-3.5 h-3.5 text-rosebud-200" />
            </button>
          </div>
        </div>

        {/* 3-Column Vertical Infinite Slider */}
        <div
          className={cn(
            'mt-6 flex max-h-[520px] justify-center gap-4 sm:gap-6 overflow-hidden mask-gradient-y'
          )}
        >
          {/* Column 1 */}
          <InfiniteSlider direction="vertical" speed={32} speedOnHover={14} className="w-full max-w-xs">
            {firstColumn.map((item, idx) => (
              <TestimonialCard key={`col1-${idx}-${item.name}`} testimonial={item} />
            ))}
          </InfiniteSlider>

          {/* Column 2 (Hidden on Mobile) */}
          <InfiniteSlider
            direction="vertical"
            speed={42}
            speedOnHover={18}
            reverse
            className="hidden md:flex w-full max-w-xs"
          >
            {secondColumn.map((item, idx) => (
              <TestimonialCard key={`col2-${idx}-${item.name}`} testimonial={item} />
            ))}
          </InfiniteSlider>

          {/* Column 3 (Hidden on Tablet/Mobile) */}
          <InfiniteSlider
            direction="vertical"
            speed={36}
            speedOnHover={15}
            className="hidden lg:flex w-full max-w-xs"
          >
            {thirdColumn.map((item, idx) => (
              <TestimonialCard key={`col3-${idx}-${item.name}`} testimonial={item} />
            ))}
          </InfiniteSlider>
        </div>

      </div>

      {/* SUBMIT A REVIEW MODAL DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-rosebud-200 z-10 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rosebud-100 flex items-center justify-center text-sm">
                  🌸
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Share Your Review
                  </h3>
                  <p className="text-xs text-stone-500">Your feedback will appear live on our website!</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="mt-4 space-y-4 text-xs sm:text-sm">
              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">
                    City / Occasion
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore • Birthday"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
                  />
                </div>
              </div>

              {/* Product selector */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Product Purchased
                </label>
                <select
                  value={formProduct}
                  onChange={(e) => setFormProduct(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs bg-white cursor-pointer"
                >
                  <option value="Pastel Dream Tulip Bouquet">Pastel Dream Tulip Bouquet</option>
                  <option value="Sunshine Joy Sunflower Set">Sunshine Joy Sunflower Set</option>
                  <option value="Enchanted Lavender Bouquet">Enchanted Lavender Bouquet</option>
                  <option value="The 'Forever Bloom' Hamper">The 'Forever Bloom' Deluxe Hamper</option>
                  <option value="Sweet Bestie Celebration Box">Sweet Bestie Celebration Box</option>
                  <option value="Fluffy Daisy Hair Clips">Fluffy Daisy Hair Clips</option>
                  <option value="Custom Initial Floral Charm">Custom Initial Floral Charm</option>
                  <option value="Custom Bouquet Creation">Custom Bouquet Studio Creation</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      className="p-1 text-amber-400 hover:scale-115 transition-transform"
                    >
                      <Star
                        className={cn(
                          'w-6 h-6',
                          star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        )}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-stone-500 ml-2 font-semibold">{formRating} / 5 Stars</span>
                </div>
              </div>

              {/* Avatar Emoji Pick */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Choose Profile Motif
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setFormAvatar(emoji)}
                      className={cn(
                        'w-8 h-8 rounded-full border text-sm flex items-center justify-center transition-all',
                        formAvatar === emoji
                          ? 'border-studio-500 bg-rosebud-100 scale-110 shadow-xs ring-2 ring-rosebud-300'
                          : 'border-stone-200 hover:bg-stone-50'
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Quote */}
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  Your Review / Story *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How did the flowers turn out? Did the recipient love it?"
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-studio-600 hover:bg-studio-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Review to Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Added Toast Notification */}
      {submittedToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-600">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>Thank you! Your review is now live in the slider! 🌸</span>
          </div>
        </div>
      )}

    </section>
  );
}

function TestimonialCard({
  testimonial,
  className,
  ...props
}) {
  const { quote, image, name, role, company, rating = 5, avatarEmoji } = testimonial;

  return (
    <figure
      className={cn(
        'w-full rounded-3xl border border-rosebud-100/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_24px_-4px_rgba(220,122,101,0.12)] hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group/card',
        className
      )}
      {...props}
    >
      {/* Star Rating & Quote */}
      <div>
        <div className="flex items-center gap-1 mb-2.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <blockquote className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
          "{quote}"
        </blockquote>
      </div>

      {/* User Figcaption */}
      <figcaption className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-3">
        <Avatar className="size-9 rounded-full border border-rosebud-200 bg-rosebud-50 shrink-0">
          {image ? (
            <AvatarImage alt={`${name}'s photo`} src={image} />
          ) : null}
          <AvatarFallback>
            {avatarEmoji || name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <cite className="font-bold text-xs sm:text-sm text-stone-900 not-italic leading-tight truncate">
            {name}
          </cite>
          <span className="text-[11px] text-stone-500 leading-tight truncate mt-0.5">
            {role} {company && `• ${company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default Reviews;
