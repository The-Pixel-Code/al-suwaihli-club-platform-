import React from 'react';
import { NewsCard } from '@/components/news/news-card';
import type { NewsItem } from '@/types/news.types';

interface SingleLayoutProps {
  items: NewsItem[];
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const SingleLayout: React.FC<SingleLayoutProps> = ({ items, isRtl, onReadMore }) => (
  <div className="max-w-2xl mx-auto">
    <NewsCard 
      item={items[0]} 
      isRtl={isRtl} 
      variant="large" 
      onReadMore={onReadMore}
    />
  </div>
);