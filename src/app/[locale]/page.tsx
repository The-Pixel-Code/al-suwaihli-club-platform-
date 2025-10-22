"use client";

import { NewsAdsCarousel } from "@/components/sections/news-ads-section";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsItem } from "@/types/news.types";

export default function HomePage() {

  const handleReadMore = (item: NewsItem) => {
    // Handle navigation to news detail page
    console.log("Navigate to news:", item.id);
  };
  
  return (
    <main className="min-h-screen">
      <HeroSection />
      <NewsAdsCarousel
        onReadMore={handleReadMore}
        autoPlayInterval={6000}
      />
      {/* Additional sections will be added here */}
    </main>
  );
}
