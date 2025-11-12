import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadMoreLinkProps {
  isRtl: boolean;
  className?: string;
  onClick?: () => void;
}

export const ReadMoreLink: React.FC<ReadMoreLinkProps> = ({ 
  isRtl, 
  className, 
  onClick 
}) => (
  <div 
    className={cn(
      "flex items-center text-red-600 font-medium text-sm group-hover:text-red-700 transition-colors cursor-pointer",
      isRtl ? "flex-row-reverse" : "",
      className
    )}
    onClick={onClick}
  >
    <span>{isRtl ? 'اقرأ المزيد' : 'Read More'}</span>
    {isRtl ? (
      <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
    ) : (
      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
    )}
  </div>
);
