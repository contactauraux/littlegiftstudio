import React from 'react';
import { Sparkles, Heart, MessageCircle, Mail, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-studio-500/40 shrink-0 bg-white/5">
                <img
                  src="/logo.png"
                  alt="Little Gift Studio Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight block">
                  Little Gift Studio
                </span>
                <span className="text-[11px] font-cursive text-studio-400">
                  made with love • everlasting blooms
                </span>
              </div>
            </div>
            
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              A cozy, home-based handmade studio crafting everlasting pipe cleaner bouquets, hair accessories, charms, and personalized hampers that never wilt.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 flex items-center justify-center text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#collection" className="hover:text-studio-400 transition-colors">All Products</a></li>
              <li><a href="#collection" className="hover:text-studio-400 transition-colors">Everlasting Bouquets</a></li>
              <li><a href="#customizer" className="hover:text-studio-400 transition-colors">Build Custom Bouquet</a></li>
              <li><a href="#craft-video" className="hover:text-studio-400 transition-colors">Behind the Craft</a></li>
              <li><a href="#occasions" className="hover:text-studio-400 transition-colors">Occasion Hampers</a></li>
            </ul>
          </div>

          {/* Care & Small Business */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Handmade Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>• Keep away from open moisture</li>
              <li>• Dust with a gentle dry brush</li>
              <li>• Chenille stems hold shape forever</li>
              <li>• 100% plastic-free floral stems</li>
              <li>• Made to order in 2–3 days</li>
            </ul>
          </div>

          {/* Contact / DM Orders */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Direct Orders
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: Instant DM Order</span>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <span>Instagram: @littlegiftstudio.in</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-studio-400 shrink-0" />
                <span>Home Studio • Shipping Pan-India</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Little Gift Studio. All rights reserved.</p>
          <p className="flex items-center gap-1 font-cursive text-sm text-stone-400">
            Crafted with <Heart className="w-3.5 h-3.5 fill-rosebud-500 text-rosebud-500 inline" /> for thoughtful gift-givers.
          </p>
        </div>

      </div>
    </footer>
  );
}
