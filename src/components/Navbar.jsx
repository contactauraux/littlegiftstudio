import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles, Heart } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMotifHovered, setIsMotifHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const navRef = useRef(null);

  // Navigation Items requested in prompt
  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Shop', href: '#collection' },
    { label: 'Collections', href: '#customizer' },
    { label: 'About', href: '#craft-video' },
    { label: 'Contact', href: '#faqs' },
  ];

  // Scroll detection for navbar opacity, height & blur transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Scrollspy to keep active nav item accurate
      const scrollPosition = window.scrollY + 200;
      if (scrollPosition < 500) {
        setActiveTab('Home');
      } else {
        const sections = [
          { id: 'collection', label: 'Shop' },
          { id: 'customizer', label: 'Collections' },
          { id: 'craft-video', label: 'About' },
          { id: 'faqs', label: 'Contact' },
        ];
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveTab(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse coordinates over the navbar for dynamic glass reflection/refraction
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

  // Determine current active or hovered item index for sliding glass pill
  const currentDisplayedTab = hoveredTab !== null ? hoveredTab : activeTab;

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`pointer-events-auto max-w-7xl mx-auto relative rounded-[28px] sm:rounded-full transition-all duration-500 ease-out border ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl border-white/70 shadow-[0_16px_40px_-8px_rgba(220,122,101,0.2),0_4px_18px_0_rgba(59,30,25,0.08)] py-2 sm:py-2.5 px-3.5 sm:px-6'
            : 'bg-white/60 backdrop-blur-md border-white/60 shadow-[0_10px_30px_-5px_rgba(235,160,165,0.18),0_2px_10px_0_rgba(74,40,32,0.04)] py-3 sm:py-3.5 px-4 sm:px-7'
        } group`}
        style={{
          boxShadow: isScrolled
            ? '0 16px 40px -8px rgba(220,122,101,0.22), 0 4px 18px 0 rgba(59,30,25,0.07), inset 0 1.5px 2px 0 rgba(255,255,255,0.95), inset 0 -1px 2px 0 rgba(235,160,165,0.15)'
            : '0 10px 32px -5px rgba(235,160,165,0.18), 0 2px 10px 0 rgba(74,40,32,0.04), inset 0 1.5px 2px 0 rgba(255,255,255,0.85), inset 0 -1px 2px 0 rgba(235,160,165,0.1)',
        }}
      >
        {/* Dynamic Glass Reflection Spotlight tracking user cursor */}
        <div
          className="absolute inset-0 rounded-[28px] sm:rounded-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 overflow-hidden"
          style={{
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.65), rgba(254, 226, 230, 0.35) 45%, transparent 80%)`,
          }}
        />

        {/* Delicate Glass Inner Highlight Line */}
        <div className="absolute inset-x-8 top-0 h-[1.2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

        {/* Ambient Subtle Pink Glass Shimmer overlay */}
        <div className="absolute inset-0 rounded-[28px] sm:rounded-full bg-gradient-to-r from-rosebud-100/10 via-transparent to-rosebud-100/15 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              className="relative flex items-center gap-3 group/logo cursor-pointer select-none"
            >
              {/* Glass Halo behind logo */}
              <div
                className={`absolute -inset-2 rounded-full bg-gradient-to-br from-rosebud-300/50 via-pink-200/40 to-amber-200/50 transition-all duration-500 animate-halo-pulse pointer-events-none ${
                  isLogoHovered ? 'scale-125 opacity-100 filter blur-md' : 'scale-100 opacity-60 filter blur-sm'
                }`}
              />

              {/* Hand-drawn Floating Particles (Hearts & Flowers) on Hover */}
              {isLogoHovered && (
                <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
                  {/* Floating Heart 1 */}
                  <span className="absolute top-0 left-1 text-rosebud-400 animate-heart-1">
                    <svg className="w-3.5 h-3.5 fill-rosebud-300 stroke-rosebud-500 stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                  {/* Floating Heart 2 */}
                  <span className="absolute top-1 right-1 text-pink-400 animate-heart-2">
                    <svg className="w-3 h-3 fill-pink-200 stroke-pink-400 stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </span>
                  {/* Floating Flower Particle 1 */}
                  <span className="absolute -bottom-1 left-2 text-rose-300 animate-flower-1">
                    <svg className="w-3.5 h-3.5 fill-rosebud-200 stroke-rosebud-400 stroke-[1.5]" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 4a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm0 8a3 3 0 0 0 0 6 3 3 0 0 0 0-6zm-4-4a3 3 0 0 0-6 0 3 3 0 0 0 6 0zm8 0a3 3 0 0 0 6 0 3 3 0 0 0-6 0z" />
                    </svg>
                  </span>
                  {/* Floating Flower Particle 2 */}
                  <span className="absolute -bottom-1 right-2 text-amber-300 animate-flower-2">
                    <svg className="w-3 h-3 fill-amber-100 stroke-amber-400 stroke-[1.5]" viewBox="0 0 24 24">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </span>
                </div>
              )}

              {/* Exact Unmodified Brand Logo Container */}
              <div
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm border border-white/90 transition-all duration-300 bg-rosebud-50/80 shrink-0 ${
                  isLogoHovered ? 'scale-108 shadow-md border-rosebud-200 ring-2 ring-rosebud-300/40' : ''
                }`}
              >
                <img
                  src="/logo.png"
                  alt="Little Gift Studio Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand Typography (Dark Chocolate Brown) */}
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#3B1E19] group-hover/logo:text-[#c75b45] transition-colors flex items-center gap-1">
                  Little Gift Studio
                  <Sparkles className={`w-3.5 h-3.5 text-rosebud-400 inline-block transition-transform duration-300 ${isLogoHovered ? 'rotate-12 scale-125 text-rosebud-500' : ''}`} />
                </span>
                <span className="text-[10px] sm:text-[11px] font-cursive text-[#c75b45] font-semibold tracking-wider -mt-1 leading-tight">
                  made with love • everlasting blooms
                </span>
              </div>
            </a>
          </div>

          {/* DESKTOP NAVIGATION ITEMS WITH SLIDING ACTIVE GLASS PILL & MAGNETIC HOVER */}
          <nav className="hidden lg:flex items-center relative rounded-full p-1 bg-white/30 border border-white/40 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              const isDisplayed = currentDisplayedTab === link.label;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveTab(link.label)}
                  onMouseEnter={() => setHoveredTab(link.label)}
                  className="relative z-10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ease-out select-none flex items-center justify-center"
                  style={{
                    color: isDisplayed ? '#3B1E19' : '#5A3831',
                    transform: isDisplayed ? 'translateY(-1px)' : 'none',
                  }}
                >
                  {/* Small Translucent Blush-Pink Glass Pill behind active/hovered link */}
                  {isDisplayed && (
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-rosebud-100/90 via-rosebud-200/70 to-studio-100/90 backdrop-blur-sm border border-white/80 shadow-[0_2px_12px_rgba(220,122,101,0.22),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 ease-out pointer-events-none"
                    />
                  )}

                  <span className="relative z-20 flex items-center gap-1">
                    {link.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c75b45] animate-pulse ml-0.5" />
                    )}
                  </span>
                </a>
              );
            })}

            {/* UNIQUE BRAND DETAIL: Hand-drawn Heart / Flower Motif Integrated Ribbon Detail */}
            <div className="mx-1 border-l border-rosebud-200/50 h-5 my-auto" />
            <div
              onMouseEnter={() => setIsMotifHovered(true)}
              onMouseLeave={() => setIsMotifHovered(false)}
              className="relative px-2.5 py-1 flex items-center justify-center cursor-pointer group/motif"
              title="Little Gift Studio Signature Interaction"
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full bg-rosebud-100/60 border border-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 ${
                  isMotifHovered ? 'scale-115 rotate-12 bg-rosebud-200/80 shadow-md ring-2 ring-rosebud-300/40' : 'animate-float-gentle'
                }`}
              >
                <svg
                  className="w-4 h-4 stroke-[#c75b45] fill-rosebud-200/50 stroke-[1.8] transition-all duration-300"
                  viewBox="0 0 24 24"
                >
                  {/* Hand-drawn Flower & Heart Ribbon SVG */}
                  <path
                    className={isMotifHovered ? 'stroke-draw-path' : ''}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                  <path
                    d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                    className="fill-amber-300 stroke-amber-500"
                  />
                </svg>
              </div>

              {/* Signature Motif Floating Tooltip / Badge */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#3B1E19] text-white text-[10px] font-medium whitespace-nowrap shadow-lg transition-all duration-300 pointer-events-none ${
                  isMotifHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                }`}
              >
                Handcrafted with ❤️
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#3B1E19]" />
              </div>
            </div>
          </nav>

          {/* ACTION BUTTONS & SHOPPING CART */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct WhatsApp Order CTA in Translucent Emerald/Blush Glass */}
            <a
              href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20ordering%20a%20handmade%20gift%20%F0%9F%8C%B8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50/70 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/80 backdrop-blur-sm text-xs font-semibold shadow-sm hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>WhatsApp Order</span>
            </a>

            {/* Shopping Cart Trigger in Floating Glass Bubble */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white/70 hover:bg-rosebud-100/70 text-[#3B1E19] border border-white/90 transition-all duration-200 shadow-sm hover:scale-108 active:scale-95 group/cart"
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
              className="lg:hidden p-2.5 rounded-full bg-white/70 hover:bg-rosebud-100/70 text-[#3B1E19] border border-white/80 transition-all shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE FLOATING GLASS DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto mt-2 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_40px_rgba(220,122,101,0.25)] p-5 animate-fadeIn transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-rosebud-100/80 text-[#3B1E19] border border-rosebud-200/60 shadow-sm'
                      : 'text-stone-700 hover:bg-rosebud-50/60 hover:text-[#c75b45]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Heart className="w-3.5 h-3.5 fill-rosebud-400 text-rosebud-500" />}
                </a>
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
