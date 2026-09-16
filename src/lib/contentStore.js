// Content Store for Managing Reviews and FAQs

const REVIEWS_STORAGE_KEY = 'lgs_managed_reviews';
const FAQS_STORAGE_KEY = 'lgs_managed_faqs';

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    role: 'Bangalore',
    company: 'Pastel Tulip Bouquet',
    quote: "I ordered the pastel tulips for my sister's 21st birthday and she cried! Unlike real flowers that die in 3 days, these pipe cleaner tulips look so cute on her study desk forever.",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    name: 'Rohan Kapoor',
    role: 'Mumbai',
    company: 'Deluxe Celebration Hamper',
    quote: "The 'Forever Bloom' Hamper was the best anniversary surprise. The maker on Instagram was so helpful in customizing the ribbon to my girlfriend's favorite lilac shade. Safe packaging too!",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 'rev-3',
    name: 'Meera Patel',
    role: 'Pune',
    company: 'Daisy Blossom Hair Clips',
    quote: '10/10 quality! You can see so much love and patience in the craft. The daisy clips hold thick hair so well and everyone in college asked me where I got them from.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 'rev-4',
    name: 'Tanvi Mathur',
    role: 'Delhi',
    company: 'Sunshine Joy Sunflower Set',
    quote: 'The sunflowers are so vibrant! Sturdy, fuzzy, and arrived in a crush-proof rigid box with cute aesthetic stickers and a lovely handwritten vintage note.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 'rev-5',
    name: 'Sanya Roy',
    role: 'Kolkata',
    company: 'Custom Bouquet Studio',
    quote: 'I customized a bouquet with 3 tulips and 2 daisies for Friendship Day. The live customizer made it so effortless to order on Instagram DM. Super fast response!',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    id: 'rev-6',
    name: 'Aditya Verma',
    role: 'Hyderabad',
    company: 'Custom Initial Charm',
    quote: "Bought the initial floral keychain for my bestie's backpack. It's so tactile, lightweight, and hasn't shed or frayed at all after months of daily use.",
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    id: 'rev-7',
    name: 'Nikhil Joshi',
    role: 'Chennai',
    company: 'Bestie Celebration Box',
    quote: 'Aesthetic packaging, reasonable pricing, and 100% handmade feel. Far better than mass-produced gifts. Will definitely be a repeat buyer for every birthday!',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 month ago',
  },
  {
    id: 'rev-8',
    name: 'Pooja Hegde',
    role: 'Ahmedabad',
    company: 'Enchanted Lavender Bouquet',
    quote: 'The Korean wrap paper and fairy lights gave the entire bouquet such a magical cozy glow. My mom loved receiving everlasting flowers for Mother’s Day.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 month ago',
  },
  {
    id: 'rev-9',
    name: 'Karan Singhania',
    role: 'Jaipur',
    company: 'Single Blossom Pocket',
    quote: 'I appreciate the attention to detail. Every petal was perfectly curved, and the handwritten calligraphy note felt so warm and personal. Thank you Little Gift Studio!',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 month ago',
  }
];

export const INITIAL_FAQS = [
  {
    id: 'faq-1',
    icon: '🌷',
    question: 'How long do pipe cleaner flowers last?',
    answer: 'Forever! Unlike fresh flowers that wilt in 3-5 days, our handmade blooms are crafted from high-density chenille wire that keeps its shape, color, and plush texture for years.',
    category: 'Product & Craft'
  },
  {
    id: 'faq-2',
    icon: '🎨',
    question: 'Can I pick custom colors or flower types?',
    answer: 'Yes, absolutely! You can use our interactive "Build Custom Bouquet" page or message us on Instagram DM to choose your dream color palette, wrapping paper, and flower stems.',
    category: 'Customization'
  },
  {
    id: 'faq-3',
    icon: '⏳',
    question: 'How much time does it take to make and deliver?',
    answer: 'Every piece is 100% handcrafted in small batches. Orders are lovingly crafted in 2–3 days and delivered within 2–5 days depending on your city/pincode.',
    category: 'Shipping'
  },
  {
    id: 'faq-4',
    icon: '📦',
    question: 'Do you deliver pan-India safely?',
    answer: 'Yes! We ship across India. All bouquets and hampers are packaged in heavy-duty crush-proof rigid boxes with protective cushioning to ensure they arrive in perfect shape.',
    category: 'Shipping'
  },
  {
    id: 'faq-5',
    icon: '💌',
    question: 'Can I include a personal handwritten message?',
    answer: 'Yes! Every bouquet and hamper includes a complimentary handwritten vintage calligraphy gift card. You can write your custom message during checkout.',
    category: 'Customization'
  },
  {
    id: 'faq-6',
    icon: '✨',
    question: 'How do I clean and care for the flowers?',
    answer: 'Keep them in a dry indoor space away from direct moisture. To remove any dust over time, gently dust with a soft dry brush or blow with a hairdryer on cool/low.',
    category: 'Product & Craft'
  },
  {
    id: 'faq-7',
    icon: '🎀',
    question: 'Can I order bulk hampers for events & return gifts?',
    answer: 'Yes! We accept bulk hamper orders for birthdays, anniversaries, corporate events, and wedding return gifts with special discounted bundle pricing.',
    category: 'Orders'
  },
  {
    id: 'faq-8',
    icon: '💖',
    question: 'How do I place an order?',
    answer: 'You can add items to your Hamper Cart and order directly, or click the "Instant Instagram DM Order" button on any product to chat directly with our creator.',
    category: 'Orders'
  }
];

