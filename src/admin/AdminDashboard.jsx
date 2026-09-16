import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, LogOut, 
  ExternalLink, Layers, Sparkles, Package, Image as ImageIcon,
  CheckCircle2, AlertTriangle, RefreshCw, LayoutGrid, List,
  Star, HelpCircle, MessageSquare, Quote, Eye, Sliders, ArrowRight, Palette
} from 'lucide-react';
import { getStoredProducts, addProduct, updateProduct, deleteProduct, resetToDefaultCatalog } from '../lib/productStore';
import { 
  getStoredReviews, addReview, updateReview, deleteReview, resetReviewsToDefault,
  getStoredFaqs, addFaq, updateFaq, deleteFaq, resetFaqsToDefault 
} from '../lib/contentStore';
import { 
  getStoredBanners, addBanner, updateBanner, deleteBanner, resetBannersToDefault 
} from '../lib/bannerStore';
import {
  getStoredInstagramPosts, addInstagramPost, updateInstagramPost, deleteInstagramPost, resetInstagramPostsToDefault
} from '../lib/instagramStore';
import {
  getStoredCategoryTiles, updateCategoryTile, resetCategoryTilesToDefault,
  getStoredBudgetTiers, updateBudgetTier, resetBudgetTiersToDefault
} from '../lib/curationStore';
import { logoutAdmin } from './adminAuth';
import ProductFormModal from './ProductFormModal';
import ReviewFormModal from './ReviewFormModal';
import FaqFormModal from './FaqFormModal';
import BannerFormModal from './BannerFormModal';
import InstagramPostFormModal from './InstagramPostFormModal';
import CategoryTileModal from './CategoryTileModal';
import BudgetTierModal from './BudgetTierModal';
import { InstagramIcon } from '../components/Icons';
import { Play, Heart, Tag, DollarSign } from 'lucide-react';

