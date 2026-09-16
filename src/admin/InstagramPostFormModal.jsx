import React, { useState } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Check, Heart, Play, ExternalLink } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';
import { InstagramIcon } from '../components/Icons';

const POST_TYPES = [
  { id: 'reel', label: '🎬 Instagram Reel (Video)', icon: Play },
  { id: 'carousel', label: '📸 Photo Carousel', icon: Sparkles },
  { id: 'post', label: '📷 Single Photo Post', icon: ImageIcon },
];

export default function InstagramPostFormModal({ post, onClose, onSave }) {
  const isEditing = Boolean(post && post.id);

  const [url, setUrl] = useState(post?.url || 'https://www.instagram.com/little.gift.studio._/');
  const [img, setImg] = useState(
    post?.img || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80'
  );
  const [likes, setLikes] = useState(post?.likes ?? 120);
  const [type, setType] = useState(post?.type || 'reel');
  const [caption, setCaption] = useState(
    post?.caption || 'Handcrafted floral bouquet made with love 🌸✨ #littlegiftstudio #handmade'
  );

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');
    try {
      const res = await uploadToCloudinary(file, 'littlegiftstudio/instagram');
      setImg(res.url);
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload image to Cloudinary.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!img.trim()) return;

    onSave({
      id: isEditing ? post.id : ('insta-' + Date.now().toString(36)),
      url: url.trim() || 'https://instagram.com/little.gift.studio._',
      img: img.trim(),
      likes: Number(likes) || 0,
      type,
      caption: caption.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {isEditing ? 'Edit Instagram Feed Post' : 'Add New Instagram Post / Reel'}
            </h3>
            <p className="text-xs text-stone-500">
              Manage the post thumbnail, caption, likes, and direct Instagram post link
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          
          {/* Live Preview of Post Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Storefront Grid Card Preview
            </span>
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-rosebud-50 border border-rosebud-200 shadow-sm shrink-0 group">
                <img src={img} alt="Preview thumbnail" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 p-1 rounded-full bg-stone-900/70 text-white text-[9px]">
                  {type === 'reel' ? <Play className="w-2.5 h-2.5 fill-white" /> : <Sparkles className="w-2.5 h-2.5 text-pink-300" />}
                </div>
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-bold flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                  <span>{likes}</span>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 text-[10px] font-bold uppercase">
                  {type}
                </span>
                <p className="font-medium text-stone-800 line-clamp-2 italic">
                  "{caption || 'Caption text...'}"
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline text-[11px] font-semibold flex items-center gap-1 pt-1"
                >
                  <span>{url ? url.replace('https://www.instagram.com/', '@') : 'No link set'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Thumbnail Image Upload */}
          <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-stone-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-pink-600" />
                <span>Post Thumbnail Image *</span>
              </label>
              <span className="text-[11px] text-stone-500">Square 1:1 or vertical ratio</span>
            </div>

            {uploadError && (
              <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                {uploadError}
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shrink-0 shadow-sm">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Uploading to Cloudinary...' : 'Upload Thumbnail'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
              <input
                type="url"
                required
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Or paste direct image URL (https://...)"
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs"
              />
            </div>
          </div>

          {/* Post URL & Post Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Instagram Link (URL) *
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/p/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-stone-50/50 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Post Format Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-stone-50/50 text-xs font-semibold"
              >
                {POST_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Likes & Caption */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Likes Count</span>
              </label>
              <input
                type="number"
                min="0"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                placeholder="820"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-stone-50/50 text-xs font-bold text-stone-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">
                Caption / Description Snippet *
              </label>
              <textarea
                required
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Special handmade flower hampers for anniversary..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-stone-50/50 text-xs"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rosebud-600 hover:opacity-95 text-white font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Post Changes' : 'Publish Instagram Post'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
