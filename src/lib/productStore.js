import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'lgs_managed_products';

/**
 * Initializes and fetches products from localStorage.
 * If not present, populates with initial catalogue from data/products.js.
 */
export function getStoredProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading products from storage:', err);
  }

  // Pre-seed with default mock products
  const formattedInitial = INITIAL_PRODUCTS.map(p => ({
    ...p,
    // Ensure images array is present
    images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
  }));
  saveStoredProducts(formattedInitial);
  return formattedInitial;
}

export function saveStoredProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    // Dispatch custom window event so any listening React components can auto-refresh
    window.dispatchEvent(new CustomEvent('lgs_products_updated', { detail: products }));
  } catch (err) {
    console.error('Error saving products to storage:', err);
  }
}

/**
 * Add a new product to the catalogue
 */
export function addProduct(productData) {
  const current = getStoredProducts();
  const newProduct = {
    ...productData,
    id: productData.id || `prod_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString(),
    rating: productData.rating || 5.0,
    reviewsCount: productData.reviewsCount || 0,
    images: productData.images && productData.images.length > 0 
      ? productData.images 
      : (productData.image ? [productData.image] : []),
    image: productData.image || (productData.images?.[0] || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'),
  };

  const updated = [newProduct, ...current];
  saveStoredProducts(updated);
  return newProduct;
}

/**
 * Update an existing product
 */
export function updateProduct(id, updatedFields) {
  const current = getStoredProducts();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error(`Product with ID ${id} not found.`);
  }

  const updatedImages = updatedFields.images && updatedFields.images.length > 0
    ? updatedFields.images
    : (updatedFields.image ? [updatedFields.image] : current[index].images || [current[index].image]);

  const updatedProduct = {
    ...current[index],
    ...updatedFields,
    images: updatedImages,
    image: updatedFields.image || updatedImages[0] || current[index].image,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [...current];
  updatedList[index] = updatedProduct;
  saveStoredProducts(updatedList);
  return updatedProduct;
}

/**
 * Delete a product by ID
 */
export function deleteProduct(id) {
  const current = getStoredProducts();
  const updated = current.filter(p => p.id !== id);
  saveStoredProducts(updated);
  return updated;
}

/**
 * Reset back to initial default products
 */
export function resetToDefaultCatalog() {
  const formattedInitial = INITIAL_PRODUCTS.map(p => ({
    ...p,
    images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
  }));
  saveStoredProducts(formattedInitial);
  return formattedInitial;
}
