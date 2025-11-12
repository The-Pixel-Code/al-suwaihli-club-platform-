import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateTimeInfoProps {
  date: string;
  readTime?: number;
  isRtl: boolean;
  className?: string;
}

export const DateTimeInfo: React.FC<DateTimeInfoProps> = ({ 
  date, 
  readTime, 
  isRtl, 
  className 
}) => (
  <div className={cn(
    "flex items-center gap-4 text-sm text-gray-500 mb-3",
    isRtl && "flex-row-reverse",
    className
  )}>
    <div className={cn("flex items-center gap-1", isRtl && "flex-row-reverse")}>
      <Calendar className="w-4 h-4" />
      <span>{new Date(date).toLocaleDateString(isRtl ? 'ar' : 'en')}</span>
    </div>
    {readTime && (
      <div className={cn("flex items-center gap-1", isRtl && "flex-row-reverse")}>
        <Clock className="w-4 h-4" />
        <span>{readTime} {isRtl ? 'دقائق' : 'min'}</span>
      </div>
    )}
  </div>
);
