"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Import types and utilities
import type { NewsItem } from "@/types/news.types";
import { createCarouselSlides } from "@/lib/utils/carousel-utils";
import { useCarousel } from "@/hooks/use-carousel";

// Import components
import { SectionHeader } from "@/components/ui/section-header";
import { NavigationButtons } from "@/components/ui/navigation-buttons";
import { PaginationDots } from "@/components/ui/pagination-dots";
import { LayoutRouter } from "@/components/news/layouts/layout-router";
import { mockNews } from "@/data/mock-news";
import useLanguage from "@/hooks/use-language";

// Mock data (this would come from an API or props in a real app)

interface NewsAdsCarouselProps {
  isRtl?: boolean;
  news?: NewsItem[];
  onReadMore?: (item: NewsItem) => void;
  autoPlayInterval?: number;
  className?: string;
}

export const NewsAdsCarousel: React.FC<NewsAdsCarouselProps> = ({
  news = mockNews,
  onReadMore,
  autoPlayInterval = 8000,
  className,
}) => {
  // Create carousel slides from news data
  const slides = createCarouselSlides(news);
  const { isArabic: isRtl } = useLanguage();

  // Use carousel hook for state management
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel({
    slides,
    autoPlayInterval,
  });

  // Handle read more click
  const handleReadMore = (item: NewsItem) => {
    if (onReadMore) {
      onReadMore(item);
    } else {
      // Default navigation behavior
      window.location.href = `/news/${item.id}`;
    }
  };

  return (
    <section
      className={cn(
        "py-20 bg-gradient-to-bl from-[#FFE5E5] to-[#F5F5FA] via-[#F5F5FA]",
        className
      )}
    >
      <div className="container mx-auto px-4 space-x-8">
        {/* Section Header */}
        <SectionHeader
          title={isRtl ? "الأخبار و" : "News &"}
          titleHighlight={isRtl ? "الإعلانات" : "Announcements"}
          subtitle={
            isRtl
              ? "ابق على اطلاع بآخر أخبار النادي والأحداث والإعلانات المهمة"
              : "Stay updated with the latest club news, events, and important announcements"
          }
          isRtl={isRtl}
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <NavigationButtons
            onPrev={prevSlide}
            onNext={nextSlide}
            isRtl={isRtl}
            className={"w-full"}
          />

          {/* Slides Container */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 50 : -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8"
              >
                <LayoutRouter
                  slide={slides[currentSlide]}
                  isRtl={isRtl}
                  onReadMore={handleReadMore}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <PaginationDots
          total={slides.length}
          current={currentSlide}
          onChange={goToSlide}
        />
      </div>
    </section>
  );
};
