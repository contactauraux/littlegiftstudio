import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop Collection', href: '#collection' },
    { label: 'Build Your Bouquet', href: '#customizer' },
    { label: 'Behind the Craft', href: '#craft-video' },
    { label: 'Occasions', href: '#occasions' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm py-2.5 border-b border-studio-100'
          : 'bg-cream/80 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm border border-rosebud-200/80 group-hover:scale-105 transition-transform bg-rosebud-50 shrink-0">
            <img
              src="/logo.png"
              alt="Little Gift Studio Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-studio-600 transition-colors flex items-center gap-1.5">
              Little Gift Studio
              <Sparkles className="w-3.5 h-3.5 text-studio-400 inline" />
            </span>
            <span className="block text-[11px] font-cursive text-studio-600 font-semibold tracking-wider -mt-1">
              made with love • everlasting blooms
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-studio-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-studio-500 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Direct WhatsApp Order CTA */}
          <a
            href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20ordering%20a%20handmade%20gift%20%F0%9F%8C%B8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium border border-emerald-200 hover:bg-emerald-100 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Order via</span> WhatsApp
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-studio-100/80 hover:bg-studio-200 text-studio-800 transition-colors shadow-sm"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-studio-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-studio-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-studio-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream/98 border-b border-studio-100 px-6 py-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 font-medium py-1.5 border-b border-studio-50 hover:text-studio-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20ordering%20a%20handmade%20gift%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700"
              >
                <MessageCircle className="w-4 h-4" />
                Chat / Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
