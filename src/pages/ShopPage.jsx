import React from 'react';
import ProductCatalog from '../components/ProductCatalog';

export default function ShopPage({ products, onQuickView, onAddToCart, onDirectWhatsApp }) {
  return (
    <div className="py-2">
      <ProductCatalog
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onDirectWhatsApp={onDirectWhatsApp}
      />
    </div>
  );
}
