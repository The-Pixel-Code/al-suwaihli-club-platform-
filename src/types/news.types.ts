export interface NewsItem {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  image: string;
  date: string;
  type: 'news' | 'advertisement';
  category: string;
  categoryAr: string;
  readTime?: number;
  priority: 'high' | 'medium' | 'low';
}

export type LayoutType = 'single' | 'two-equal' | 'two-unequal' | 'three-equal' | 'three-grid' | 'three-stacked';

export interface CarouselSlide {
  layout: LayoutType;
  items: NewsItem[];
}

export type CardVariant = 'large' | 'medium' | 'small' | 'mobile';
