import React from 'react';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: 'news' | 'advertisement';
  isRtl: boolean;
  className?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, isRtl, className }) => (
  <div className={cn(
    "absolute top-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium",
    isRtl ? "left-3" : "right-3",
    className
  )}>
    {type === 'news' ? (isRtl ? 'أخبار' : 'News') : (isRtl ? 'إعلان' : 'Ad')}
  </div>
);
