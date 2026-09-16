import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, Check } from 'lucide-react';

export default function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('Little Gift Studio PWA installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    } else {
      console.log('User dismissed the PWA install prompt');
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable || isInstalled || dismissed) {
    return null;
  }

  return (
    <aside aria-label="Install web application" className="fixed bottom-4 right-4 z-40 max-w-sm animate-slideUp">
      <div className="bg-white/95 backdrop-blur-xl border border-rosebud-200/90 rounded-3xl p-4 shadow-[0_12px_35px_-6px_rgba(220,122,101,0.25)] flex items-center gap-3">
        
        {/* App Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-rosebud-600 p-0.5 shrink-0 shadow-md">
          <img
            src="/logo.png"
            alt="Little Gift Studio App Icon"
            className="w-full h-full object-cover rounded-[14px]"
          />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif font-bold text-stone-900 text-xs sm:text-sm truncate">
              Install Little Gift Studio
            </h4>
            <span className="px-1.5 py-0.2 rounded bg-pink-100 text-pink-700 text-[9px] font-extrabold uppercase">
              App
            </span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            Install on Chrome for quick access & fast ordering!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rosebud-600 hover:opacity-95 text-white font-bold text-xs shadow-sm flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            title="Install App"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </aside>
  );
}