// ==================== REVIEWS CRUD ====================

export function getStoredReviews() {
  let combined = [];

  try {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        combined = parsed;
      }
    }

    // Check if there are user reviews from the frontend submission modal
    const userReviews = localStorage.getItem('lgs_user_reviews');
    if (userReviews) {
      const parsedUser = JSON.parse(userReviews);
      if (Array.isArray(parsedUser)) {
        parsedUser.forEach(ur => {
          if (!combined.some(r => r.quote === ur.quote && r.name === ur.name)) {
            combined.unshift({
              ...ur,
              id: ur.id || `user_rev_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`
            });
          }
        });
      }
    }
  } catch (err) {
    console.error('Error loading reviews:', err);
  }

  // If empty, initialize with all 9 initial reviews
  if (combined.length === 0) {
    combined = [...INITIAL_REVIEWS];
  } else {
    // Ensure all 9 initial reviews are present in combined list
    INITIAL_REVIEWS.forEach(initRev => {
      if (!combined.some(r => r.name === initRev.name || r.id === initRev.id)) {
        combined.push(initRev);
      }
    });
  }

  saveStoredReviews(combined);
  return combined;
}

export function saveStoredReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new CustomEvent('lgs_reviews_updated', { detail: reviews }));
  } catch (err) {
    console.error('Error saving reviews:', err);
  }
}

export function addReview(reviewData) {
  const current = getStoredReviews();
  const newRev = {
    ...reviewData,
    id: reviewData.id || `rev_${Date.now().toString(36)}`,
    date: reviewData.date || 'Just now',
    rating: Number(reviewData.rating) || 5,
    image: reviewData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };
  const updated = [newRev, ...current];
  saveStoredReviews(updated);
  return newRev;
}

export function updateReview(id, updatedFields) {
  const current = getStoredReviews();
  const index = current.findIndex(r => r.id === id);
  if (index === -1) throw new Error(`Review ${id} not found.`);

  const updatedRev = {
    ...current[index],
    ...updatedFields,
    rating: Number(updatedFields.rating) || current[index].rating,
  };
  const updated = [...current];
  updated[index] = updatedRev;
  saveStoredReviews(updated);
  return updatedRev;
}

export function deleteReview(id) {
  const current = getStoredReviews();
  const updated = current.filter(r => r.id !== id);
  saveStoredReviews(updated);
  return updated;
}

export function resetReviewsToDefault() {
  saveStoredReviews(INITIAL_REVIEWS);
  return INITIAL_REVIEWS;
}

// ==================== FAQS CRUD ====================

export function getStoredFaqs() {
  try {
    const saved = localStorage.getItem(FAQS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure any missing initial faqs are included
        INITIAL_FAQS.forEach(initFaq => {
          if (!parsed.some(f => f.id === initFaq.id || f.question === initFaq.question)) {
            parsed.push(initFaq);
          }
        });
        saveStoredFaqs(parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading faqs:', err);
  }
  saveStoredFaqs(INITIAL_FAQS);
  return INITIAL_FAQS;
}

export function saveStoredFaqs(faqs) {
  try {
    localStorage.setItem(FAQS_STORAGE_KEY, JSON.stringify(faqs));
    window.dispatchEvent(new CustomEvent('lgs_faqs_updated', { detail: faqs }));
  } catch (err) {
    console.error('Error saving faqs:', err);
  }
}

export function addFaq(faqData) {
  const current = getStoredFaqs();
  const newFaq = {
    ...faqData,
    id: faqData.id || `faq_${Date.now().toString(36)}`,
    icon: faqData.icon || '🌸',
    category: faqData.category || 'General'
  };
  const updated = [...current, newFaq];
  saveStoredFaqs(updated);
  return newFaq;
}

export function updateFaq(id, updatedFields) {
  const current = getStoredFaqs();
  const index = current.findIndex(f => f.id === id);
  if (index === -1) throw new Error(`FAQ ${id} not found.`);

  const updatedFaq = {
    ...current[index],
    ...updatedFields,
  };
  const updated = [...current];
  updated[index] = updatedFaq;
  saveStoredFaqs(updated);
  return updatedFaq;
}

export function deleteFaq(id) {
  const current = getStoredFaqs();
  const updated = current.filter(f => f.id !== id);
  saveStoredFaqs(updated);
  return updated;
}

export function resetFaqsToDefault() {
  saveStoredFaqs(INITIAL_FAQS);
  return INITIAL_FAQS;
}
