import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface MobileLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="block md:hidden space-y-4">
    {items.map((item) => (
      <NewsCard 
        key={item.id} 
        item={item} 
        isRtl={isRtl} 
        variant="mobile"
        onReadMore={onReadMore}
      />
    ))}
  </div>
);