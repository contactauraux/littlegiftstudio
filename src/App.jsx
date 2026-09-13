import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import IntroVideoScreen from './components/IntroVideoScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCatalog from './components/ProductCatalog';
import Customizer from './components/Customizer';
import VideoShowcase from './components/VideoShowcase';
import Occasions from './components/Occasions';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [products] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lgs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    try {
      localStorage.setItem('lgs_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  const handleAddToCart = (product, quantity = 1, selectedColor = '', customNote = '') => {
    const colorKey = selectedColor || (product.colors ? product.colors[0] : '');
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedColor === colorKey
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (customNote) updated[existingIdx].customNote = customNote;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            selectedColor: colorKey,
            customNote,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to your hamper! 🌸`);
  };

  const handleUpdateQuantity = (id, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, color) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedColor === color))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectWhatsApp = (
    product,
    selectedColor = '',
    customNote = '',
    qty = 1
  ) => {
    const colorText = selectedColor ? ` (Color: ${selectedColor})` : '';
    const noteText = customNote ? `\n💌 *Note:* "${customNote}"` : '';
    const message = `🌸 *Hi Little Gift Studio!*

I would like to order:
*${product.name}* (Qty: ${qty})${colorText}
💰 *Price:* ₹${product.price * qty}${noteText}

_Please confirm availability and delivery timeline!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleSelectOccasion = (occasionTitle) => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Showing hampers & gifts for ${occasionTitle} ✨`);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream text-stone-800 relative">
      
      {/* 0. Fullscreen Entrance Video Overlay */}
      {showIntro && (
        <IntroVideoScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* 1. Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area (Single Homepage) */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => {}}
          onCustomizerClick={() => {}}
        />

        {/* 3. Craft Value Props / Features */}
        <Features />

        {/* 4. Product Catalog & Filter */}
        <ProductCatalog
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onDirectWhatsApp={(p) => handleDirectWhatsApp(p)}
        />

        {/* 5. Interactive Customizer / Build-A-Bouquet */}
        <Customizer onAddToCart={handleAddToCart} />

        {/* 6. Video Showcase: Behind The Craft (intro-video.mp4) */}
        <VideoShowcase />

        {/* 7. Occasions & Gifting Goals */}
        <Occasions onSelectOccasion={handleSelectOccasion} />

        {/* 8. How It Works */}
        <HowItWorks />

        {/* 9. Reviews & Testimonials */}
        <Reviews />

        {/* 10. Frequently Asked Questions */}
        <FAQ />

        {/* 11. Instagram Feed / Social Proof */}
        <InstagramFeed />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20have%20a%20question%20about%20your%20handmade%20gifts%20%F0%9F%8C%B8"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-semibold pr-1">
          Chat with Us
        </span>
      </a>

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={handleDirectWhatsApp}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Notification Toast */}
      <Toast message={toast.message} show={toast.show} />

    </div>
  );
}
