import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: string;
  isRtl: boolean;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  isRtl, 
  className 
}) => (
  <div className={cn(
    "absolute top-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium",
    isRtl ? "right-3" : "left-3",
    className
  )}>
    {category}
  </div>
);
