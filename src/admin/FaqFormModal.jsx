import React, { useState } from 'react';
import { X, HelpCircle, Check, Sparkles } from 'lucide-react';

const EMOJI_OPTIONS = ['🌷', '🌸', '🎨', '⏳', '📦', '💌', '✨', '🎀', '💖', '💐', '🚚', '💬', '🎁', '⭐', '🌻', '🌿'];
const CATEGORY_OPTIONS = ['General', 'Product & Craft', 'Customization', 'Shipping', 'Orders', 'Care'];

export default function FaqFormModal({ faq, onClose, onSave }) {
  const isEditing = Boolean(faq && faq.id);

  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [icon, setIcon] = useState(faq?.icon || '🌷');
  const [category, setCategory] = useState(faq?.category || 'General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    onSave({
      id: isEditing ? faq.id : `faq_${Date.now().toString(36)}`,
      question: question.trim(),
      answer: answer.trim(),
      icon,
      category
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 my-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-studio-100 text-studio-600 flex items-center justify-center text-xl">
            {icon}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {isEditing ? 'Edit FAQ Item' : 'Add New FAQ Question'}
            </h3>
            <p className="text-xs text-stone-500">
              Update answers to common questions on the FAQs page
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Icon / Emoji Selector */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">
              Topic Icon Emoji
            </label>
            <div className="flex flex-wrap gap-2 p-2.5 rounded-2xl bg-stone-50 border border-stone-200">
              {EMOJI_OPTIONS.map(em => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setIcon(em)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                    icon === em
                      ? 'bg-studio-600 text-white shadow-sm ring-2 ring-studio-300 scale-110'
                      : 'hover:bg-stone-200 bg-white border border-stone-200'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              FAQ Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-studio-500"
            >
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Question */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How long do pipe cleaner flowers last?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Detailed Answer *
            </label>
            <textarea
              required
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write the clear, friendly explanation for customers..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-stone-50/50 leading-relaxed"
            />
          </div>

          {/* Footer Buttons */}
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
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-semibold shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save FAQ' : 'Publish FAQ'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
