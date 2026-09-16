import React, { useState } from 'react';
import { Sparkles, Check, RefreshCcw, Plus, Gift, Palette, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { orderCustomBouquetViaInstagram, openInstagramDM, INSTAGRAM_HANDLE } from '../lib/instagram';

// Set to false to hide the builder UI and guide customers to Instagram DM; set to true to unhide
const SHOW_INTERACTIVE_BUILDER = false;

const FLOWER_OPTIONS = [
  { id: 'tulips', name: 'Pastel Tulips (3 Stems)', price: 349, icon: '🌷', desc: 'Graceful folded petals' },
  { id: 'sunflowers', name: 'Bright Sunflowers (2 Stems)', price: 299, icon: '🌻', desc: 'Vibrant golden center' },
  { id: 'daisies', name: 'Little White Daisies (4 Stems)', price: 279, icon: '🌼', desc: 'Dainty & cheerful' },
  { id: 'roses', name: 'Velvet Roses (2 Stems)', price: 389, icon: '🌹', desc: 'Layered plush petals' },
  { id: 'lavender', name: 'Lavender & Baby Breath (3 Stems)', price: 259, icon: '🪻', desc: 'Fragrant look & feel' },
];

const COLOR_THEMES = [
  { id: 'blush-pink', name: 'Blush Rose & Cream', bg: 'bg-rose-200', border: 'border-rose-400' },
  { id: 'lavender-dream', name: 'Lilac & Lavender Whisper', bg: 'bg-purple-200', border: 'border-purple-400' },
  { id: 'sunshine-butter', name: 'Sunny Yellow & Vanilla', bg: 'bg-yellow-200', border: 'border-yellow-400' },
  { id: 'matcha-sage', name: 'Matcha Sage & White', bg: 'bg-emerald-200', border: 'border-emerald-400' },
  { id: 'custom-palette', name: 'Surprise Me / Custom Request', bg: 'bg-gradient-to-r from-pink-200 via-purple-200 to-yellow-200', border: 'border-studio-400' },
];

const WRAP_OPTIONS = [
  { id: 'korean-matte', name: 'Korean Matte Pink & Organza', desc: 'Trendy & aesthetic', price: 50 },
  { id: 'vintage-kraft', name: 'Vintage Kraft Paper & Twine', desc: 'Cozy rustic charm', price: 40 },
  { id: 'frosted-white', name: 'Frosted Cloud & Satin Bow', desc: 'Clean, modern elegance', price: 50 },
  { id: 'rigid-box', name: 'Deluxe Rigid Gift Box (Hamper)', desc: 'With shredded paper cushioning', price: 150 },
];

const ADDONS = [
  { id: 'hairclip', name: 'Handmade Floral Hair Clip', price: 120, icon: '🎀' },
  { id: 'keychain', name: 'Beaded Flower Keychain', price: 140, icon: '🔑' },
  { id: 'fairylights', name: 'Warm LED Fairy Lights (Battery)', price: 80, icon: '✨' },
  { id: 'custom-card', name: 'Handwritten Calligraphy Card', price: 40, icon: '💌' },
];

export default function Customizer({ onAddToCart, onNavigate }) {
  const [selectedFlowers, setSelectedFlowers] = useState(['tulips']);
  const [selectedTheme, setSelectedTheme] = useState('blush-pink');
  const [selectedWrap, setSelectedWrap] = useState('korean-matte');
  const [selectedAddons, setSelectedAddons] = useState(['custom-card']);
  const [recipientNote, setRecipientNote] = useState('Happy Birthday! Wishing you everlasting joy & smiles 🌸');

  // Calculate total price
  const flowersPrice = selectedFlowers.reduce((sum, fid) => {
    const item = FLOWER_OPTIONS.find((f) => f.id === fid);
    return sum + (item ? item.price : 0);
  }, 0);

  const wrapPrice = WRAP_OPTIONS.find((w) => w.id === selectedWrap)?.price || 0;

  const addonsPrice = selectedAddons.reduce((sum, aid) => {
    const item = ADDONS.find((a) => a.id === aid);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = flowersPrice + wrapPrice + addonsPrice;

  const toggleFlower = (id) => {
    if (selectedFlowers.includes(id)) {
      if (selectedFlowers.length > 1) {
        setSelectedFlowers(selectedFlowers.filter((f) => f !== id));
      }
    } else {
      setSelectedFlowers([...selectedFlowers, id]);
    }
  };

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const getThemeName = () => COLOR_THEMES.find((t) => t.id === selectedTheme)?.name || 'Custom';
  const getWrapName = () => WRAP_OPTIONS.find((w) => w.id === selectedWrap)?.name || 'Korean Matte';

  const handleInstagramOrder = () => {
    const flowerNames = selectedFlowers
      .map((fid) => FLOWER_OPTIONS.find((f) => f.id === fid)?.name)
      .join(', ');
    const addonNames = selectedAddons.length
      ? selectedAddons.map((aid) => ADDONS.find((a) => a.id === aid)?.name).join(', ')
      : 'None';

    orderCustomBouquetViaInstagram({
      flowerNames,
      themeName: getThemeName(),
      wrapName: getWrapName(),
      addonNames,
      recipientNote,
      totalPrice,
    });
  };

  const handleAddCustomToCart = () => {
    const flowerNames = selectedFlowers
      .map((fid) => FLOWER_OPTIONS.find((f) => f.id === fid)?.name)
      .join(' + ');

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom Bouquet: ${flowerNames}`,
      category: 'custom',
      categoryLabel: 'Custom Bouquet',
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
      description: `Theme: ${getThemeName()} | Wrap: ${getWrapName()} | Note: "${recipientNote}"`,
      customNote: recipientNote,
    };

    onAddToCart(customProduct);
  };

  return (
    <section id="customizer" className="py-16 sm:py-20 bg-gradient-to-b from-cream via-studio-50 to-cream relative scroll-mt-28 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-butter-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            Custom Bouquet Studio
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Build Your Own Custom Bouquet
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Handcrafted with love — tailored flower stems, custom color themes, and luxury packaging.
          </p>
        </div>

        {/* Custom Orders Instagram Notice (When interactive builder is hidden) */}
        {!SHOW_INTERACTIVE_BUILDER ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-8 sm:p-12 relative text-center">
              
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-rosebud-100 rounded-full blur-3xl opacity-70 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-studio-100 rounded-full blur-3xl opacity-70 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* Instagram Icon Badge */}
                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-pink-500/25 transform hover:scale-105 transition-transform">
                  <InstagramIcon className="w-10 h-10 text-white" />
                </div>

                {/* Announcement Copy */}
                <div className="space-y-3 max-w-xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rosebud-50 border border-rosebud-200 text-rosebud-800 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-rosebud-600" />
                    <span>Custom Orders via Instagram</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    Need a Custom Bouquet?
                  </h3>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    If you need any custom bouquets, special color combinations, or personalized gift hampers, please <strong>DM us directly through Instagram</strong>!
                  </p>
                </div>

                {/* What we can customize */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-3 text-left">
                  <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                    <span className="text-2xl mb-1.5 block">💐</span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">Custom Flower Stems</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Tulips, sunflowers, daisies, roses, or lavender in your dream colors.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                    <span className="text-2xl mb-1.5 block">💌</span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">Free Calligraphy Card</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Complimentary handwritten message card tailored for your occasion.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80">
                    <span className="text-2xl mb-1.5 block">🎁</span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">Aesthetic Packaging</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Korean matte paper, vintage kraft, fairy lights & rigid hamper boxes.</p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <button
                    onClick={() => openInstagramDM('Hi Little Gift Studio! 🌸 I would like to order a custom handmade bouquet / gift hamper.')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-102"
                  >
                    <InstagramIcon className="w-5 h-5 text-white" />
                    <span>DM Us on Instagram (@{INSTAGRAM_HANDLE})</span>
                  </button>

                  {onNavigate && (
                    <button
                      onClick={() => {
                        onNavigate('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Explore Ready Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-[12px] text-stone-400">
                  ⚡ Quick replies • Direct consultation with our creator • No advance payment to discuss ideas
                </p>

              </div>
            </div>
          </div>
        ) : (
          /* Studio Builder Grid (Preserved for future re-activation) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Configuration Controls (Left 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Pick Flowers */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-studio-100 text-studio-700 text-xs flex items-center justify-center font-sans font-bold">1</span>
                    Choose Flower Stems <span className="text-xs font-normal text-stone-500">(Pick one or combine)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {FLOWER_OPTIONS.map((flower) => {
                    const isSelected = selectedFlowers.includes(flower.id);
                    return (
                      <button
                        key={flower.id}
                        onClick={() => toggleFlower(flower.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-studio-500 bg-studio-50/70 shadow-sm ring-1 ring-studio-400'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{flower.icon}</span>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-stone-900">{flower.name}</p>
                            <p className="text-[11px] text-stone-500">{flower.desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-studio-700">+₹{flower.price}</span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-studio-600 text-white flex items-center justify-center text-[10px] ml-auto mt-1">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Color Palette */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-studio-100 text-studio-700 text-xs flex items-center justify-center font-sans font-bold">2</span>
                  Choose Color Palette Theme
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLOR_THEMES.map((theme) => {
                    const isSelected = selectedTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-studio-500 bg-studio-50/70 shadow-sm ring-1 ring-studio-400'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full ${theme.bg} border ${theme.border} shrink-0 shadow-inner`} />
                        <span className="text-xs font-semibold text-stone-800">{theme.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-studio-600 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Wrapping Style */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-studio-100 text-studio-700 text-xs flex items-center justify-center font-sans font-bold">3</span>
                  Select Wrapping & Packaging
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {WRAP_OPTIONS.map((wrap) => {
                    const isSelected = selectedWrap === wrap.id;
                    return (
                      <button
                        key={wrap.id}
                        onClick={() => setSelectedWrap(wrap.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-studio-500 bg-studio-50/70 shadow-sm ring-1 ring-studio-400'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                        }`}
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-stone-900">{wrap.name}</p>
                          <p className="text-[11px] text-stone-500">{wrap.desc}</p>
                        </div>
                        <span className="text-xs font-bold text-studio-700">+₹{wrap.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Add-On Cuties */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-studio-100 text-studio-700 text-xs flex items-center justify-center font-sans font-bold">4</span>
                  Cute Add-Ons & Extras
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-studio-500 bg-studio-50/70 shadow-sm ring-1 ring-studio-400'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{addon.icon}</span>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-stone-900">{addon.name}</p>
                            <span className="text-xs font-bold text-studio-700">+₹{addon.price}</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                          isSelected ? 'bg-studio-600 border-studio-600 text-white' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 5: Personal Note */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-studio-100 text-studio-700 text-xs flex items-center justify-center font-sans font-bold">5</span>
                  Handwritten Card Message (Complimentary)
                </h3>
                <textarea
                  rows={2}
                  value={recipientNote}
                  onChange={(e) => setRecipientNote(e.target.value)}
                  placeholder="Write your heartfelt message here..."
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-studio-500 focus:ring-2 focus:ring-studio-100"
                />
              </div>

            </div>

            {/* Right: Live Custom Creation Summary (5 cols) */}
            <div className="lg:col-span-5 sticky top-28 sm:top-32">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-soft space-y-5">
                
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-studio-600" />
                    <h3 className="font-serif text-lg font-bold text-stone-900">Your Custom Bouquet</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rosebud-100 text-rosebud-800 text-[10px] font-bold">
                    Handcrafted
                  </span>
                </div>

                {/* Visual Breakdown */}
                <div className="space-y-3 text-xs">
                  
                  <div>
                    <span className="text-stone-400 font-semibold block text-[11px] uppercase tracking-wider">Flower Stems:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedFlowers.map((fid) => {
                        const item = FLOWER_OPTIONS.find((f) => f.id === fid);
                        return (
                          <span key={fid} className="px-2.5 py-1 rounded-lg bg-studio-50 text-studio-800 font-medium">
                            {item?.icon} {item?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 font-semibold block text-[11px] uppercase tracking-wider">Color Theme:</span>
                      <span className="font-bold text-stone-800 mt-0.5 block">{getThemeName()}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-semibold block text-[11px] uppercase tracking-wider">Wrapping Paper:</span>
                      <span className="font-bold text-stone-800 mt-0.5 block">{getWrapName()}</span>
                    </div>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-stone-100">
                      <span className="text-stone-400 font-semibold block text-[11px] uppercase tracking-wider">Included Add-ons:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedAddons.map((aid) => {
                          const item = ADDONS.find((a) => a.id === aid);
                          return (
                            <span key={aid} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px]">
                              {item?.icon} {item?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {recipientNote && (
                    <div className="pt-2 border-t border-stone-100 bg-butter-50/60 p-2.5 rounded-xl border border-butter-200/60">
                      <span className="text-amber-800 font-bold block text-[11px] font-cursive">Included Handwritten Note:</span>
                      <p className="text-stone-700 italic text-xs mt-0.5 line-clamp-2">"{recipientNote}"</p>
                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-medium block">Total Estimate:</span>
                    <span className="text-2xl font-bold text-stone-900">₹{totalPrice}</span>
                  </div>
                  <span className="text-[11px] text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full font-semibold border border-pink-200">
                    Ready in 2-3 Days
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 space-y-2.5">
                  <button
                    onClick={handleInstagramOrder}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-101"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                    <span>Order Custom Set on Instagram DM</span>
                  </button>

                  <button
                    onClick={handleAddCustomToCart}
                    className="w-full py-3 px-4 rounded-2xl bg-studio-600 hover:bg-studio-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Creation to Cart</span>
                  </button>
                </div>

                <p className="text-center text-[11px] text-stone-400 mt-3">
                  No advance payment needed to discuss • Direct maker Instagram chat
                </p>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
