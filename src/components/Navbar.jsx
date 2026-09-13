import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Heart } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMotifHovered, setIsMotifHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const navRef = useRef(null);

  // Dedicated Pages
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Our Collections' },
    { id: 'custom', label: 'Build Custom Bouquet' },
    { id: 'contact', label: 'Contact Us' },
  ];

  // Scroll detection for navbar blur transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    setHoveredTab(null);
  };

  const handleLinkClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`pointer-events-auto max-w-7xl mx-auto relative rounded-[28px] sm:rounded-full transition-all duration-500 ease-out border ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-2xl border-white/80 shadow-[0_16px_40px_-8px_rgba(220,122,101,0.2),0_4px_18px_0_rgba(59,30,25,0.08)] py-2 sm:py-2.5 px-3.5 sm:px-6'
            : 'bg-white/70 backdrop-blur-md border-white/70 shadow-[0_10px_30px_-5px_rgba(235,160,165,0.18),0_2px_10px_0_rgba(74,40,32,0.04)] py-3 sm:py-3.5 px-4 sm:px-7'
        } group`}
        style={{
          boxShadow: isScrolled
            ? '0 16px 40px -8px rgba(220,122,101,0.22), 0 4px 18px 0 rgba(59,30,25,0.07), inset 0 1.5px 2px 0 rgba(255,255,255,0.95), inset 0 -1px 2px 0 rgba(235,160,165,0.15)'
            : '0 10px 32px -5px rgba(235,160,165,0.18), 0 2px 10px 0 rgba(74,40,32,0.04), inset 0 1.5px 2px 0 rgba(255,255,255,0.85), inset 0 -1px 2px 0 rgba(235,160,165,0.1)',
        }}
      >
        {/* Dynamic Glass Reflection Spotlight */}
        <div
          className="absolute inset-0 rounded-[28px] sm:rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 overflow-hidden"
          style={{
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.65), rgba(254, 226, 230, 0.35) 45%, transparent 80%)`,
          }}
        />

        {/* Inner Highlight Line */}
        <div className="absolute inset-x-8 top-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('home')}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              className="relative flex items-center gap-3 group/logo cursor-pointer select-none text-left"
            >
              {/* Glass Halo */}
              <div
                className={`absolute -inset-2 rounded-full bg-gradient-to-br from-rosebud-300/50 via-pink-200/40 to-amber-200/50 transition-all duration-500 pointer-events-none ${
                  isLogoHovered ? 'scale-125 opacity-100 filter blur-md' : 'scale-100 opacity-60 filter blur-sm'
                }`}
              />

              {/* Logo Circle */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md border-2 border-white/90 bg-rosebud-50 transition-transform duration-300 group-hover/logo:scale-105 shrink-0">
                <img
                  src="/logo.png"
                  alt="Little Gift Studio Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#3B1E19] group-hover/logo:text-[#c75b45] transition-colors leading-none flex items-center gap-1">
                  Little Gift Studio
                  <Sparkles className="w-3 h-3 text-studio-400 opacity-80" />
                </span>
                <span className="font-cursive text-xs text-[#c75b45] font-semibold tracking-wide mt-0.5">
                  made with love • everlasting blooms
                </span>
              </div>
            </button>
          </div>

          {/* DESKTOP NAVIGATION TABS */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/40 border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-sm relative">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const isHovered = hoveredTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => setHoveredTab(link.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 select-none ${
                    isActive
                      ? 'text-[#3B1E19] shadow-sm'
                      : 'text-stone-600 hover:text-[#c75b45]'
                  }`}
                >
                  {/* Active / Hover Background Pill */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rosebud-100/90 via-white to-rosebud-100/70 border border-rosebud-200/80 shadow-[0_2px_8px_rgba(220,122,101,0.15)] -z-10" />
                  )}

                  <span className="relative z-20 flex items-center gap-1.5">
                    {link.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c75b45] animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}

            {/* Signature Ribbon Detail */}
            <div className="mx-1 border-l border-rosebud-200/50 h-5 my-auto" />
            <div
              onMouseEnter={() => setIsMotifHovered(true)}
              onMouseLeave={() => setIsMotifHovered(false)}
              className="relative px-2.5 py-1 flex items-center justify-center cursor-pointer group/motif"
              title="Little Gift Studio Signature"
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full bg-rosebud-100/60 border border-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 ${
                  isMotifHovered ? 'scale-115 rotate-12 bg-rosebud-200/80 shadow-md ring-2 ring-rosebud-300/40' : 'animate-float-gentle'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-rosebud-400 text-rosebud-600" />
              </div>

              {isMotifHovered && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#3B1E19] text-white text-[10px] font-medium whitespace-nowrap shadow-lg animate-fadeIn pointer-events-none">
                  Handcrafted with ❤️
                </div>
              )}
            </div>
          </nav>

          {/* ACTION BUTTONS & SHOPPING CART */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct WhatsApp Order CTA */}
            <a
              href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20ordering%20a%20handmade%20gift%20%F0%9F%8C%B8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 backdrop-blur-sm text-xs font-semibold shadow-sm hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>WhatsApp Order</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white/80 hover:bg-rosebud-100/80 text-[#3B1E19] border border-white/90 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group/cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#3B1E19] group-hover/cart:text-[#c75b45] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rosebud-500 to-[#c75b45] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/80 hover:bg-rosebud-100/80 text-[#3B1E19] border border-white/80 transition-all shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_40px_rgba(220,122,101,0.25)] p-5 animate-fadeIn transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all text-left w-full ${
                    isActive
                      ? 'bg-rosebud-100/80 text-[#3B1E19] border border-rosebud-200/60 shadow-sm'
                      : 'text-stone-700 hover:bg-rosebud-50/60 hover:text-[#c75b45]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Heart className="w-3.5 h-3.5 fill-rosebud-400 text-rosebud-500" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-rosebud-100 flex flex-col gap-2">
              <a
                href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20ordering%20a%20handmade%20gift%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all"
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
