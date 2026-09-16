// Store Management for Home Page 'Shop by Category' and 'Shop by Gifting Budget'

export const INITIAL_CATEGORY_TILES = [
  {
    id: 'bouquets',
    title: 'Everlasting Bouquets',
    subtitle: 'Tulips, Sunflowers, Daisies & Roses',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    color: 'from-rose-50 to-pink-100/60 border-rose-200',
    btnColor: 'bg-rose-600 hover:bg-rose-700',
  },
  {
    id: 'hampers',
    title: 'Curated Gift Hampers',
    subtitle: 'Bouquets + Clips + Lights + Cards',
    tag: 'All-In-One',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-50 to-indigo-100/60 border-purple-200',
    btnColor: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'clips',
    title: 'Fluffy Hair Clips & Claws',
    subtitle: 'Snap clips, mini claws & floral pins',
    tag: 'Everyday Cute',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-50 to-yellow-100/60 border-amber-200',
    btnColor: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'accessories',
    title: 'Keychains & Bag Charms',
    subtitle: 'Alphabet initials & beaded daisies',
    tag: 'Customizable',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-50 to-teal-100/60 border-emerald-200',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700',
  },
];

export const INITIAL_BUDGET_TIERS = [
  {
    id: 'under-249',
    title: 'Under ₹249',
    maxPrice: 249,
    minPrice: 0,
    label: 'Pocket Treats & Charms',
    desc: 'Cute keychains, initial charms & single blossom stems.',
    icon: '🎀',
    color: 'from-amber-50 to-orange-50 border-amber-200 text-amber-900',
    btnBg: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'under-499',
    title: 'Under ₹499',
    maxPrice: 499,
    minPrice: 0,
    label: 'Everyday Smiles & Clips',
    desc: 'Hair clip pairs, mini claw sets & desk blossom wraps.',
    icon: '🌸',
    color: 'from-rose-50 to-pink-50 border-rose-200 text-rose-900',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
  },
  {
    id: 'under-799',
    title: 'Under ₹799',
    maxPrice: 799,
    minPrice: 0,
    label: 'Everlasting Bouquets',
    desc: '3 to 5 stem tulip, sunflower & lavender bouquets.',
    icon: '💐',
    color: 'from-purple-50 to-fuchsia-50 border-purple-200 text-purple-900',
    btnBg: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'under-1499',
    title: 'Luxury Hampers',
    maxPrice: 99999,
    minPrice: 800,
    label: 'All-In-One Gift Boxes',
    desc: 'Complete hamper with fairy lights, cards & accessories.',
    icon: '🎁',
    color: 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900',
    btnBg: 'bg-emerald-700 hover:bg-emerald-800',
  },
];

const CATEGORY_TILES_KEY = 'lgs_managed_category_tiles';
const BUDGET_TIERS_KEY = 'lgs_managed_budget_tiers';

// ================= CATEGORY TILES =================
export function getStoredCategoryTiles() {
  try {
    const saved = localStorage.getItem(CATEGORY_TILES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading category tiles:', err);
  }
  saveStoredCategoryTiles(INITIAL_CATEGORY_TILES);
  return INITIAL_CATEGORY_TILES;
}

export function saveStoredCategoryTiles(tiles) {
  try {
    localStorage.setItem(CATEGORY_TILES_KEY, JSON.stringify(tiles));
    window.dispatchEvent(new CustomEvent('lgs_category_tiles_updated', { detail: tiles }));
  } catch (err) {
    console.error('Error saving category tiles:', err);
  }
}

export function updateCategoryTile(id, updatedFields) {
  const current = getStoredCategoryTiles();
  const index = current.findIndex(t => t.id === id);
  if (index === -1) throw new Error(`Category tile ${id} not found.`);

  const updatedTile = {
    ...current[index],
    ...updatedFields,
  };

  const updated = [...current];
  updated[index] = updatedTile;
  saveStoredCategoryTiles(updated);
  return updatedTile;
}

export function resetCategoryTilesToDefault() {
  saveStoredCategoryTiles(INITIAL_CATEGORY_TILES);
  return INITIAL_CATEGORY_TILES;
}

// ================= BUDGET TIERS =================
export function getStoredBudgetTiers() {
  try {
    const saved = localStorage.getItem(BUDGET_TIERS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading budget tiers:', err);
  }
  saveStoredBudgetTiers(INITIAL_BUDGET_TIERS);
  return INITIAL_BUDGET_TIERS;
}

export function saveStoredBudgetTiers(tiers) {
  try {
    localStorage.setItem(BUDGET_TIERS_KEY, JSON.stringify(tiers));
    window.dispatchEvent(new CustomEvent('lgs_budget_tiers_updated', { detail: tiers }));
  } catch (err) {
    console.error('Error saving budget tiers:', err);
  }
}

export function updateBudgetTier(id, updatedFields) {
  const current = getStoredBudgetTiers();
  const index = current.findIndex(t => t.id === id);
  if (index === -1) throw new Error(`Budget tier ${id} not found.`);

  const maxPrice = updatedFields.maxPrice !== undefined ? Number(updatedFields.maxPrice) : current[index].maxPrice;
  const minPrice = updatedFields.minPrice !== undefined ? Number(updatedFields.minPrice) : current[index].minPrice;

  const updatedTier = {
    ...current[index],
    ...updatedFields,
    maxPrice,
    minPrice,
  };

  const updated = [...current];
  updated[index] = updatedTier;
  saveStoredBudgetTiers(updated);
  return updatedTier;
}

export function resetBudgetTiersToDefault() {
  saveStoredBudgetTiers(INITIAL_BUDGET_TIERS);
  return INITIAL_BUDGET_TIERS;
}