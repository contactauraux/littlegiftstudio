import React from 'react';
import ProductCatalog from '../components/ProductCatalog';

export default function ShopPage({ products, onQuickView, onAddToCart, onDirectInstagramOrder }) {
  return (
    <div className="py-2">
      <ProductCatalog
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        onDirectInstagramOrder={onDirectInstagramOrder}
      />
    </div>
  );
}
