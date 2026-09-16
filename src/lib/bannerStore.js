// Banner Store for Hero Horizontal Carousel right below the Navbar
import { HERO_BANNERS as INITIAL_BANNERS } from '../data/heroBanners';

const BANNERS_STORAGE_KEY = 'lgs_managed_banners';

const THEME_CLASSES = {
  rose: {
    bgClass: 'bg-gradient-to-r from-rose-50 via-rose-100/60 to-rose-50 border-rose-200',
    btnClass: 'bg-rose-600 hover:bg-rose-700 text-white'
  },
  purple: {
    bgClass: 'bg-gradient-to-r from-purple-50 via-purple-100/60 to-purple-50 border-purple-200',
    btnClass: 'bg-purple-600 hover:bg-purple-700 text-white'
  },
  amber: {
    bgClass: 'bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border-amber-200',
    btnClass: 'bg-amber-600 hover:bg-amber-700 text-white'
  },
  emerald: {
    bgClass: 'bg-gradient-to-r from-emerald-50 via-emerald-100/60 to-emerald-50 border-emerald-200',
    btnClass: 'bg-emerald-700 hover:bg-emerald-800 text-white'
  },
  sky: {
    bgClass: 'bg-gradient-to-r from-sky-50 via-sky-100/60 to-sky-50 border-sky-200',
    btnClass: 'bg-sky-600 hover:bg-sky-700 text-white'
  }
};

export function getStoredBanners() {
  try {
    const saved = localStorage.getItem(BANNERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading hero banners:', err);
  }
  saveStoredBanners(INITIAL_BANNERS);
  return INITIAL_BANNERS;
}

export function saveStoredBanners(banners) {
  try {
    localStorage.setItem(BANNERS_STORAGE_KEY, JSON.stringify(banners));
    window.dispatchEvent(new CustomEvent('lgs_banners_updated', { detail: banners }));
  } catch (err) {
    console.error('Error saving hero banners:', err);
  }
}

export function addBanner(bannerData) {
  const current = getStoredBanners();
  const theme = bannerData.theme || 'rose';
  const themeStyles = THEME_CLASSES[theme] || THEME_CLASSES.rose;

  const newBanner = {
    ...bannerData,
    id: bannerData.id || `banner_${Date.now().toString(36)}`,
    theme,
    bgClass: themeStyles.bgClass,
    btnClass: themeStyles.btnClass,
    image: bannerData.image || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80',
    cta: bannerData.cta || 'Shop Now',
    link: bannerData.link || '#collection'
  };

  const updated = [...current, newBanner];
  saveStoredBanners(updated);
  return newBanner;
}

export function updateBanner(id, updatedFields) {
  const current = getStoredBanners();
  const index = current.findIndex(b => b.id === id);
  if (index === -1) throw new Error(`Banner ${id} not found.`);

  const theme = updatedFields.theme || current[index].theme || 'rose';
  const themeStyles = THEME_CLASSES[theme] || THEME_CLASSES.rose;

  const updatedBanner = {
    ...current[index],
    ...updatedFields,
    theme,
    bgClass: themeStyles.bgClass,
    btnClass: themeStyles.btnClass,
  };

  const updated = [...current];
  updated[index] = updatedBanner;
  saveStoredBanners(updated);
  return updatedBanner;
}

export function deleteBanner(id) {
  const current = getStoredBanners();
  const updated = current.filter(b => b.id !== id);
  saveStoredBanners(updated);
  return updated;
}

export function resetBannersToDefault() {
  saveStoredBanners(INITIAL_BANNERS);
  return INITIAL_BANNERS;
}
