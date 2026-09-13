import React from 'react';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';

const INSTA_POSTS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    likes: 342,
    caption: 'Packing today’s batch of pastel tulips 🌷✨ Which color is your favourite?',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
    likes: 512,
    caption: 'Bright sunshine smiles! 🌻 Hand-twisted chenille petals made to order.',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    likes: 428,
    caption: 'The deluxe celebration hamper in all its glory 🎀 Fairy lights + handwritten notes.',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    likes: 289,
    caption: 'New fluffy hair clips and bag charms just dropped! 🍓🌼',
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-white border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-1">
              <InstagramIcon className="w-3.5 h-3.5" />
              Follow Our Journey
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              @littlegiftstudio.in on Instagram
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Tag us in your unboxing reels & photos to be featured!
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>Visit Instagram Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 block shadow-sm border border-stone-100"
            >
              <img
                src={post.img}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    18
                  </span>
                </div>
                <p className="text-[11px] line-clamp-2 text-stone-200">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
