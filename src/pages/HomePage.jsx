import React from 'react';
import Hero from '../components/Hero';
import NewArrivalsCarousel from '../components/NewArrivalsCarousel';
import CategoryVisualGrid from '../components/CategoryVisualGrid';
import ShopByBudget from '../components/ShopByBudget';
import CustomizerPromoBanner from '../components/CustomizerPromoBanner';
import ComparisonSection from '../components/ComparisonSection';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import InstagramFeed from '../components/InstagramFeed';
import RevealOnScroll from '../components/RevealOnScroll';

export default function HomePage({ products, onQuickView, onAddToCart, onNavigate }) {
  return (
    <div className="space-y-6">
      {/* 1. Hero Section (Top 4 Banners + Quick Picks Horizontal Deals Shelf) */}
      <Hero
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onNavigate={onNavigate}
      />

      {/* 2. New Arrivals Everlasting Stems Carousel (7 Stems & Bouquets) */}
      <RevealOnScroll>
        <NewArrivalsCarousel
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
          onNavigate={onNavigate}
        />
      </RevealOnScroll>

      {/* 3. Visual Category Tiles Grid */}
      <RevealOnScroll>
        <CategoryVisualGrid onNavigate={onNavigate} />
      </RevealOnScroll>

      {/* 3. Shop by Gifting Budget (Under ₹249, ₹499, ₹799, ₹1499) */}
      <RevealOnScroll>
        <ShopByBudget onNavigate={onNavigate} />
      </RevealOnScroll>

      {/* 4. Interactive Studio Builder Invitation Banner */}
      <RevealOnScroll>
        <CustomizerPromoBanner onNavigate={onNavigate} />
      </RevealOnScroll>

      {/* 5. Everlasting vs Fresh Flowers Comparison */}
      <RevealOnScroll>
        <ComparisonSection onNavigate={onNavigate} />
      </RevealOnScroll>

      {/* 6. Real Customer Reviews & Wall of Smiles */}
      <RevealOnScroll>
        <Reviews />
      </RevealOnScroll>

      {/* 7. Frequently Asked Questions */}
      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>

      {/* 8. Instagram Community Feed */}
      <RevealOnScroll>
        <InstagramFeed />
      </RevealOnScroll>
    </div>
  );
}
