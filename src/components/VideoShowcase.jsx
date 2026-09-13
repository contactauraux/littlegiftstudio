import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="craft-video" className="py-16 sm:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-studio-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-rosebud-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Reel / Video Player in Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-[2.5rem] bg-stone-950 p-3 border-4 border-stone-800 shadow-2xl overflow-hidden group">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-stone-950 mr-2" />
                <div className="w-8 h-1 rounded-full bg-stone-800" />
              </div>

              {/* Video Element */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-stone-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/media/intro-video.mp4"
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Video Overlay Play Button when Paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-stone-950/30"
                  >
                    <div className="w-16 h-16 rounded-full bg-studio-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 mt-3 tracking-wide">
                      Tap to Watch Process
                    </span>
                  </div>
                )}

                {/* Floating In-Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-stone-900/70 backdrop-blur-md text-white hover:bg-stone-800 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/70 backdrop-blur-md text-white text-[11px] font-medium">
                    <Sparkles className="w-3 h-3 text-studio-400 animate-pulse" />
                    <span>Little Gift Studio Reel</span>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-stone-900/70 backdrop-blur-md text-white hover:bg-stone-800 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right: Craft Story & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800 text-studio-300 text-xs font-semibold uppercase tracking-wider border border-stone-700">
              <Heart className="w-3.5 h-3.5 text-rosebud-400 fill-rosebud-400" />
              Behind The Scenes
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Watch Every Stem Come to Life by Hand
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              We believe a gift should carry the maker's care and love. Each petal is measured, twisted from plush chenille wire, carefully combined with soft green foliage, and wrapped in premium Korean waterproof paper.
            </p>

            {/* Craft Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl mb-1">🧶</div>
                <h4 className="font-serif text-base font-bold text-white">Ultra-Plush Chenille</h4>
                <p className="text-xs text-stone-400 mt-1">High density fuzzy stems that hold their curvature and never fray.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl mb-1">🎀</div>
                <h4 className="font-serif text-base font-bold text-white">Korean Aesthetic Wrapping</h4>
                <p className="text-xs text-stone-400 mt-1">Double-layer frosted paper, satin bows, and tailored gift tags.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl mb-1">⏳</div>
                <h4 className="font-serif text-base font-bold text-white">Forever Keepsake</h4>
                <p className="text-xs text-stone-400 mt-1">Sits pretty on desks, vanity tables, and bedside shelves for years.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                <div className="text-2xl mb-1">💌</div>
                <h4 className="font-serif text-base font-bold text-white">Custom Personalization</h4>
                <p className="text-xs text-stone-400 mt-1">Handwritten notes and custom color palettes for your loved ones.</p>
              </div>
            </div>

            {/* Instagram Link CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow Our Craft on Instagram</span>
              </a>
              <span className="text-xs text-stone-400 font-medium">
                Daily making videos & behind-the-scenes stories!
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
