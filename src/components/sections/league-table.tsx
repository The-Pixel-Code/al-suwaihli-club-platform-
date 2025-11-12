"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"
import Image from "next/image"

/**
 * League Table Component
 * 
 * Displays football league standings with:
 * - Team positions, stats, and points
 * - Highlighted Al-Suwaihli row
 * - Responsive design (table on desktop, cards on mobile)
 * - RTL support for Arabic text
 * - Hover effects and animations
 * - Form indicators (winning/losing streak)
 */

export interface TeamStanding {
  position: number
  teamName: string
  teamLogo?: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form?: ("W" | "D" | "L")[] // Last 5 matches
  isClubTeam?: boolean // Highlight if it's Al-Suwaihli
}

interface LeagueTableProps {
  standings: TeamStanding[]
  competitionName: string
  season?: string
  lastUpdated?: string
}

export function LeagueTable({ 
  standings, 
  competitionName,
  season = "2024/2025",
  lastUpdated
}: LeagueTableProps) {
  
  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-[#FFD700]" // Gold for top 3
    if (position <= 6) return "text-[#4CAF50]" // Green for European spots
    if (position >= standings.length - 2) return "text-[#D32F2F]" // Red for relegation
    return "text-[#666666]"
  }

  const getFormIcon = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return <TrendingUp className="h-3 w-3" />
      case "L":
        return <TrendingDown className="h-3 w-3" />
      case "D":
        return <Minus className="h-3 w-3" />
    }
  }

  const getFormColor = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return "bg-[#4CAF50] text-white"
      case "L":
        return "bg-[#D32F2F] text-white"
      case "D":
        return "bg-[#FFA726] text-white"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden border-2 border-[#D32F2F]/20">
        <CardHeader className="bg-gradient-to-r from-[#D32F2F]/10 to-[#FFD700]/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-7 w-7 text-[#D32F2F]" />
              <div>
                <CardTitle className="text-2xl text-[#333333]">{competitionName}</CardTitle>
                <p className="text-sm text-[#666666] mt-1">الموسم {season}</p>
              </div>
            </div>
            {lastUpdated && (
              <Badge variant="outline" className="border-[#D32F2F] text-[#D32F2F]">
                آخر تحديث: {lastUpdated}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full" dir="rtl">
              <thead>
                <tr className="border-b-2 border-[#D32F2F]/20 bg-[#F5F5F5]">
                  <th className="px-4 py-3 text-right text-sm font-bold text-[#333333]">المركز</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-[#333333]">الفريق</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">لعب</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">فاز</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">تعادل</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">خسر</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">له</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">عليه</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">الفارق</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">النقاط</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#333333]">الأداء</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <motion.tr
                    key={team.position}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`
                      border-b border-gray-200 transition-colors hover:bg-[#FFD700]/10
                      ${team.isClubTeam ? "bg-[#FFD700]/20 hover:bg-[#FFD700]/30" : ""}
                    `}
                  >
                    <td className={`px-4 py-4 text-center font-bold ${getPositionColor(team.position)}`}>
                      {team.position}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {team.teamLogo && (
                          <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                              src={team.teamLogo}
                              alt={team.teamName}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className={`font-semibold ${team.isClubTeam ? "text-[#D32F2F]" : "text-[#333333]"}`}>
                          {team.teamName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-[#666666]">{team.played}</td>
                    <td className="px-4 py-4 text-center text-[#4CAF50] font-semibold">{team.won}</td>
                    <td className="px-4 py-4 text-center text-[#FFA726] font-semibold">{team.drawn}</td>
                    <td className="px-4 py-4 text-center text-[#D32F2F] font-semibold">{team.lost}</td>
                    <td className="px-4 py-4 text-center text-[#666666]">{team.goalsFor}</td>
                    <td className="px-4 py-4 text-center text-[#666666]">{team.goalsAgainst}</td>
                    <td className={`px-4 py-4 text-center font-semibold ${team.goalDifference >= 0 ? "text-[#4CAF50]" : "text-[#D32F2F]"}`}>
                      {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-block bg-[#D32F2F] text-white font-bold px-3 py-1 rounded-md">
                        {team.points}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {team.form && (
                        <div className="flex gap-1 justify-center">
                          {team.form.slice(-5).map((result, i) => (
                            <div
                              key={i}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(result)}`}
                              title={result === "W" ? "فوز" : result === "D" ? "تعادل" : "خسارة"}
                            >
                              {getFormIcon(result)}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {standings.map((team, index) => (
              <motion.div
                key={team.position}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-4 ${team.isClubTeam ? "bg-[#FFD700]/20" : ""}`}
              >
                <div className="flex items-start gap-4" dir="rtl">
                  {/* Position */}
                  <div className={`text-2xl font-bold ${getPositionColor(team.position)} w-8 text-center`}>
                    {team.position}
                  </div>

                  {/* Team Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {team.teamLogo && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <Image
                            src={team.teamLogo}
                            alt={team.teamName}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className={`font-bold text-lg ${team.isClubTeam ? "text-[#D32F2F]" : "text-[#333333]"}`}>
                        {team.teamName}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                      <div className="text-center">
                        <div className="text-[#666666]">لعب</div>
                        <div className="font-bold text-[#333333]">{team.played}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#666666]">الفارق</div>
                        <div className={`font-bold ${team.goalDifference >= 0 ? "text-[#4CAF50]" : "text-[#D32F2F]"}`}>
                          {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#666666]">النقاط</div>
                        <div className="font-bold text-[#D32F2F] text-lg">{team.points}</div>
                      </div>
                    </div>

                    {/* W-D-L */}
                    <div className="flex gap-3 text-xs mb-2">
                      <span className="text-[#4CAF50]">فوز: {team.won}</span>
                      <span className="text-[#FFA726]">تعادل: {team.drawn}</span>
                      <span className="text-[#D32F2F]">خسر: {team.lost}</span>
                    </div>

                    {/* Form */}
                    {team.form && (
                      <div className="flex gap-1">
                        {team.form.slice(-5).map((result, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getFormColor(result)}`}
                          >
                            {getFormIcon(result)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 p-4 bg-[#F5F5F5]" dir="rtl">
            <div className="flex flex-wrap gap-4 text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                <span>المراكز الثلاثة الأولى</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                <span>المراكز الأوروبية</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D32F2F]"></div>
                <span>مراكز الهبوط</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
