"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Medal } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"

/**
 * Trophies Showcase Component
 * 
 * Displays club championships and awards with:
 * - Featured trophy card for major achievement
 * - Grid layout for multiple trophies
 * - Shimmer/shine animations
 * - Timeline view option
 * - Animated trophy counter
 * - RTL support for Arabic text
 */

export interface Trophy {
  id: string | number
  name: string
  competition: string
  year: string | number
  yearsWon?: (string | number)[] // For multiple wins
  timesWon?: number
  image?: string
  description?: string
  isFeatured?: boolean
  category?: "league" | "cup" | "international" | "other"
}

interface TrophiesShowcaseProps {
  trophies: Trophy[]
  title?: string
  viewMode?: "grid" | "timeline"
  showCounter?: boolean
}

// Counter Animation Hook
function useCounter(target: number, duration: number = 2) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(count, target, { duration })
    return controls.stop
  }, [count, target, duration])

  return rounded
}

// Counter Component
function TrophyCounter({ count }: { count: number }) {
  const animatedCount = useCounter(count, 2.5)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white px-8 py-6 rounded-2xl shadow-2xl">
        <Trophy className="h-12 w-12 text-[#FFD700]" />
        <div>
          <motion.div className="text-6xl font-bold text-[#FFD700]">
            {animatedCount}
          </motion.div>
          <p className="text-lg mt-2">بطولة وجائزة</p>
        </div>
      </div>
    </motion.div>
  )
}

export function TrophiesShowcase({ 
  trophies,
  title = "إنجازات وبطولات النادي",
  viewMode = "grid",
  showCounter = true
}: TrophiesShowcaseProps) {

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "league":
        return <Trophy className="h-5 w-5" />
      case "cup":
        return <Award className="h-5 w-5" />
      case "international":
        return <Star className="h-5 w-5" />
      default:
        return <Medal className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "league":
        return "bg-[#FFD700] text-[#333333]"
      case "cup":
        return "bg-[#D32F2F] text-white"
      case "international":
        return "bg-[#4CAF50] text-white"
      default:
        return "bg-[#666666] text-white"
    }
  }

  const featuredTrophy = trophies.find(t => t.isFeatured)
  const regularTrophies = trophies.filter(t => !t.isFeatured)

  return (
    <section className="w-full">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-10 w-10 text-[#FFD700]" />
          <h2 className="text-4xl font-bold text-[#333333]">{title}</h2>
        </div>
        <p className="text-lg text-[#666666]">رحلة حافلة بالإنجازات والنجاحات</p>
      </motion.div>

      {/* Trophy Counter */}
      {showCounter && <TrophyCounter count={trophies.length} />}

      {/* Featured Trophy */}
      {featuredTrophy && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-4 border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-[#D32F2F]/5 relative">
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear"
              }}
              style={{ width: "50%" }}
            />
            
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8" dir="rtl">
                {/* Trophy Image */}
                <motion.div
                  className="relative w-48 h-48 flex-shrink-0"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {featuredTrophy.image ? (
                    <Image
                      src={featuredTrophy.image}
                      alt={featuredTrophy.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Trophy className="h-32 w-32 text-[#FFD700]" />
                    </div>
                  )}
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FFD700]/20 blur-3xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Trophy Details */}
                <div className="flex-1 text-center md:text-right">
                  <Badge className={`${getCategoryColor(featuredTrophy.category)} mb-4 text-sm`}>
                    {getCategoryIcon(featuredTrophy.category)}
                    <span className="mr-1">{featuredTrophy.competition}</span>
                  </Badge>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">
                    {featuredTrophy.name}
                  </h3>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <span className="text-5xl font-bold text-[#D32F2F]">
                      {featuredTrophy.year}
                    </span>
                    {featuredTrophy.timesWon && featuredTrophy.timesWon > 1 && (
                      <Badge className="bg-[#FFD700] text-[#333333] text-lg px-4 py-2">
                        ✕ {featuredTrophy.timesWon}
                      </Badge>
                    )}
                  </div>

                  {featuredTrophy.description && (
                    <p className="text-lg text-[#666666] leading-relaxed">
                      {featuredTrophy.description}
                    </p>
                  )}

                  {featuredTrophy.yearsWon && featuredTrophy.yearsWon.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-[#666666] mb-2">السنوات:</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {featuredTrophy.yearsWon.map((year, idx) => (
                          <Badge key={idx} variant="outline" className="border-[#D32F2F] text-[#D32F2F]">
                            {year}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Regular Trophies Grid */}
      {viewMode === "grid" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularTrophies.map((trophy, index) => (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <Card className="h-full border-2 border-[#D32F2F]/20 hover:border-[#FFD700] hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                {/* Shimmer on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <CardContent className="p-6 text-center relative z-10" dir="rtl">
                  {/* Trophy Icon/Image */}
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {trophy.image ? (
                      <Image
                        src={trophy.image}
                        alt={trophy.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="h-20 w-20 text-[#FFD700]" />
                      </div>
                    )}
                  </motion.div>

                  {/* Category Badge */}
                  <Badge className={`${getCategoryColor(trophy.category)} mb-3 text-xs`}>
                    {getCategoryIcon(trophy.category)}
                    <span className="mr-1">{trophy.competition}</span>
                  </Badge>

                  {/* Trophy Name */}
                  <h4 className="text-xl font-bold text-[#333333] mb-2 leading-tight">
                    {trophy.name}
                  </h4>

                  {/* Year */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-[#D32F2F]">
                      {trophy.year}
                    </span>
                    {trophy.timesWon && trophy.timesWon > 1 && (
                      <Badge className="bg-[#FFD700] text-[#333333]">
                        ✕ {trophy.timesWon}
                      </Badge>
                    )}
                  </div>

                  {/* Multiple Years */}
                  {trophy.yearsWon && trophy.yearsWon.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1 justify-center">
                      {trophy.yearsWon.slice(0, 5).map((year, idx) => (
                        <span key={idx} className="text-xs text-[#666666] bg-gray-100 px-2 py-1 rounded">
                          {year}
                        </span>
                      ))}
                      {trophy.yearsWon.length > 5 && (
                        <span className="text-xs text-[#666666] bg-gray-100 px-2 py-1 rounded">
                          +{trophy.yearsWon.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {trophy.description && (
                    <p className="text-sm text-[#666666] mt-3 leading-relaxed">
                      {trophy.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <div className="relative" dir="rtl">
          {/* Timeline Line */}
          <div className="absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#D32F2F] to-[#FFD700]" />

          <div className="space-y-12">
            {regularTrophies.map((trophy, index) => (
              <motion.div
                key={trophy.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center gap-6 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <Card className="border-2 border-[#D32F2F]/20 hover:border-[#FFD700] hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Trophy Icon */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          {trophy.image ? (
                            <Image src={trophy.image} alt={trophy.name} fill className="object-contain" />
                          ) : (
                            <Trophy className="h-16 w-16 text-[#FFD700]" />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <Badge className={`${getCategoryColor(trophy.category)} mb-2 text-xs`}>
                            {trophy.competition}
                          </Badge>
                          <h4 className="text-lg font-bold text-[#333333] mb-1">
                            {trophy.name}
                          </h4>
                          <p className="text-sm text-[#666666]">{trophy.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Year Badge */}
                <motion.div
                  className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA726] flex items-center justify-center shadow-lg flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl font-bold text-[#333333]">{trophy.year}</span>
                </motion.div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
