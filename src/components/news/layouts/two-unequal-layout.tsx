import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface TwoUnequalLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const TwoUnequalLayout: React.FC<TwoUnequalLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2">
      <NewsCard 
        item={items[0]} 
        isRtl={isRtl} 
        variant="large"
        onReadMore={onReadMore}
      />
    </div>
    <div className="md:col-span-1">
      <NewsCard 
        item={items[1]} 
        isRtl={isRtl} 
        variant="medium"
        onReadMore={onReadMore}
      />
    </div>
  </div>
);