export default function AdminDashboard({ session, onLogout, onNavigateToStore }) {
  // Navigation tabs: 'products' | 'banners' | 'reviews' | 'faqs' | 'instagram'
  const [activeTab, setActiveTab] = useState('products');

  // Data States
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [categoryTiles, setCategoryTiles] = useState([]);
  const [budgetTiers, setBudgetTiers] = useState([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [editingInstagramPost, setEditingInstagramPost] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryTile, setEditingCategoryTile] = useState(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [editingBudgetTier, setEditingBudgetTier] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ open: false, type: '', id: null, title: '' });
  const [toastMessage, setToastMessage] = useState('');

  const loadAllData = () => {
    setProducts(getStoredProducts());
    setBanners(getStoredBanners());
    setReviews(getStoredReviews());
    setFaqs(getStoredFaqs());
    setInstagramPosts(getStoredInstagramPosts());
    setCategoryTiles(getStoredCategoryTiles());
    setBudgetTiers(getStoredBudgetTiers());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ================= PRODUCTS ACTIONS =================
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(productData.id, productData);
      triggerToast(`Updated "${productData.name}" successfully! ✨`);
    } else {
      addProduct(productData);
      triggerToast(`Added new product "${productData.name}"! 🌸`);
    }
    setProducts(getStoredProducts());
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // ================= BANNERS ACTIONS =================
  const handleSaveBanner = (bannerData) => {
    if (editingBanner) {
      updateBanner(bannerData.id, bannerData);
      triggerToast(`Updated banner "${bannerData.title}"! 🎠`);
    } else {
      addBanner(bannerData);
      triggerToast(`Added new carousel banner "${bannerData.title}"! 🎠`);
    }
    setBanners(getStoredBanners());
    setIsBannerModalOpen(false);
    setEditingBanner(null);
  };

  // ================= REVIEWS ACTIONS =================
  const handleSaveReview = (reviewData) => {
    if (editingReview) {
      updateReview(reviewData.id, reviewData);
      triggerToast(`Updated review from "${reviewData.name}"! ⭐`);
    } else {
      addReview(reviewData);
      triggerToast(`Added new review from "${reviewData.name}"! ⭐`);
    }
    setReviews(getStoredReviews());
    setIsReviewModalOpen(false);
    setEditingReview(null);
  };

  // ================= FAQS ACTIONS =================
  const handleSaveFaq = (faqData) => {
    if (editingFaq) {
      updateFaq(faqData.id, faqData);
      triggerToast(`Updated FAQ question! 💡`);
    } else {
      addFaq(faqData);
      triggerToast(`Added new FAQ question! 💡`);
    }
    setFaqs(getStoredFaqs());
    setIsFaqModalOpen(false);
    setEditingFaq(null);
  };

  // ================= INSTAGRAM POSTS ACTIONS =================
  const handleSaveInstagramPost = (postData) => {
    if (editingInstagramPost) {
      updateInstagramPost(postData.id, postData);
      triggerToast(`Updated Instagram post! 📸`);
    } else {
      addInstagramPost(postData);
      triggerToast(`Published new Instagram post to feed! 📸✨`);
    }
    setInstagramPosts(getStoredInstagramPosts());
    setIsInstagramModalOpen(false);
    setEditingInstagramPost(null);
  };

  // ================= CATEGORY TILES ACTIONS =================
  const handleSaveCategoryTile = (tileData) => {
    updateCategoryTile(tileData.id, tileData);
    triggerToast(`Updated category card "${tileData.title}"! 🌸`);
    setCategoryTiles(getStoredCategoryTiles());
    setIsCategoryModalOpen(false);
    setEditingCategoryTile(null);
  };

  // ================= BUDGET TIERS ACTIONS =================
  const handleSaveBudgetTier = (tierData) => {
    updateBudgetTier(tierData.id, tierData);
    triggerToast(`Updated budget tier "${tierData.title}" (Max: ₹${tierData.maxPrice})! 💰`);
    setBudgetTiers(getStoredBudgetTiers());
    setIsBudgetModalOpen(false);
    setEditingBudgetTier(null);
  };

  // ================= GENERIC DELETE =================
  const confirmDelete = () => {
    if (!deleteModal.id) return;

    if (deleteModal.type === 'product') {
      deleteProduct(deleteModal.id);
      setProducts(getStoredProducts());
      triggerToast('Product deleted from catalog.');
    } else if (deleteModal.type === 'banner') {
      deleteBanner(deleteModal.id);
      setBanners(getStoredBanners());
      triggerToast('Carousel banner deleted.');
    } else if (deleteModal.type === 'review') {
      deleteReview(deleteModal.id);
      setReviews(getStoredReviews());
      triggerToast('Customer review deleted.');
    } else if (deleteModal.type === 'faq') {
      deleteFaq(deleteModal.id);
      setFaqs(getStoredFaqs());
      triggerToast('FAQ item deleted.');
    } else if (deleteModal.type === 'instagram') {
      deleteInstagramPost(deleteModal.id);
      setInstagramPosts(getStoredInstagramPosts());
      triggerToast('Instagram post removed from feed.');
    }

    setDeleteModal({ open: false, type: '', id: null, title: '' });
  };

  // ================= RESET HANDLERS =================
  const handleResetCurrent = () => {
    if (activeTab === 'products') {
      if (window.confirm('Reset all products back to default showroom catalog?')) {
        resetToDefaultCatalog();
        setProducts(getStoredProducts());
        triggerToast('Products reset to defaults.');
      }
    } else if (activeTab === 'banners') {
      if (window.confirm('Reset hero horizontal carousel banners to default?')) {
        resetBannersToDefault();
        setBanners(getStoredBanners());
        triggerToast('Hero banners reset to defaults.');
      }
    } else if (activeTab === 'reviews') {
      if (window.confirm('Reset all reviews back to default customer testimonials?')) {
        resetReviewsToDefault();
        setReviews(getStoredReviews());
        triggerToast('Reviews reset to defaults.');
      }
    } else if (activeTab === 'faqs') {
      if (window.confirm('Reset all FAQs back to original questions?')) {
        resetFaqsToDefault();
        setFaqs(getStoredFaqs());
        triggerToast('FAQs reset to defaults.');
      }
    } else if (activeTab === 'instagram') {
      if (window.confirm('Reset Instagram posts back to default feed items?')) {
        resetInstagramPostsToDefault();
        setInstagramPosts(getStoredInstagramPosts());
        triggerToast('Instagram feed reset to defaults.');
      }
    } else if (activeTab === 'curation') {
      if (window.confirm('Reset category tiles and budget tiers back to store defaults?')) {
        resetCategoryTilesToDefault();
        resetBudgetTiersToDefault();
        setCategoryTiles(getStoredCategoryTiles());
        setBudgetTiers(getStoredBudgetTiers());
        triggerToast('Categories and budget tiers reset to defaults.');
      }
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredBanners = banners.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.highlight && b.highlight.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (b.badge && b.badge.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.company && r.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.role && r.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredInstagramPosts = instagramPosts.filter(post => 
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.type && post.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const productCategories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-800 pb-20">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-studio-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              LG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                  Little Gift Studio Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-studio-50 border border-studio-200 text-studio-700 text-[10px] font-semibold">
                  {session?.role || 'Admin'}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Logged in as <span className="font-medium text-stone-600">{session?.email}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateToStore}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Open storefront in client view"
            >
              <ExternalLink className="w-4 h-4 text-studio-600" />
              <span className="hidden sm:inline">View Storefront</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                if (onLogout) onLogout();
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-stone-900 text-white shadow-xl flex items-center gap-3 text-sm animate-slideUp">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Selector: Products | Hero Banners | Customer Reviews | FAQs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-studio-600 via-rose-500 to-rosebud-600 text-white shadow-md shadow-studio-600/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('banners'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'banners'
                ? 'bg-gradient-to-r from-rose-500 via-rosebud-500 to-amber-500 text-white shadow-md shadow-rosebud-500/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Top Carousel ({banners.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('reviews'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Customer Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('faqs'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'faqs'
                ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs & Help ({faqs.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('instagram'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'instagram'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rosebud-600 text-white shadow-md shadow-pink-600/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <InstagramIcon className="w-4 h-4 text-pink-500 group-hover:text-pink-600" />
            <span>Instagram Feed & Reels ({instagramPosts.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('curation'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'curation'
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-studio-600 text-white shadow-md shadow-rose-500/20'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Categories & Budget Pricing ({categoryTiles.length + budgetTiers.length})</span>
          </button>
        </div>

        {/* ======================= TAB 1: PRODUCTS ======================= */}
        {activeTab === 'products' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-studio-50 text-studio-600 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Products</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">{products.length}</h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Categories</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">{productCategories.length - 1}</h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rosebud-50 text-rosebud-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Customizable</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {products.filter(p => p.customizable).length}
                  </h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Photos</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {products.reduce((sum, p) => sum + (p.images?.length || 1), 0)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Products Action Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products by name or ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-studio-500"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-studio-500 font-medium"
                  >
                    {productCategories.map(c => (
                      <option key={c} value={c}>
                        {c === 'all' ? 'All Categories' : c.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-studio-600' : 'text-stone-500'}`}
                    title="Table View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-studio-600' : 'text-stone-500'}`}
                    title="Visual Card Grid"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors"
                  title="Reset to Default Catalog"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-studio-600 via-rose-500 to-rosebud-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-studio-600/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table or Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No products found</h3>
                <p className="text-xs text-stone-500 mt-1">Try clearing your search or category filter</p>
              </div>
            ) : viewMode === 'table' ? (
              <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="px-5 py-3.5">Product Image</th>
                        <th className="px-5 py-3.5">Name & Category</th>
                        <th className="px-5 py-3.5">Price (₹)</th>
                        <th className="px-5 py-3.5">Badge</th>
                        <th className="px-5 py-3.5">Color Variants</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="px-5 py-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-bold text-stone-900 line-clamp-1">{p.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 font-mono text-stone-600">{p.id}</span>
                              <span className="text-[11px] text-studio-600 font-medium">{p.categoryLabel || p.category}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-bold text-stone-900">₹{p.price}</div>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <div className="text-[11px] text-stone-400 line-through">₹{p.originalPrice}</div>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            {p.badge ? (
                              <span className="px-2.5 py-1 rounded-full bg-studio-50 text-studio-700 text-[10px] font-bold border border-studio-200">{p.badge}</span>
                            ) : (
                              <span className="text-stone-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium">
                              <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                              <span>{(p.colorVariants?.length || p.colors?.length || 1)} variant{(p.colorVariants?.length || p.colors?.length || 1) > 1 ? 's' : ''}</span>
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                                className="p-2 rounded-xl bg-stone-100 hover:bg-studio-50 hover:text-studio-700 text-stone-600 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteModal({ open: true, type: 'product', id: p.id, title: p.name })}
                                className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {p.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-studio-600 text-white text-[10px] font-bold shadow">{p.badge}</span>
                        )}
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] backdrop-blur-sm">
                          {(p.colorVariants?.length || p.colors?.length || 1)} color variants
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-studio-600 tracking-wider">{p.categoryLabel || p.category}</div>
                        <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{p.name}</h4>
                        <p className="text-xs text-stone-500 line-clamp-2">{p.description}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                      <div>
                        <span className="font-bold text-stone-900 text-base">₹{p.price}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-xs text-stone-400 line-through ml-1.5">₹{p.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                          className="p-2 rounded-xl bg-stone-100 hover:bg-studio-50 hover:text-studio-700 text-stone-600 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({ open: true, type: 'product', id: p.id, title: p.name })}
                          className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ======================= TAB 2: HERO CAROUSEL BANNERS ======================= */}
        {activeTab === 'banners' && (
          <>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 sm:w-80 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search banners by title, badge, or pricing..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-rosebud-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors"
                  title="Reset Hero Banners to Default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditingBanner(null); setIsBannerModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-rosebud-500 to-amber-500 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rosebud-500/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Carousel Banner</span>
                </button>
              </div>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBanners.map(b => (
                <div
                  key={b.id}
                  className={`rounded-3xl p-6 border shadow-sm flex flex-col justify-between relative overflow-hidden transition-all group ${
                    b.bgClass || 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 z-10">
                    <div className="space-y-1.5 max-w-[65%]">
                      {b.badge && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/90 text-stone-800 text-[11px] font-bold shadow-2xs">
                          {b.badge}
                        </span>
                      )}
                      <h4 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                        {b.title}
                      </h4>
                      <div className="text-lg font-extrabold text-stone-900">
                        {b.highlight}
                      </div>
                      <p className="text-stone-600 text-xs line-clamp-2">
                        {b.subtitle}
                      </p>
                      <div className="pt-2 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-bold text-stone-700 border border-stone-200">
                          CTA: {b.cta} → {b.link}
                        </span>
                      </div>
                    </div>

                    <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md bg-white border border-white/60 shrink-0">
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  </div>

                  {/* Banner Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between z-10">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      Theme: {b.theme}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingBanner(b); setIsBannerModalOpen(true); }}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold shadow-xs flex items-center gap-1 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Card</span>
                      </button>
                      <button
                        onClick={() => setDeleteModal({ open: true, type: 'banner', id: b.id, title: b.title })}
                        className="p-1.5 rounded-xl bg-white hover:bg-red-50 hover:text-red-700 text-stone-600 shadow-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================= TAB 3: CUSTOMER REVIEWS ======================= */}
        {activeTab === 'reviews' && (
          <>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 sm:w-80 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews by customer name, city, or product..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors"
                  title="Reset Reviews to Default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditingReview(null); setIsReviewModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReviews.map(r => (
                <div key={r.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={r.image} alt={r.name} className="w-11 h-11 rounded-full object-cover border border-stone-200" />
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{r.name}</h4>
                          <p className="text-[11px] text-stone-500">{r.role} • {r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed italic bg-stone-50 p-3 rounded-xl border border-stone-100">
                      "{r.quote}"
                    </p>

                    {r.company && (
                      <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-studio-50 text-studio-700 text-[11px] font-semibold border border-studio-200">
                        <span>🎁 {r.company}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditingReview(r); setIsReviewModalOpen(true); }}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-50 hover:text-amber-700 text-stone-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, type: 'review', id: r.id, title: `Review by ${r.name}` })}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================= TAB 4: FAQS ======================= */}
        {activeTab === 'faqs' && (
          <>
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 sm:w-80 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQ questions or answers..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors"
                  title="Reset FAQs to Default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditingFaq(null); setIsFaqModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {filteredFaqs.map(f => (
                <div key={f.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 text-xl flex items-center justify-center shrink-0">
                      {f.icon || '🌸'}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-stone-900 text-base">{f.question}</h4>
                        {f.category && (
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-semibold">
                            {f.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 self-end sm:self-start">
                    <button
                      onClick={() => { setEditingFaq(f); setIsFaqModalOpen(true); }}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-sky-50 hover:text-sky-700 text-stone-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteModal({ open: true, type: 'faq', id: f.id, title: f.question })}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================= TAB 5: INSTAGRAM FEED POSTS ======================= */}
        {activeTab === 'instagram' && (
          <>
            {/* Instagram Feed Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Feed Posts</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">{instagramPosts.length}</h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Play className="w-6 h-6 fill-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Reels (Videos)</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {instagramPosts.filter(p => p.type === 'reel').length}
                  </h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rosebud-50 text-rosebud-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Photo Carousels</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {instagramPosts.filter(p => p.type === 'carousel' || p.type === 'post').length}
                  </h3>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Likes</p>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {instagramPosts.reduce((sum, p) => sum + (Number(p.likes) || 0), 0)}
                  </h3>
                </div>
              </div>
            </div>

            {/* Instagram Action Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 sm:w-80 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts by caption, type, or URL..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCurrent}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-colors"
                  title="Reset Instagram Posts to Default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditingInstagramPost(null); setIsInstagramModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rosebud-600 hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-600/20 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Instagram Post</span>
                </button>
              </div>
            </div>

            {/* Instagram Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInstagramPosts.map(p => (
                <div key={p.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-soft flex flex-col justify-between group hover:shadow-card-hover transition-all">
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-square bg-stone-100 overflow-hidden">
                      <img
                        src={p.img}
                        alt="Instagram thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Format Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="p-1.5 rounded-full bg-stone-900/75 backdrop-blur-md text-white flex items-center justify-center text-[10px] shadow-sm">
                          {p.type === 'reel' ? <Play className="w-3.5 h-3.5 fill-white" /> : <Sparkles className="w-3.5 h-3.5 text-pink-300" />}
                        </span>
                      </div>

                      {/* Likes Counter Pill */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow">
                        <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                        <span>{p.likes} likes</span>
                      </div>
                    </div>

                    {/* Post Details */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 text-[10px] font-bold uppercase tracking-wider border border-pink-200/60">
                          {p.type === 'reel' ? '🎬 Reel Video' : p.type === 'carousel' ? '📸 Carousel' : '📷 Single Photo'}
                        </span>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-400 hover:text-pink-600 transition-colors p-1"
                          title="Open on Instagram"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs text-stone-700 font-medium line-clamp-3 leading-relaxed italic">
                        "{p.caption}"
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-400 truncate max-w-[100px]">
                      {p.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setEditingInstagramPost(p); setIsInstagramModalOpen(true); }}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-pink-50 hover:text-pink-700 text-stone-600 transition-colors"
                        title="Edit post"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ open: true, type: 'instagram', id: p.id, title: `Instagram post (${p.type})` })}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

        {/* ======================= TAB 6: CATEGORIES & BUDGET TIERS ======================= */}
        {activeTab === 'curation' && (
          <>
            {/* Header controls & reset */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-sm">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <span>Shop by Category & Gifting Budget Management</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Configure visual category cards and decide price ceilings for the gifting budget tiers
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCurrent}
                  className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Reset to store defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Shop by Category Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Shop by Category Tiles (Home Page Visual Grid)</span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    4 featured collection cards shown on the home page with images, titles, and links
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="p-4 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                          {tile.tag}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          id: {tile.id}
                        </span>
                      </div>

                      <h5 className="font-serif text-base font-bold text-stone-900 leading-snug">
                        {tile.title}
                      </h5>
                      <p className="text-stone-500 text-xs mt-0.5 line-clamp-1">
                        {tile.subtitle}
                      </p>

                      <div className="mt-3 relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border">
                        <img
                          src={tile.image}
                          alt={tile.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">
                        Target: <strong className="text-stone-700">{tile.id}</strong>
                      </span>
                      <button
                        onClick={() => { setEditingCategoryTile(tile); setIsCategoryModalOpen(true); }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-studio-600 hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Tile</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: Shop by Gifting Budget & Price Deciding */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Shop by Gifting Budget & Price Deciding</span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    Set price thresholds, titles, and descriptions for the 4 budget tiers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {budgetTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{tier.icon}</span>
                        <div className="text-right">
                          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-stone-100 text-stone-900 block">
                            {tier.title}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block border border-emerald-200">
                            Max: ₹{tier.maxPrice}
                          </span>
                        </div>
                      </div>

                      <h5 className="font-serif text-sm font-bold text-stone-900 mb-0.5">
                        {tier.label}
                      </h5>
                      <p className="text-stone-500 text-xs leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-400">
                        {tier.id}
                      </span>
                      <button
                        onClick={() => { setEditingBudgetTier(tier); setIsBudgetModalOpen(true); }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Price & Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Category Tile Form Modal */}
      {isCategoryModalOpen && (
        <CategoryTileModal
          tile={editingCategoryTile}
          onClose={() => {
            setIsCategoryModalOpen(false);
            setEditingCategoryTile(null);
          }}
          onSave={handleSaveCategoryTile}
        />
      )}

      {/* Budget Tier Form Modal */}
      {isBudgetModalOpen && (
        <BudgetTierModal
          tier={editingBudgetTier}
          onClose={() => {
            setIsBudgetModalOpen(false);
            setEditingBudgetTier(null);
          }}
          onSave={handleSaveBudgetTier}
        />
      )}

      {/* Instagram Post Form Modal */}
      {isInstagramModalOpen && (
        <InstagramPostFormModal
          post={editingInstagramPost}
          onClose={() => {
            setIsInstagramModalOpen(false);
            setEditingInstagramPost(null);
          }}
          onSave={handleSaveInstagramPost}
        />
      )}

      {/* Product Form Modal */}
      {isProductModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {/* Banner Form Modal */}
      {isBannerModalOpen && (
        <BannerFormModal
          banner={editingBanner}
          onClose={() => {
            setIsBannerModalOpen(false);
            setEditingBanner(null);
          }}
          onSave={handleSaveBanner}
        />
      )}

      {/* Review Form Modal */}
      {isReviewModalOpen && (
        <ReviewFormModal
          review={editingReview}
          onClose={() => {
            setIsReviewModalOpen(false);
            setEditingReview(null);
          }}
          onSave={handleSaveReview}
        />
      )}

      {/* FAQ Form Modal */}
      {isFaqModalOpen && (
        <FaqFormModal
          faq={editingFaq}
          onClose={() => {
            setIsFaqModalOpen(false);
            setEditingFaq(null);
          }}
          onSave={handleSaveFaq}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Confirm Deletion</h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                Are you sure you want to delete <strong className="text-stone-700">{deleteModal.title}</strong>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModal({ open: false, type: '', id: null, title: '' })}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
