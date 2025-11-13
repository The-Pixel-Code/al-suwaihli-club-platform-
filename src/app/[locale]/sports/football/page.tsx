"use client"

import { useState } from "react"
import useLanguage from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy, Users, Clock, TrendingUp, Newspaper } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlayerCarousel } from "@/components/player-carousel"

export default function FootballPage() {
  const { isArabic } = useLanguage()
  const [selectedTeam, setSelectedTeam] = useState<"first" | "awasit" | "amal" | "baraem">("first")
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<"first" | "awasit" | "amal" | "baraem">("first")

  // Mock data for live scores
  const liveMatches = [
    {
      id: 1,
      homeTeam: isArabic ? "السويحلي" : "Al-Suwaihli",
      awayTeam: isArabic ? "الأهلي طرابلس" : "Al-Ahly Tripoli",
      homeScore: 2,
      awayScore: 1,
      status: "live",
      minute: 67,
      competition: isArabic ? "الدوري الليبي الممتاز" : "Libyan Premier League",
    },
    {
      id: 2,
      homeTeam: isArabic ? "الاتحاد" : "Al-Ittihad",
      awayTeam: isArabic ? "السويحلي" : "Al-Suwaihli",
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      date: "2025-11-01",
      time: "18:00",
      competition: isArabic ? "كأس ليبيا" : "Libya Cup",
    },
  ]

  // Mock data for league standings
  const standings = [
    {
      position: 1,
      team: isArabic ? "الأهلي بنغازي" : "Al-Ahly Benghazi",
      played: 15,
      won: 11,
      drawn: 3,
      lost: 1,
      gf: 32,
      ga: 10,
      gd: 22,
      points: 36,
    },
    {
      position: 2,
      team: isArabic ? "السويحلي" : "Al-Suwaihli",
      played: 15,
      won: 10,
      drawn: 4,
      lost: 1,
      gf: 28,
      ga: 12,
      gd: 16,
      points: 34,
    },
    {
      position: 3,
      team: isArabic ? "الأهلي طرابلس" : "Al-Ahly Tripoli",
      played: 15,
      won: 9,
      drawn: 3,
      lost: 3,
      gf: 25,
      ga: 15,
      gd: 10,
      points: 30,
    },
    {
      position: 4,
      team: isArabic ? "الاتحاد" : "Al-Ittihad",
      played: 15,
      won: 8,
      drawn: 4,
      lost: 3,
      gf: 22,
      ga: 14,
      gd: 8,
      points: 28,
    },
    {
      position: 5,
      team: isArabic ? "الهلال" : "Al-Hilal",
      played: 15,
      won: 7,
      drawn: 5,
      lost: 3,
      gf: 20,
      ga: 16,
      gd: 4,
      points: 26,
    },
  ]

  // Mock data for squad
  const getSquad = () => ({
    first: [
      {
        id: 1,
        name: isArabic ? "محمد الصغير" : "Mohamed Al-Saghir",
        position: isArabic ? "حارس مرمى" : "Goalkeeper",
        number: 1,
        age: 28,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player1/280/320",
      },
      {
        id: 2,
        name: isArabic ? "أحمد السويحلي" : "Ahmed Al-Suwaihli",
        position: isArabic ? "مدافع" : "Defender",
        number: 4,
        age: 26,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player2/280/320",
      },
      {
        id: 3,
        name: isArabic ? "عمر الزروق" : "Omar Al-Zarouq",
        position: isArabic ? "مدافع" : "Defender",
        number: 5,
        age: 29,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player3/280/320",
      },
      {
        id: 4,
        name: isArabic ? "سالم المبروك" : "Salem Al-Mabrouk",
        position: isArabic ? "وسط" : "Midfielder",
        number: 8,
        age: 25,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player4/280/320",
      },
      {
        id: 5,
        name: isArabic ? "خالد الترهوني" : "Khaled Al-Tarhouni",
        position: isArabic ? "وسط" : "Midfielder",
        number: 10,
        age: 27,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player5/280/320",
      },
      {
        id: 6,
        name: isArabic ? "يوسف البشير" : "Youssef Al-Bashir",
        position: isArabic ? "مهاجم" : "Forward",
        number: 9,
        age: 24,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player6/280/320",
      },
    ],
    awasit: [
      {
        id: 13,
        name: isArabic ? "علي المهدي" : "Ali Al-Mahdi",
        position: isArabic ? "حارس مرمى" : "Goalkeeper",
        number: 22,
        age: 15,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player13/280/320",
      },
      {
        id: 14,
        name: isArabic ? "حسن الفيتوري" : "Hassan Al-Fayturi",
        position: isArabic ? "مدافع" : "Defender",
        number: 15,
        age: 14,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player14/280/320",
      },
    ],
    amal: [
      {
        id: 21,
        name: isArabic ? "عبدالله الصادق" : "Abdullah Al-Sadiq",
        position: isArabic ? "مهاجم" : "Forward",
        number: 11,
        age: 13,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player21/280/320",
      },
      {
        id: 22,
        name: isArabic ? "إبراهيم الزنتاني" : "Ibrahim Al-Zentani",
        position: isArabic ? "وسط" : "Midfielder",
        number: 14,
        age: 12,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player22/280/320",
      },
    ],
    baraem: [
      {
        id: 29,
        name: isArabic ? "كريم الزروق" : "Karim Al-Zarouq",
        position: isArabic ? "مدافع" : "Defender",
        number: 3,
        age: 11,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player29/280/320",
      },
      {
        id: 30,
        name: isArabic ? "طه الكيلاني" : "Taha Al-Kilani",
        position: isArabic ? "وسط" : "Midfielder",
        number: 6,
        age: 10,
        nationality: isArabic ? "ليبيا" : "Libya",
        image: "https://picsum.photos/seed/player30/280/320",
      },
    ],
  })

  const squad = getSquad()

  // Mock data for upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: isArabic ? "السويحلي" : "Al-Suwaihli",
      awayTeam: isArabic ? "الهلال" : "Al-Hilal",
      date: "2025-11-05",
      time: "16:00",
      venue: isArabic ? "ملعب السويحلي" : "Al-Suwaihli Stadium",
      competition: isArabic ? "الدوري الليبي الممتاز" : "Libyan Premier League",
    },
    {
      id: 2,
      homeTeam: isArabic ? "الأهلي بنغازي" : "Al-Ahly Benghazi",
      awayTeam: isArabic ? "السويحلي" : "Al-Suwaihli",
      date: "2025-11-12",
      time: "18:30",
      venue: isArabic ? "ملعب بنغازي" : "Benghazi Stadium",
      competition: isArabic ? "الدوري الليبي الممتاز" : "Libyan Premier League",
    },
  ]

  // Mock data for news
  const teamNews: Record<string, Array<{ id: number; title: string; date: string; excerpt: string; image: string; tags: string[] }>> = {
    first: [
      {
        id: 1,
        title: isArabic
          ? "الفريق الأول يحقق فوزاً مهماً على الأهلي طرابلس"
          : "First Team Achieves Important Victory Over Al-Ahly Tripoli",
        date: "2025-10-20",
        excerpt: isArabic
          ? "حقق الفريق الأول لنادي السويحلي فوزاً مستحقاً على الأهلي طرابلس بنتيجة 2-1 في مباراة مثيرة شهدها ملعب السويحلي."
          : "Al-Suwaihli's first team achieved a deserved victory over Al-Ahly Tripoli 2-1 in an exciting match at Al-Suwaihli Stadium.",
        image: "https://picsum.photos/seed/news1/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 2,
        title: isArabic ? "المدرب يشيد بأداء اللاعبين في التدريبات" : "Coach Praises Players' Training Performance",
        date: "2025-10-18",
        excerpt: isArabic
          ? "أشاد المدرب الفني للفريق الأول بمستوى اللاعبين خلال التدريبات الأخيرة استعداداً للمباراة القادمة."
          : "The first team's technical coach praised the players' level during recent training sessions in preparation for the upcoming match.",
        image: "https://picsum.photos/seed/news2/400/300",
        tags: ["training"],
      },
    ],
    awasit: [
      {
        id: 5,
        title: isArabic ? "فريق الأواسط يتأهل لنهائي البطولة" : "Youth Team Qualifies for Championship Final",
        date: "2025-10-19",
        excerpt: isArabic
          ? "تأهل فريق الأواسط لنهائي البطولة بعد فوزه على فريق الاتحاد بركلات الترجيح."
          : "The youth team qualified for the championship final after defeating Al-Ittihad on penalties.",
        image: "https://picsum.photos/seed/news5/400/300",
        tags: ["match", "victory"],
      },
    ],
    amal: [
      {
        id: 8,
        title: isArabic ? "فريق الآمال يحقق الفوز الخامس على التوالي" : "Junior Team Achieves Fifth Consecutive Victory",
        date: "2025-10-21",
        excerpt: isArabic
          ? "واصل فريق الآمال انتصاراته المتتالية بفوزه على فريق الهلال بثلاثة أهداف نظيفة."
          : "The junior team continued its winning streak with a 3-0 victory over Al-Hilal.",
        image: "https://picsum.photos/seed/news8/400/300",
        tags: ["match", "victory"],
      },
    ],
    baraem: [
      {
        id: 11,
        title: isArabic ? "فريق البراعم يفوز ببطولة المنطقة" : "Kids Team Wins Regional Championship",
        date: "2025-10-22",
        excerpt: isArabic
          ? "حقق فريق البراعم لقب بطولة المنطقة بعد فوزه في المباراة النهائية بنتيجة 3-1."
          : "The kids team won the regional championship title after winning the final match 3-1.",
        image: "https://picsum.photos/seed/news11/400/300",
        tags: ["match", "victory"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/football-stadium-crowd.png')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 text-5xl font-bold"
            >
              {isArabic ? "كرة القدم" : "Football"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              {isArabic ? "فريق كرة القدم - نادي السويحلي الرياضي" : "Football Team - Al-Suwaihli Sports Club"}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Live Scores Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <Trophy className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">
              {isArabic ? "المباريات المباشرة والقادمة" : "Live & Upcoming Matches"}
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {liveMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden border-2 border-[#D32F2F]/20">
                  <CardHeader className="bg-[#D32F2F]/5 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#666666]">{match.competition}</span>
                      {match.status === "live" ? (
                        <Badge className="animate-pulse bg-red-600 text-white">
                          <Clock className={`${isArabic ? "ml-1" : "mr-1"} h-3 w-3`} />
                          {isArabic ? `مباشر - ${match.minute}'` : `Live - ${match.minute}'`}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-[#D32F2F] text-[#D32F2F]">
                          <Calendar className={`${isArabic ? "ml-1" : "mr-1"} h-3 w-3`} />
                          {match.date} - {match.time}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-center">
                        <p className="mb-2 text-xl font-bold text-[#333333]">{match.homeTeam}</p>
                        {match.status === "live" && (
                          <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-4xl font-bold text-[#D32F2F]"
                          >
                            {match.homeScore}
                          </motion.p>
                        )}
                      </div>
                      <div className="px-4 text-2xl font-bold text-[#666666]">{match.status === "live" ? ":" : "VS"}</div>
                      <div className="flex-1 text-center">
                        <p className="mb-2 text-xl font-bold text-[#333333]">{match.awayTeam}</p>
                        {match.status === "live" && (
                          <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-4xl font-bold text-[#D32F2F]"
                          >
                            {match.awayScore}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* League Table Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <TrendingUp className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">{isArabic ? "جدول الترتيب" : "League Table"}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#D32F2F] text-white">
                      <tr>
                        <th className={`p-3 ${isArabic ? "text-right" : "text-left"} font-semibold`}>
                          {isArabic ? "المركز" : "Pos"}
                        </th>
                        <th className={`p-3 ${isArabic ? "text-right" : "text-left"} font-semibold`}>{isArabic ? "الفريق" : "Team"}</th>
                        <th className="p-3 text-center font-semibold">{isArabic ? "لعب" : "P"}</th>
                        <th className="p-3 text-center font-semibold">{isArabic ? "فاز" : "W"}</th>
                        <th className="p-3 text-center font-semibold">{isArabic ? "تعادل" : "D"}</th>
                        <th className="p-3 text-center font-semibold">{isArabic ? "خسر" : "L"}</th>
                        <th className="p-3 text-center font-semibold">{isArabic ? "النقاط" : "Pts"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => (
                        <tr
                          key={team.position}
                          className={`border-b ${
                            team.team.includes("السويحلي") || team.team.includes("Suwaihli")
                              ? "bg-[#FFD700]/20 font-bold"
                              : index % 2 === 0
                                ? "bg-white"
                                : "bg-[#F5F5F5]"
                          }`}
                        >
                          <td className="p-3 text-center">
                            <span
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                                team.position <= 3 ? "bg-[#D32F2F] text-white" : "bg-[#E0E0E0] text-[#666666]"
                              }`}
                            >
                              {team.position}
                            </span>
                          </td>
                          <td className={`p-3 ${isArabic ? "text-right" : "text-left"}`}>{team.team}</td>
                          <td className="p-3 text-center">{team.played}</td>
                          <td className="p-3 text-center">{team.won}</td>
                          <td className="p-3 text-center">{team.drawn}</td>
                          <td className="p-3 text-center">{team.lost}</td>
                          <td className="p-3 text-center font-bold text-[#D32F2F]">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Squad Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <Users className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">{isArabic ? "اللاعبون" : "Players"}</h2>
          </motion.div>

          <Tabs defaultValue="first" className="w-full" onValueChange={(value) => setSelectedTeam(value as any)}>
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-white" dir={isArabic ? "rtl" : "ltr"}>
              <TabsTrigger value="baraem" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "براعم" : "Kids"}
              </TabsTrigger>
              <TabsTrigger value="amal" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "آمال" : "Juniors"}
              </TabsTrigger>
              <TabsTrigger value="awasit" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "أواسط" : "Youth"}
              </TabsTrigger>
              <TabsTrigger value="first" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "الفريق الأول" : "First Team"}
              </TabsTrigger>
            </TabsList>

            {(["first", "awasit", "amal", "baraem"] as const).map((team) => (
              <TabsContent key={team} value={team}>
                <PlayerCarousel players={squad[team]} />
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <Newspaper className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">{isArabic ? "أخبار الفريق" : "Team News"}</h2>
          </motion.div>

          <Tabs defaultValue="first" className="w-full" onValueChange={(value) => setSelectedNewsCategory(value as any)}>
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-white" dir={isArabic ? "rtl" : "ltr"}>
              <TabsTrigger value="baraem" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "براعم" : "Kids"}
              </TabsTrigger>
              <TabsTrigger value="amal" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "آمال" : "Juniors"}
              </TabsTrigger>
              <TabsTrigger value="awasit" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "أواسط" : "Youth"}
              </TabsTrigger>
              <TabsTrigger value="first" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                {isArabic ? "الفريق الأول" : "First Team"}
              </TabsTrigger>
            </TabsList>

            {(["first", "awasit", "amal", "baraem"] as const).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {teamNews[category].map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="overflow-hidden border-2 border-[#D32F2F]/20 transition-shadow hover:shadow-lg">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="relative h-48 w-full overflow-hidden"
                        >
                          <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                        </motion.div>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center gap-2 text-sm text-[#666666]">
                            <Calendar className="h-4 w-4" />
                            <span>{news.date}</span>
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-[#333333] text-balance">{news.title}</h3>
                          <p className="text-sm leading-relaxed text-[#666666] text-pretty">{news.excerpt}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Upcoming Matches Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <Calendar className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">{isArabic ? "المباريات القادمة" : "Upcoming Matches"}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-[#D32F2F]/20">
                  <CardHeader className="bg-[#D32F2F]/5">
                    <CardTitle className="text-lg text-[#666666]">{match.competition}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex-1 text-center">
                        <p className="text-xl font-bold text-[#333333]">{match.homeTeam}</p>
                      </div>
                      <div className="px-4 text-xl font-bold text-[#666666]">VS</div>
                      <div className="flex-1 text-center">
                        <p className="text-xl font-bold text-[#333333]">{match.awayTeam}</p>
                      </div>
                    </div>
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-[#666666]">
                        <Calendar className="h-4 w-4" />
                        <span>{match.date}</span>
                        <Clock className={`${isArabic ? "ml-2" : "mr-2"} h-4 w-4`} />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#666666]">
                        <MapPin className="h-4 w-4" />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
