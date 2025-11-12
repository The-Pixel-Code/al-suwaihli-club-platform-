import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface TwoEqualLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const TwoEqualLayout: React.FC<TwoEqualLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map((item) => (
      <NewsCard 
        key={item.id} 
        item={item} 
        isRtl={isRtl} 
        variant="medium"
        onReadMore={onReadMore}
      />
    ))}
  </div>
);
