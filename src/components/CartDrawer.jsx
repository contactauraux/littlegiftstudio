import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Heart, Gift, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { orderCartViaInstagram } from '../lib/instagram';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [globalGiftNote, setGlobalGiftNote] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutInstagram = () => {
    if (items.length === 0) return;

    orderCartViaInstagram(items, subtotal, deliveryPincode, globalGiftNote);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 4500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-cream">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-studio-600" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Your Gift Hamper ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            
            {copiedToast && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 text-pink-900 text-xs flex items-center gap-2.5 animate-fadeIn shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                <span>
                  Hamper details copied! Opening Instagram DM with <strong>@little.gift.studio._</strong>. Simply paste (Ctrl+V) to send!
                </span>
              </div>
            )}

            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-studio-50 flex items-center justify-center mx-auto mb-3 text-3xl">
                  🌸
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your hamper is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Add everlasting bouquets, cute clips, or custom items to start curating your gift.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-full bg-studio-600 text-white text-xs font-semibold hover:bg-studio-700 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor || ''}`}
                  className="p-3.5 rounded-2xl bg-craftcard/60 border border-stone-200/80 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                    
                    {item.selectedColor && (
                      <span className="inline-block text-[10px] text-studio-700 bg-studio-100 px-2 py-0.5 rounded-md font-medium mt-0.5">
                        {item.selectedColor}
                      </span>
                    )}

                    {item.customNote && (
                      <p className="text-[10px] text-stone-500 italic truncate mt-0.5">
                        "{item.customNote}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedColor)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Extra order options */}
            {items.length > 0 && (
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    📍 Delivery Pincode / City:
                  </label>
                  <input
                    type="text"
                    value={deliveryPincode}
                    onChange={(e) => setDeliveryPincode(e.target.value)}
                    placeholder="e.g. 560001 (Bangalore)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 block mb-1">
                    💌 Gift Message for Hamper:
                  </label>
                  <textarea
                    rows={2}
                    value={globalGiftNote}
                    onChange={(e) => setGlobalGiftNote(e.target.value)}
                    placeholder="Special instructions or card text..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-studio-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer & Instagram Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-100 bg-cream space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-pink-700">
                  <span>Complimentary Gift Box & Card</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-base text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutInstagram}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-101"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Complete Order on Instagram DM</span>
              </button>

              <p className="text-center text-[10px] text-stone-400">
                You will review and confirm all colors & addresses directly with our maker on Instagram DM before payment.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
