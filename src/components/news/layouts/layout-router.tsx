import React from 'react';
import type { CarouselSlide, NewsItem } from '@/types/news.types';

// Import all layout components
import { SingleLayout } from './single-layout';
import { TwoEqualLayout } from './two-equal-layout';
import { TwoUnequalLayout } from './two-unequal-layout';
import { ThreeEqualLayout } from './three-equal-layout';
import { ThreeGridLayout } from './three-grid-layout';
import { ThreeStackedLayout } from './three-stacked-layout';
import { MobileLayout } from './mobile-layout';

interface LayoutRouterProps {
  slide: CarouselSlide;
  isRtl: boolean;
  onReadMore?: (item: NewsItem) => void;
}

export const LayoutRouter: React.FC<LayoutRouterProps> = ({ slide, isRtl, onReadMore }) => {
  const { layout, items } = slide;
  
  const layoutComponents = {
    single: <SingleLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />,
    'two-equal': <TwoEqualLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />,
    'two-unequal': <TwoUnequalLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />,
    'three-equal': <ThreeEqualLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />,
    'three-grid': <ThreeGridLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />,
    'three-stacked': <ThreeStackedLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />
  };
  
  return (
    <>
      <div className="hidden md:block">
        {layoutComponents[layout]}
      </div>
      <MobileLayout items={items} isRtl={isRtl} onReadMore={onReadMore} />
    </>
  );
};
