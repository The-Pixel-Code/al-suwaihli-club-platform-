import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface ThreeGridLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const ThreeGridLayout: React.FC<ThreeGridLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
    <div className="md:col-span-3">
      <NewsCard 
        item={items[0]} 
        isRtl={isRtl} 
        variant="large"
        onReadMore={onReadMore}
      />
    </div>
    <div className="md:col-span-2 space-y-6">
      <NewsCard 
        item={items[1]} 
        isRtl={isRtl} 
        variant="small"
        onReadMore={onReadMore}
      />
      <NewsCard 
        item={items[2]} 
        isRtl={isRtl} 
        variant="small"
        onReadMore={onReadMore}
      />
    </div>
  </div>
);
