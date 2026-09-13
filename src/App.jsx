import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import IntroVideoScreen from './components/IntroVideoScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import { MessageCircle } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CustomStudioPage from './pages/CustomStudioPage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
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

  // Sync with URL hash for back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'shop', 'custom', 'contact', 'reviews', 'faqs'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream text-stone-800 relative selection:bg-rosebud-200">
      
      {/* 0. Fullscreen Entrance Video Overlay */}
      {showIntro && (
        <IntroVideoScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* 1. Top Unified Glassmorphism Navbar (Shared across all pages) */}
      {!showIntro && (
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main Content Area (Multi-page views with same navbar) */}
      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onDirectWhatsApp={handleDirectWhatsApp}
          />
        )}

        {currentPage === 'custom' && (
          <CustomStudioPage
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'reviews' && (
          <ReviewsPage />
        )}

        {currentPage === 'faqs' && (
          <FaqPage />
        )}
      </main>

      {/* Shared Footer across all pages */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick View Product Modal (Shared) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={handleDirectWhatsApp}
      />

      {/* Slide-over Shopping Cart Drawer (Shared) */}
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
