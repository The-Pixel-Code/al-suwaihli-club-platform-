"use client";

import type React from "react";
import { useRef } from "react";
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

  const {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
  } = useCarousel({
    slides,
    autoPlayInterval,
  });

  const liveRegionRef = useRef<HTMLDivElement>(null);

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
      aria-label={
        isRtl ? "قسم الأخبار والإعلانات" : "News and Announcements Section"
      }
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
          <NavigationButtons
            onPrev={prevSlide}
            onNext={nextSlide}
            isRtl={isRtl}
            currentSlide={currentSlide + 1}
            totalSlides={slides.length}
            className={"w-full"}
          />

          <div
            ref={liveRegionRef}
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {isRtl
              ? `الشريحة ${currentSlide + 1} من ${slides.length}`
              : `Slide ${currentSlide + 1} of ${slides.length}`}
          </div>

          <div
            className="overflow-hidden rounded-3xl"
            role="region"
            aria-label={isRtl ? "عرض الأخبار" : "News carousel"}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: isRtl ? -30 : 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isRtl ? 30 : -30, scale: 0.98 }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.4 },
                }}
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

        <PaginationDots
          total={slides.length}
          current={currentSlide}
          onChange={goToSlide}
          isRtl={isRtl}
        />
      </div>
    </section>
  );
};
