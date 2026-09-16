import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Play, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { getStoredInstagramPosts } from '../lib/instagramStore';

export default function InstagramFeed() {
  const [posts, setPosts] = useState(() => getStoredInstagramPosts());

  useEffect(() => {
    const handleUpdated = (e) => {
      if (e.detail) {
        setPosts(e.detail);
      } else {
        setPosts(getStoredInstagramPosts());
      }
    };

    window.addEventListener('lgs_instagram_posts_updated', handleUpdated);
    return () => window.removeEventListener('lgs_instagram_posts_updated', handleUpdated);
  }, []);
  return (
    <section className="py-14 sm:py-16 bg-white/70 border-t border-rosebud-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-1.5 shadow-xs">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Follow Our Journey</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              @little.gift.studio._ on Instagram
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Watch our behind-the-scenes reels, unboxing videos & real craft creations!
            </p>
          </div>

          <a
            href="https://instagram.com/little.gift.studio._"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs sm:text-sm font-semibold transition-all shadow-md hover:scale-105"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Visit @little.gift.studio._</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

        {/* Instagram Post Grid with Dynamic Thumbnails */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden bg-rosebud-50 block shadow-soft hover:shadow-card-hover border border-rosebud-200/80 transition-all duration-300"
            >
              {/* Actual Post Thumbnail */}
              <img
                src={post.img}
                alt="Little Gift Studio Instagram post"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Type Badge (Reel / Post) */}
              <div className="absolute top-3 right-3 z-10">
                <span className="p-1.5 rounded-full bg-stone-900/70 backdrop-blur-md text-white flex items-center justify-center text-[10px] shadow-sm">
                  {post.type === 'reel' ? <Play className="w-3 h-3 fill-white" /> : <Sparkles className="w-3 h-3 text-pink-300" />}
                </span>
              </div>

              {/* Dark Hover Overlay with Post Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    {post.likes} likes
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs line-clamp-2 text-stone-100 leading-snug">
                    {post.caption}
                  </p>
                  <span className="text-[11px] text-pink-300 font-bold flex items-center gap-1 pt-1">
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
