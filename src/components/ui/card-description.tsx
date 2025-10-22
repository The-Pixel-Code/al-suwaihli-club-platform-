import React from 'react';
import { cn } from '@/lib/utils';

interface CardDescriptionProps {
  description?: string;
  isRtl: boolean;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ 
  description, 
  isRtl, 
  className 
}) => (
  description ? (
    <p className={cn(
      "text-gray-600 text-sm line-clamp-3 mb-4",
      isRtl ? "text-right" : "text-left",
      className
    )}>
      {description}
    </p>
  ) : null
);