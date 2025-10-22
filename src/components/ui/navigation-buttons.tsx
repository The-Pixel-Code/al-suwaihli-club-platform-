import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isRtl: boolean;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  onPrev, 
  onNext, 
  isRtl, 
  className 
}) => (
  <div className={className}>
    {/* Desktop Navigation */}
    <button
      onClick={onPrev}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-xl hover:bg-white",
        "w-12 h-12 rounded-full transition-all duration-200",
        "hidden md:flex items-center justify-center text-gray-700 hover:text-red-600",
        isRtl ? "right-4" : "left-4"
      )}
    >
      {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
    </button>
    
    <button
      onClick={onNext}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-xl hover:bg-white",
        "w-12 h-12 rounded-full transition-all duration-200",
        "hidden md:flex items-center justify-center text-gray-700 hover:text-red-600",
        isRtl ? "left-4" : "right-4"
      )}
    >
      {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
    </button>
    
    {/* Mobile Navigation */}
    <div className="flex md:hidden justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600"
      >
        {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
      <button
        onClick={onNext}
        className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600"
      >
        {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  </div>
);
