import React from 'react';
import { cn } from '@/lib/utils';

interface PaginationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
  className?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ 
  total, 
  current, 
  onChange, 
  className 
}) => (
  <div className={cn("flex justify-center gap-3 mt-8", className)}>
    {Array.from({ length: total }, (_, index) => (
      <button
        key={index}
        onClick={() => onChange(index)}
        className={cn(
          "w-3 h-3 rounded-full transition-all duration-200",
          index === current
            ? "bg-red-600 scale-125"
            : "bg-gray-300 hover:bg-gray-400"
        )}
      />
    ))}
  </div>
);
