import React from 'react';
import Reviews from '../components/Reviews';
import InstagramFeed from '../components/InstagramFeed';

export default function ReviewsPage() {
  return (
    <div className="py-2 space-y-4">
      <Reviews />
      <InstagramFeed />
    </div>
  );
}
