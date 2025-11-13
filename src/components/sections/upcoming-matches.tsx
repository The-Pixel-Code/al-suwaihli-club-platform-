"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Trophy } from "lucide-react"
import Image from "next/image"

/**
 * Upcoming Matches Component
 * 
 * Displays upcoming fixtures with:
 * - Team names and logos
 * - Match date, time, and venue
 * - Competition information
 * - Grid or list layout options
 * - Hover effects and animations
 * - RTL support for Arabic text
 */

export interface UpcomingMatch {
  id: string | number
  homeTeam: string
  awayTeam: string
  homeLogo?: string
  awayLogo?: string
  date: string // Format: YYYY-MM-DD
  time: string // Format: HH:MM
  venue: string
  competition: string
  competitionLogo?: string
  isHomeMatch?: boolean
  ticketLink?: string
}

interface UpcomingMatchesProps {
  matches: UpcomingMatch[]
  title?: string
  layout?: "grid" | "list"
  showCompetitionBadge?: boolean
}

export function UpcomingMatches({ 
  matches,
  title = "المباريات القادمة",
  layout = "grid",
  showCompetitionBadge = true
}: UpcomingMatchesProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('ar-LY', options)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex items-center gap-3"
      >
        <Calendar className="h-8 w-8 text-[#D32F2F]" />
        <h2 className="text-3xl font-bold text-[#333333]">{title}</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`
          grid gap-6
          ${layout === "grid" ? "md:grid-cols-2 lg:grid-cols-2" : "grid-cols-1"}
        `}
      >
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-2 border-[#D32F2F]/20 hover:border-[#D32F2F]/40 hover:shadow-xl transition-all duration-300 h-full">
              {/* Competition Badge */}
              {showCompetitionBadge && (
                <CardHeader className="bg-gradient-to-r from-[#D32F2F]/5 to-[#FFD700]/5 pb-3">
                  <div className="flex items-center justify-between" dir="rtl">
                    <div className="flex items-center gap-2">
                      {match.competitionLogo && (
                        <div className="relative w-5 h-5">
                          <Image
                            src={match.competitionLogo}
                            alt={match.competition}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm font-semibold text-[#666666]">{match.competition}</span>
                    </div>
                    {match.isHomeMatch && (
                      <Badge className="bg-[#FFD700] text-[#333333] hover:bg-[#FFD700]/90">
                        مباراة على أرضنا
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              )}

              <CardContent className="pt-6">
                {/* Teams Section */}
                <div className="flex items-center justify-between mb-6" dir="rtl">
                  {/* Home Team */}
                  <motion.div 
                    className="flex-1 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {match.homeLogo && (
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <Image
                          src={match.homeLogo}
                          alt={match.homeTeam}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-lg font-bold text-[#333333] leading-tight">
                      {match.homeTeam}
                    </p>
                  </motion.div>

                  {/* VS Divider */}
                  <div className="px-4 flex flex-col items-center">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] flex items-center justify-center shadow-lg"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <span className="text-white font-bold text-sm">VS</span>
                    </motion.div>
                  </div>

                  {/* Away Team */}
                  <motion.div 
                    className="flex-1 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {match.awayLogo && (
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <Image
                          src={match.awayLogo}
                          alt={match.awayTeam}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-lg font-bold text-[#333333] leading-tight">
                      {match.awayTeam}
                    </p>
                  </motion.div>
                </div>

                {/* Match Details */}
                <div className="space-y-3 border-t pt-4" dir="rtl">
                  {/* Date and Time */}
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Calendar className="h-4 w-4 text-[#D32F2F] flex-shrink-0" />
                      <span className="text-sm text-[#666666]">{formatDate(match.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#D32F2F] flex-shrink-0" />
                      <span className="text-sm font-semibold text-[#333333]">{match.time}</span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D32F2F] flex-shrink-0" />
                    <span className="text-sm text-[#666666]">{match.venue}</span>
                  </div>

                  {/* Ticket Link */}
                  {match.ticketLink && (
                    <motion.a
                      href={match.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white text-center py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                        احجز تذكرتك
                      </div>
                    </motion.a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No Matches Message */}
      {matches.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-[#D32F2F]/20">
            <CardContent className="py-12 text-center">
              <Trophy className="h-16 w-16 text-[#D32F2F]/30 mx-auto mb-4" />
              <p className="text-lg text-[#666666]">لا توجد مباريات قادمة حالياً</p>
              <p className="text-sm text-[#999999] mt-2">تابع الموقع للحصول على آخر التحديثات</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </section>
  )
}
