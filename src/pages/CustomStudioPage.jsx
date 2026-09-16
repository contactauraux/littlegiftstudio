import React from 'react';
import Customizer from '../components/Customizer';

export default function CustomStudioPage({ onAddToCart, onNavigate }) {
  return (
    <div className="py-2">
      <Customizer onAddToCart={onAddToCart} onNavigate={onNavigate} />
    </div>
  );
}
