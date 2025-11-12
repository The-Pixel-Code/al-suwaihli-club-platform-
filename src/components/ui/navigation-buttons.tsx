"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationButtonsProps {
  onPrev: () => void
  onNext: () => void
  isRtl: boolean
  currentSlide?: number
  totalSlides?: number
  className?: string
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  isRtl,
  currentSlide,
  totalSlides,
  className,
}) => (
  <div className={className}>
    {/* Desktop Navigation - Improved positioning */}
    <button
      onClick={onPrev}
      aria-label={isRtl ? "الشريحة السابقة" : "Previous slide"}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        "bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl",
        "hover:from-[#d51a2d] hover:to-[#b01525] hover:text-white",
        "w-14 h-14 rounded-full transition-all duration-300",
        "hidden md:flex items-center justify-center text-gray-700",
        "shadow-lg hover:shadow-xl hover:scale-110",
        "border-2 border-gray-200 hover:border-[#d51a2d]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d51a2d] focus-visible:ring-offset-2",
        isRtl ? "-right-7" : "-left-7", // Move further outside
      )}
    >
      {isRtl ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
    </button>

    <button
      onClick={onNext}
      aria-label={isRtl ? "الشريحة التالية" : "Next slide"}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        "bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl",
        "hover:from-[#d51a2d] hover:to-[#b01525] hover:text-white",
        "w-14 h-14 rounded-full transition-all duration-300",
        "hidden md:flex items-center justify-center text-gray-700",
        "shadow-lg hover:shadow-xl hover:scale-110",
        "border-2 border-gray-200 hover:border-[#d51a2d]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d51a2d] focus-visible:ring-offset-2",
        isRtl ? "-left-7" : "-right-7", // Move further outside
      )}
    >
      {isRtl ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
    </button>

    {/* Mobile Navigation */}
    <div className="flex md:hidden justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        aria-label={isRtl ? "الشريحة السابقة" : "Previous slide"}
        className={cn(
          "bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        )}
      >
        {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
      <button
        onClick={onNext}
        aria-label={isRtl ? "الشريحة التالية" : "Next slide"}
        className={cn(
          "bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        )}
      >
        {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  </div>
)
