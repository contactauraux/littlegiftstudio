const STORAGE_KEY = 'lgs_instagram_posts';

export const DEFAULT_INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    url: 'https://www.instagram.com/p/DcbeRSYD2hX/?img_index=1',
    img: '/media/insta-1.jpg',
    likes: 70,
    type: 'carousel',
    caption: 'Abha abhaaa handmade collection 🔥 #bhadrachalam #rakhi #trending',
  },
  {
    id: 'insta-2',
    url: 'https://www.instagram.com/p/DcfKHkkT1Xs/',
    img: '/media/insta-2.jpg',
    likes: 821,
    type: 'reel',
    caption: 'Special gift hampers – ₹149 | ₹299 | ₹799 & Hair clips starting from ₹40! ✨❤️',
  },
  {
    id: 'insta-3',
    url: 'https://www.instagram.com/p/DceMzVgD6vN/?img_index=1',
    img: '/media/insta-3.jpg',
    likes: 62,
    type: 'carousel',
    caption: 'Another range of our handmade gift collection ✨🥰 #gifting #trending',
  },
  {
    id: 'insta-4',
    url: 'https://www.instagram.com/p/DceHO9IDwAo/?img_index=1',
    img: '/media/Image-78971.jpg',
    likes: 88,
    type: 'carousel',
    caption: 'Handcrafted floral treasures & bespoke gift sets 🌸✨ #littlegiftstudio #handmade',
  },
];

export function getStoredInstagramPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INSTAGRAM_POSTS));
      return DEFAULT_INSTAGRAM_POSTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INSTAGRAM_POSTS;
  } catch (err) {
    console.error('Failed to get stored instagram posts:', err);
    return DEFAULT_INSTAGRAM_POSTS;
  }
}

function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('lgs_instagram_posts_updated', { detail: posts }));
  } catch (err) {
    console.error('Failed to save instagram posts:', err);
  }
}

export function addInstagramPost(postData) {
  const current = getStoredInstagramPosts();
  const newPost = {
    ...postData,
    id: postData.id || `insta-${Date.now().toString(36)}`,
  };
  const updated = [newPost, ...current];
  savePosts(updated);
  return newPost;
}

export function updateInstagramPost(id, updatedFields) {
  const current = getStoredInstagramPosts();
  const updated = current.map((p) => (String(p.id) === String(id) ? { ...p, ...updatedFields } : p));
  savePosts(updated);
  return updated;
}

export function deleteInstagramPost(id) {
  const current = getStoredInstagramPosts();
  const updated = current.filter((p) => String(p.id) !== String(id));
  savePosts(updated);
  return updated;
}

export function resetInstagramPostsToDefault() {
  savePosts(DEFAULT_INSTAGRAM_POSTS);
  return DEFAULT_INSTAGRAM_POSTS;
}
