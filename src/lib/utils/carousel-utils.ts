import type { NewsItem, CarouselSlide, LayoutType } from '@/types/news.types';

export const createCarouselSlides = (items: NewsItem[]): CarouselSlide[] => {
  const layouts: LayoutType[] = [
    'single', 'two-equal', 'two-unequal', 'three-equal', 'three-grid', 'three-stacked'
  ];
  
  const slides: CarouselSlide[] = [];
  let itemIndex = 0;
  
  layouts.forEach(layout => {
    const itemCount = layout === 'single' ? 1 : layout.startsWith('two') ? 2 : 3;
    
    if (itemIndex < items.length) {
      slides.push({
        layout,
        items: items.slice(itemIndex, itemIndex + itemCount)
      });
      itemIndex += itemCount;
    }
  });
  
  return slides;
};

export const getCardVariants = () => ({
  large: 'h-[400px]',
  medium: 'h-[320px]',
  small: 'h-[280px]',
  mobile: 'h-[300px]'
});

export const getImageHeights = () => ({
  large: 'h-56',
  medium: 'h-48',
  small: 'h-40',
  mobile: 'h-48'
});