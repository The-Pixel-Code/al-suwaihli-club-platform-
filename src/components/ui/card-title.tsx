import React from 'react';
import { cn } from '@/lib/utils';

interface CardTitleProps {
  title: string;
  isRtl: boolean;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ title, isRtl, className }) => (
  <h3 className={cn(
    "font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors",
    isRtl ? "font-[Almarai] text-right" : "font-[Inter] text-left",
    className
  )}>
    {title}
  </h3>
);
