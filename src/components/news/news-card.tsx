"use client"

import type React from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getCardVariants, getImageHeights } from "@/lib/utils/carousel-utils"
import type { NewsItem, CardVariant } from "@/types/news.types"

// Import UI components
import { CategoryBadge } from "@/components/ui/category-badge"
import { TypeBadge } from "@/components/ui/type-badge"
import { DateTimeInfo } from "@/components/ui/date-time-info"
import { CardTitle } from "@/components/ui/card-title"
import { CardDescription } from "@/components/ui/card-description"
import { ReadMoreLink } from "@/components/ui/read-more-link"

interface NewsCardProps {
  item: NewsItem
  isRtl?: boolean
  variant?: CardVariant
  className?: string
  onReadMore?: (item: NewsItem) => void
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  isRtl = false,
  variant = "medium",
  className,
  onReadMore,
}) => {
  const variants = getCardVariants()
  const imageHeights = getImageHeights()

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(item)
    } else {
      // Default behavior - could navigate to detail page
      console.log("Navigate to:", `/news/${item.id}`)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#d51a2d]/30 flex flex-col",
        "min-h-[420px]", // Ensure all cards have equal minimum height
        variants[variant],
        className,
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden flex-shrink-0", imageHeights[variant])}>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={isRtl ? item.titleAr : item.title}
          width={150}
          height={100}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <CategoryBadge category={isRtl ? item.categoryAr : item.category} isRtl={isRtl} />
        <TypeBadge type={item.type} isRtl={isRtl} />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="flex-1">
          <DateTimeInfo date={item.date} readTime={item.readTime} isRtl={isRtl} />

          <CardTitle title={isRtl ? item.titleAr : item.title} isRtl={isRtl} className="line-clamp-2 mb-3" />

          {variant !== "small" && variant !== "mobile" && (
            <CardDescription description={isRtl ? item.descriptionAr : item.description} isRtl={isRtl} className="line-clamp-3" />
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <ReadMoreLink isRtl={isRtl} onClick={handleReadMore} />
        </div>
      </div>
    </motion.div>
  )
}
