import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import FAQ from '../components/FAQ';

export default function ContactPage() {
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formMsg.trim()) return;

    const message = `🌸 *New Website Inquiry for Little Gift Studio*

👤 *Name:* ${formName}
📱 *Phone/Email:* ${formContact || 'Not provided'}
💬 *Message:* "${formMsg}"

_Looking forward to discussing custom gifts!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="py-2 space-y-10">
      
      {/* Contact Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rosebud-100/80 border border-rosebud-200/70 text-studio-700 text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-studio-500" />
            We’d Love to Hear From You
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Get in Touch with Our Maker
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Have questions about a custom bouquet, special deadline, color palette, or bulk order? Connect directly with us on Instagram or WhatsApp!
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* 1. Instagram Official Card */}
          <a
            href="https://instagram.com/little.gift.studio._"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border border-pink-200 shadow-soft hover:shadow-card-hover hover:scale-102 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 block mb-1">
                Official Instagram
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                @little.gift.studio._
              </h3>
              <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                Follow our daily flower making reels, sneak peeks, and drop a DM for quick custom orders!
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs font-bold text-pink-700">
              <span>Send Instagram DM</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </a>

          {/* 2. WhatsApp Direct Order Card */}
          <a
            href="https://wa.me/?text=Hi%20Little%20Gift%20Studio!%20I%20would%20love%20to%20inquire%20about%20a%20handmade%20gift%20%F0%9F%8C%B8"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 shadow-soft hover:shadow-card-hover hover:scale-102 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                Instant Chat & Order
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                WhatsApp Maker Chat
              </h3>
              <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                Direct one-on-one communication with the artist to discuss colors, ribbon styles, and card text.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Start WhatsApp Chat</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </a>

          {/* 3. Studio & Delivery Details Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-50 via-cream to-studio-50 border border-amber-200 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-studio-600 text-white flex items-center justify-center shadow-md mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-studio-700 block mb-1">
                Handmade Studio
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Pan-India Delivery
              </h3>
              <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                Home-based handmade studio shipping all bouquets in crush-proof rigid boxes with protective cushioning.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs text-stone-600">
              <span className="font-bold text-stone-800 block">⚡ Lead Time:</span>
              <span>Crafted in 2–3 days • Shipped nationwide</span>
            </div>
          </div>

        </div>

        {/* Quick Message Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-rosebud-200/90 shadow-soft relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💌</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Send a Direct Message
            </h2>
          </div>
          <p className="text-xs text-stone-500 mb-6">
            Fill out the details below and we will automatically open a pre-formatted chat on WhatsApp!
          </p>

          <form onSubmit={handleSendWhatsApp} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-xs text-stone-800 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-xs text-stone-800 block mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-xs text-stone-800 block mb-1">Your Message / Idea *</label>
              <textarea
                required
                rows={3}
                value={formMsg}
                onChange={(e) => setFormMsg(e.target.value)}
                placeholder="Tell us what you'd like to order, occasion date, or custom color requirements..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message via WhatsApp</span>
            </button>
          </form>

          {sent && (
            <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Message prepared! Opening WhatsApp chat...</span>
            </div>
          )}
        </div>

      </section>

      {/* Embedded FAQ Scroller in Contact Page */}
      <FAQ />

    </div>
  );
}
