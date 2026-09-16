import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Plus, Trash2, Image as ImageIcon, Star, 
  Check, AlertCircle, Sparkles, Tag, Layers, Palette, DollarSign,
  Camera, CheckCircle2
} from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

const CATEGORIES = [
  { id: 'bouquets', label: 'Everlasting Bouquet' },
  { id: 'accessories', label: 'Floral Hair Accessories' },
  { id: 'hampers', label: 'Curated Gift Hamper' },
  { id: 'charms', label: 'Cute Bag Charms' },
  { id: 'mini-pots', label: 'Mini Desk Pot' },
  { id: 'seasonal', label: 'Special Edition' }
];

const BADGES = ['', 'Bestseller', 'Popular', 'Trending', 'Handmade Pick', 'New Arrival', 'Romantic', 'Limited Edition'];

export default function ProductFormModal({ product, onClose, onSave }) {
  const isEditing = Boolean(product && product.id);

  // Form State
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || 'bouquets');
  const [categoryLabel, setCategoryLabel] = useState(product?.categoryLabel || 'Everlasting Bouquet');
  const [price, setPrice] = useState(product?.price || '');
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice || '');
  const [badge, setBadge] = useState(product?.badge || '');
  const [description, setDescription] = useState(product?.description || '');
  const [longDescription, setLongDescription] = useState(product?.longDescription || '');
  const [estimatedDays, setEstimatedDays] = useState(product?.estimatedDays || '2-3 days');
  const [stemsCount, setStemsCount] = useState(product?.stemsCount || 1);
  const [customizable, setCustomizable] = useState(product?.customizable ?? true);
  const [rating, setRating] = useState(product?.rating || 5.0);
  const [reviewsCount, setReviewsCount] = useState(product?.reviewsCount || 12);

  // Main Cover Image
  const [mainImage, setMainImage] = useState(
    product?.image || (product?.images?.[0] || 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80')
  );

  // Color Variants with linked images: [ { name: 'Pastel Pink', image: 'https://...' } ]
  const [colorVariants, setColorVariants] = useState(() => {
    if (product?.colorVariants && Array.isArray(product.colorVariants)) {
      return product.colorVariants;
    }
    if (product?.colors && Array.isArray(product.colors)) {
      return product.colors.map((c, i) => ({
        name: c,
        image: product.images?.[i + 1] || product.image || ''
      }));
    }
    return [
      { name: 'Pastel Pink', image: '' },
      { name: 'Cream White', image: '' }
    ];
  });

  const [newColorName, setNewColorName] = useState('');
  const [uploadingVariantIdx, setUploadingVariantIdx] = useState(null);

  // Includes list
  const [includes, setIncludes] = useState(
    Array.isArray(product?.includes) ? product.includes : ['Handmade Craft Item', 'Gift Ribbon Wrapping', 'Care Card']
  );
  const [newInclude, setNewInclude] = useState('');

  // Uploading state
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Auto-update category label when category changes
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    const matched = CATEGORIES.find(c => c.id === val);
    if (matched) {
      setCategoryLabel(matched.label);
    }
  };

  // Upload Main Image to Cloudinary
  const handleMainImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMain(true);
    setUploadError('');

    try {
      const res = await uploadToCloudinary(file, `littlegiftstudio/products/${category}`);
      setMainImage(res.url);
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload main image to Cloudinary.');
    } finally {
      setIsUploadingMain(false);
      e.target.value = '';
    }
  };

  // Color Variant Handlers
  const handleAddColorVariant = () => {
    if (newColorName.trim()) {
      setColorVariants([...colorVariants, { name: newColorName.trim(), image: '' }]);
      setNewColorName('');
    }
  };

  const handleRemoveColorVariant = (idxToRemove) => {
    setColorVariants(colorVariants.filter((_, idx) => idx !== idxToRemove));
  };

  const handleVariantImageUpload = async (file, idx) => {
    if (!file) return;

    setUploadingVariantIdx(idx);
    setUploadError('');

    try {
      const res = await uploadToCloudinary(file, `littlegiftstudio/products/${category}/variants`);
      setColorVariants(prev => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], image: res.url };
        return updated;
      });
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload variant image.');
    } finally {
      setUploadingVariantIdx(null);
    }
  };

  const handleVariantUrlChange = (url, idx) => {
    setColorVariants(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], image: url.trim() };
      return updated;
    });
  };

  // Includes handlers
  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setIncludes([...includes, newInclude.trim()]);
      setNewInclude('');
    }
  };

  const handleRemoveInclude = (idxToRemove) => {
    setIncludes(includes.filter((_, idx) => idx !== idxToRemove));
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!price || Number(price) <= 0) return;

    const validVariants = colorVariants.filter(v => v.name.trim() !== '');
    const colorNames = validVariants.map(v => v.name);
    
    // Collect all gallery images: Main image + all variant images that are filled
    const allImages = [
      mainImage,
      ...validVariants.map(v => v.image).filter(img => img && img !== mainImage)
    ];

    const productPayload = {
      id: isEditing ? product.id : `prod_${category}_${Date.now().toString(36)}`,
      name: name.trim(),
      category,
      categoryLabel,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.25),
      badge: badge || undefined,
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      image: mainImage,
      images: allImages.length > 0 ? allImages : [mainImage],
      colorVariants: validVariants,
      colors: colorNames.length > 0 ? colorNames : ['Custom Pastel'],
      stemsCount: Number(stemsCount) || 1,
      customizable,
      estimatedDays: estimatedDays.trim() || '2-3 days',
      includes: includes.length > 0 ? includes : ['Handmade Keepsake'],
      rating: Number(rating) || 5.0,
      reviewsCount: Number(reviewsCount) || 15
    };

    onSave(productPayload);
  };

  const discountPercent = price && originalPrice && Number(originalPrice) > Number(price)
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-studio-600" />
              <span>{isEditing ? 'Edit Product Details' : 'Add New Handcrafted Product'}</span>
            </h2>
            <p className="text-xs text-stone-500">
              {isEditing ? `Editing ID: ${product.id}` : 'Set default photo and upload specific photos for each color variant'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-stone-200 text-stone-600 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {uploadError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* SECTION 1: Main Product Cover Image */}
          <div className="p-5 rounded-2xl bg-studio-50/60 border border-studio-100 space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-studio-600" />
                <span>Primary / Main Product Photo</span>
              </label>
              <span className="text-[11px] text-stone-500">
                Shown on catalog cards & default view
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white border-2 border-studio-200 shadow-sm shrink-0 relative group">
                <img src={mainImage} alt="Main preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px]">
                  Main
                </span>
              </div>

              {/* Upload or Link inputs */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex gap-2">
                  <label className="px-4 py-2 bg-studio-600 hover:bg-studio-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingMain ? 'Uploading...' : 'Upload Main Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={isUploadingMain}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="Or paste image URL: https://..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-studio-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Color Variants & Their Specific Photos */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <label className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-studio-600" />
                  <span>Color Variants & Individual Photos</span>
                </label>
                <p className="text-[11px] text-stone-500">
                  When a customer clicks a color, the website switches to that color's photo!
                </p>
              </div>

              {/* Add New Color Input */}
              <div className="flex gap-1.5 pt-2 sm:pt-0">
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddColorVariant(); } }}
                  placeholder="e.g. Lavender Blossom"
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-studio-500"
                />
                <button
                  type="button"
                  onClick={handleAddColorVariant}
                  className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900 flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Color</span>
                </button>
              </div>
            </div>

            {/* List of Color Variants */}
            <div className="space-y-3 pt-1">
              {colorVariants.length === 0 ? (
                <div className="p-4 rounded-xl bg-stone-50 text-center text-stone-400 text-xs">
                  No color variants added yet. Add a color theme above!
                </div>
              ) : (
                colorVariants.map((variant, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Color Photo Preview */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0 relative">
                      {variant.image ? (
                        <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 text-[10px] text-center p-1 font-medium">
                          No Photo
                        </div>
                      )}
                    </div>

                    {/* Color Name */}
                    <div className="w-full sm:w-40 shrink-0">
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setColorVariants(prev => {
                            const updated = [...prev];
                            updated[idx].name = val;
                            return updated;
                          });
                        }}
                        placeholder="Color name"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 bg-white"
                      />
                    </div>

                    {/* Photo Action for this Variant */}
                    <div className="flex-1 flex items-center gap-2 w-full">
                      <label className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                        <Camera className="w-3.5 h-3.5 text-studio-600" />
                        <span>{uploadingVariantIdx === idx ? 'Uploading...' : 'Upload Variant Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleVariantImageUpload(e.target.files?.[0], idx)}
                          disabled={uploadingVariantIdx === idx}
                          className="hidden"
                        />
                      </label>

                      <input
                        type="url"
                        value={variant.image}
                        onChange={(e) => handleVariantUrlChange(e.target.value, idx)}
                        placeholder="Or variant photo URL..."
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                      />
                    </div>

                    {/* Remove Variant */}
                    <button
                      type="button"
                      onClick={() => handleRemoveColorVariant(idx)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Remove this color variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                ))
              )}
            </div>
          </div>

          {/* SECTION 3: General Info (Name, Category, Badge) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pastel Dream Tulip Bouquet"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Marketing Badge
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-white"
              >
                {BADGES.map(b => (
                  <option key={b} value={b}>{b ? b : 'None'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SECTION 4: Category & Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Store Category *
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500 bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label} ({c.id})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Display Category Subtitle
              </label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Everlasting Bouquet"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500"
              />
            </div>
          </div>

          {/* SECTION 5: Pricing & Discount */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Selling Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="699"
                  className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white font-bold text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Original MRP Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="899"
                  className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-stone-500"
                />
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              {discountPercent > 0 ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs">
                  <span>🎉 Save {discountPercent}% OFF for customers</span>
                </div>
              ) : (
                <span className="text-[11px] text-stone-400">Regular retail price</span>
              )}
            </div>
          </div>

          {/* SECTION 6: Descriptions */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Short Teaser Description *
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A delicate arrangement of 5 handmade pipe cleaner tulips in pastel pink..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Long Story / Craft Description
              </label>
              <textarea
                rows={3}
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Each tulip petal is shaped by hand with high-density plush chenille stems..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-studio-500"
              />
            </div>
          </div>

          {/* SECTION 7: What's included checklist */}
          <div className="space-y-2">
            <label className="block font-semibold text-stone-700">
              What's in the Box / Package Includes
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInclude}
                onChange={(e) => setNewInclude(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInclude(); } }}
                placeholder="e.g. Korean Frosted Wrapping & Ribbon Bow"
                className="flex-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs"
              />
              <button
                type="button"
                onClick={handleAddInclude}
                className="px-3 py-1.5 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900"
              >
                Add Detail
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {includes.map((inc, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-studio-50 text-studio-800 border border-studio-200/60 text-xs">
                  <span>• {inc}</span>
                  <button type="button" onClick={() => handleRemoveInclude(idx)} className="text-studio-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 8: Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Estimated Crafting Timeline
              </label>
              <input
                type="text"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(e.target.value)}
                placeholder="2-3 days"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Stems / Flower Count
              </label>
              <input
                type="number"
                min="1"
                value={stemsCount}
                onChange={(e) => setStemsCount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="customizableCheck"
                checked={customizable}
                onChange={(e) => setCustomizable(e.target.checked)}
                className="w-4 h-4 text-studio-600 rounded focus:ring-studio-500"
              />
              <label htmlFor="customizableCheck" className="font-semibold text-stone-700 cursor-pointer">
                Customizable on Instagram DM
              </label>
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-6 border-t border-stone-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploadingMain || uploadingVariantIdx !== null}
              className="px-7 py-2.5 rounded-xl bg-studio-600 hover:bg-studio-700 text-white font-semibold shadow-md shadow-studio-600/20 transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Publish Product to Store'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
