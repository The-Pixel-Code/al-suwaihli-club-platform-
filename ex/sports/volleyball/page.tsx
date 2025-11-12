"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy, Users, Clock, TrendingUp, Newspaper } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlayerCarousel } from "@/components/player-carousel"

export default function VolleyballPage() {
  const { t, language } = useLanguage()
  const [selectedTeam, setSelectedTeam] = useState<"first" | "awasit" | "amal" | "baraem">("first")
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<"first" | "awasit" | "amal" | "baraem">("first")

  // Mock data for live scores
  const liveMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الأهلي بنغازي",
      homeSets: 2,
      awaySets: 1,
      currentSet: { home: 18, away: 15 },
      status: "live",
      set: 3,
      competition: "الدوري الليبي للكرة الطائرة",
    },
    {
      id: 2,
      homeTeam: "الاتحاد",
      awayTeam: "السويحلي",
      homeSets: 0,
      awaySets: 0,
      status: "upcoming",
      date: "2025-11-03",
      time: "17:00",
      competition: "كأس ليبيا للكرة الطائرة",
    },
  ]

  // Mock data for league standings
  const standings = [
    { position: 1, team: "السويحلي", played: 12, won: 10, lost: 2, setsWon: 32, setsLost: 12, points: 30 },
    { position: 2, team: "الأهلي بنغازي", played: 12, won: 9, lost: 3, setsWon: 30, setsLost: 15, points: 27 },
    { position: 3, team: "الاتحاد", played: 12, won: 8, lost: 4, setsWon: 28, setsLost: 18, points: 24 },
    { position: 4, team: "الأهلي طرابلس", played: 12, won: 6, lost: 6, setsWon: 22, setsLost: 22, points: 18 },
    { position: 5, team: "الهلال", played: 12, won: 4, lost: 8, setsWon: 16, setsLost: 26, points: 12 },
  ]

  // Mock data for squad
  const squad = {
    first: [
      {
        id: 1,
        name: "عبدالرحمن الفيتوري",
        position: "معد",
        number: 2,
        age: 27,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball1/280/320",
      },
      {
        id: 2,
        name: "محمد الزروق",
        position: "مهاجم",
        number: 7,
        age: 25,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball2/280/320",
      },
      {
        id: 3,
        name: "أحمد السويحلي",
        position: "مهاجم",
        number: 11,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball3/280/320",
      },
      {
        id: 4,
        name: "خالد المبروك",
        position: "صانع ألعاب",
        number: 5,
        age: 28,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball4/280/320",
      },
      {
        id: 5,
        name: "سالم الترهوني",
        position: "ليبرو",
        number: 1,
        age: 24,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball5/280/320",
      },
      {
        id: 6,
        name: "يوسف البشير",
        position: "مهاجم",
        number: 9,
        age: 23,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball6/280/320",
      },
      {
        id: 7,
        name: "عمر الفيتوري",
        position: "معد احتياطي",
        number: 4,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball7/280/320",
      },
      {
        id: 8,
        name: "حسام الدين",
        position: "مهاجم",
        number: 13,
        age: 24,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball8/280/320",
      },
    ],
    awasit: [
      {
        id: 11,
        name: "علي المهدي",
        position: "معد",
        number: 12,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball11/280/320",
      },
      {
        id: 12,
        name: "حسن الشريف",
        position: "مهاجم",
        number: 8,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball12/280/320",
      },
      {
        id: 13,
        name: "طارق الصادق",
        position: "صانع ألعاب",
        number: 14,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball13/280/320",
      },
      {
        id: 14,
        name: "ياسر الكبير",
        position: "مهاجم",
        number: 10,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball14/280/320",
      },
      {
        id: 15,
        name: "فيصل النجار",
        position: "ليبرو",
        number: 15,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball15/280/320",
      },
    ],
    amal: [
      {
        id: 17,
        name: "أمين الزروق",
        position: "معد",
        number: 20,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball17/280/320",
      },
      {
        id: 18,
        name: "بلال السويحلي",
        position: "مهاجم",
        number: 21,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball18/280/320",
      },
      {
        id: 19,
        name: "جمال الترهوني",
        position: "صانع ألعاب",
        number: 22,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball19/280/320",
      },
      {
        id: 20,
        name: "دياب المبروك",
        position: "مهاجم",
        number: 23,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball20/280/320",
      },
    ],
    baraem: [
      {
        id: 22,
        name: "زياد الفيتوري",
        position: "مهاجم",
        number: 25,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball22/280/320",
      },
      {
        id: 23,
        name: "سامي الدين",
        position: "معد",
        number: 26,
        age: 10,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball23/280/320",
      },
      {
        id: 24,
        name: "شادي الصادق",
        position: "مهاجم",
        number: 27,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/vball24/280/320",
      },
    ],
  }

  // Mock data for upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الهلال",
      date: "2025-11-08",
      time: "18:00",
      venue: "صالة السويحلي الرياضية",
      competition: "الدوري الليبي للكرة الطائرة",
    },
    {
      id: 2,
      homeTeam: "الأهلي طرابلس",
      awayTeam: "السويحلي",
      date: "2025-11-15",
      time: "19:00",
      venue: "صالة طرابلس الرياضية",
      competition: "الدوري الليبي للكرة الطائرة",
    },
  ]

  // Mock data for team news
  const teamNews = {
    first: [
      {
        id: 1,
        title: "الفريق الأول يحقق فوزاً ساحقاً على الأهلي بنغازي",
        date: "2025-10-28",
        excerpt: "حقق فريقنا الأول فوزاً مستحقاً بنتيجة 3-1 في مباراة قوية أمام الأهلي بنغازي ضمن منافسات الدوري الليبي.",
        image: "https://picsum.photos/seed/vballnews1/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 2,
        title: "عبدالرحمن الفيتوري يتوج بجائزة أفضل معد في الدوري",
        date: "2025-10-25",
        excerpt: "حصل نجم فريقنا عبدالرحمن الفيتوري على جائزة أفضل معد في الدوري الليبي للكرة الطائرة للشهر الماضي.",
        image: "https://picsum.photos/seed/vballnews2/400/300",
        tags: ["achievement"],
      },
      {
        id: 3,
        title: "تدريبات مكثفة استعداداً للمباراة القادمة",
        date: "2025-10-22",
        excerpt: "يخوض الفريق الأول تدريبات مكثفة استعداداً للمباراة الحاسمة ضد الاتحاد في الدوري.",
        image: "https://picsum.photos/seed/vballnews3/400/300",
        tags: ["training"],
      },
    ],
    awasit: [
      {
        id: 4,
        title: "فريق الأواسط يتأهل لنهائي البطولة",
        date: "2025-10-26",
        excerpt: "تأهل فريق الأواسط لنهائي البطولة بعد فوز مثير على الاتحاد بنتيجة 3-2.",
        image: "https://picsum.photos/seed/vballnews4/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 5,
        title: "علي المهدي ينضم للمعسكر التدريبي للمنتخب الوطني",
        date: "2025-10-23",
        excerpt: "تم استدعاء لاعبنا علي المهدي للانضمام إلى المعسكر التدريبي للمنتخب الوطني استعداداً للبطولة العربية.",
        image: "https://picsum.photos/seed/vballnews5/400/300",
        tags: ["announcement"],
      },
    ],
    amal: [
      {
        id: 6,
        title: "فريق الآمال يحقق المركز الأول في بطولة الناشئين",
        date: "2025-10-27",
        excerpt: "توج فريق الآمال بلقب بطولة ليبيا للناشئين بعد أداء رائع طوال البطولة.",
        image: "https://picsum.photos/seed/vballnews6/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 7,
        title: "أمين الزروق يسجل رقماً قياسياً في عدد الإرساليات الساحقة",
        date: "2025-10-24",
        excerpt: "حطم لاعبنا الشاب أمين الزروق الرقم القياسي لعدد الإرساليات الساحقة في بطولة واحدة بـ 23 إرسالية.",
        image: "https://picsum.photos/seed/vballnews7/400/300",
        tags: ["achievement"],
      },
    ],
    baraem: [
      {
        id: 8,
        title: "فريق البراعم يبدأ موسمه بفوز مستحق",
        date: "2025-10-19",
        excerpt: "افتتح فريق البراعم موسمه بفوز مستحق على فريق الهلال بنتيجة 2-1.",
        image: "https://picsum.photos/seed/vballnews8/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 9,
        title: "برنامج تدريبي خاص لتطوير مهارات البراعم",
        date: "2025-10-17",
        excerpt: "أطلق النادي برنامجاً تدريبياً خاصاً لتطوير المهارات الأساسية للاعبي فريق البراعم.",
        image: "https://picsum.photos/seed/vballnews9/400/300",
        tags: ["training"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/volleyball-match-action.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
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
              {t("volleyball")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              فريق الكرة الطائرة - نادي السويحلي الرياضي
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
            <h2 className="text-3xl font-bold text-[#333333]">المباريات المباشرة والقادمة</h2>
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
                          <Clock className="mr-1 h-3 w-3" />
                          مباشر - الشوط {match.set}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-[#D32F2F] text-[#D32F2F]">
                          <Calendar className="mr-1 h-3 w-3" />
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
                          <>
                            <motion.p
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                              className="text-4xl font-bold text-[#D32F2F]"
                            >
                              {match.homeSets}
                            </motion.p>
                            <p className="mt-2 text-sm text-[#666666]">
                              الشوط الحالي: <span className="font-bold">{match.currentSet.home}</span>
                            </p>
                          </>
                        )}
                      </div>
                      <div className="px-4 text-2xl font-bold text-[#666666]">
                        {match.status === "live" ? ":" : "VS"}
                      </div>
                      <div className="flex-1 text-center">
                        <p className="mb-2 text-xl font-bold text-[#333333]">{match.awayTeam}</p>
                        {match.status === "live" && (
                          <>
                            <motion.p
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                              className="text-4xl font-bold text-[#D32F2F]"
                            >
                              {match.awaySets}
                            </motion.p>
                            <p className="mt-2 text-sm text-[#666666]">
                              الشوط الحالي: <span className="font-bold">{match.currentSet.away}</span>
                            </p>
                          </>
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
            <h2 className="text-3xl font-bold text-[#333333]">{t("leagueTable")}</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#D32F2F] text-white">
                      <tr>
                        <th className="p-3 text-right font-semibold">المركز</th>
                        <th className="p-3 text-right font-semibold">الفريق</th>
                        <th className="p-3 text-center font-semibold">لعب</th>
                        <th className="p-3 text-center font-semibold">فاز</th>
                        <th className="p-3 text-center font-semibold">خسر</th>
                        <th className="p-3 text-center font-semibold">أشواط له</th>
                        <th className="p-3 text-center font-semibold">أشواط عليه</th>
                        <th className="p-3 text-center font-semibold">النقاط</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => (
                        <tr
                          key={team.position}
                          className={`border-b ${
                            team.team === "السويحلي"
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
                          <td className="p-3 text-right">{team.team}</td>
                          <td className="p-3 text-center">{team.played}</td>
                          <td className="p-3 text-center">{team.won}</td>
                          <td className="p-3 text-center">{team.lost}</td>
                          <td className="p-3 text-center">{team.setsWon}</td>
                          <td className="p-3 text-center">{team.setsLost}</td>
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
            <h2 className="text-3xl font-bold text-[#333333]">{t("players")}</h2>
          </motion.div>

          <Tabs defaultValue="first" className="w-full" onValueChange={(value) => setSelectedTeam(value as any)}>
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-white" dir="rtl">
              <TabsTrigger value="baraem" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                براعم
              </TabsTrigger>
              <TabsTrigger value="amal" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                آمال
              </TabsTrigger>
              <TabsTrigger value="awasit" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                أواسط
              </TabsTrigger>
              <TabsTrigger value="first" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                الفريق الأول
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
            <h2 className="text-3xl font-bold text-[#333333]">أخبار الفريق</h2>
          </motion.div>

          <Tabs
            defaultValue="first"
            className="w-full"
            onValueChange={(value) => setSelectedNewsCategory(value as any)}
          >
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-white" dir="rtl">
              <TabsTrigger value="baraem" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                براعم
              </TabsTrigger>
              <TabsTrigger value="amal" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                آمال
              </TabsTrigger>
              <TabsTrigger value="awasit" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                أواسط
              </TabsTrigger>
              <TabsTrigger value="first" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
                الفريق الأول
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
                          <Image
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            fill
                            className="object-cover"
                          />
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
            <h2 className="text-3xl font-bold text-[#333333]">المباريات القادمة</h2>
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
                        <Clock className="mr-2 h-4 w-4" />
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
