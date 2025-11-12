import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface ThreeStackedLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const ThreeStackedLayout: React.FC<ThreeStackedLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="space-y-6">
    <NewsCard 
      item={items[0]} 
      isRtl={isRtl} 
      variant="large"
      onReadMore={onReadMore}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NewsCard 
        item={items[1]} 
        isRtl={isRtl} 
        variant="medium"
        onReadMore={onReadMore}
      />
      <NewsCard 
        item={items[2]} 
        isRtl={isRtl} 
        variant="medium"
        onReadMore={onReadMore}
      />
    </div>
  </div>
);
