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

export default function BasketballPage() {
  const { t, language } = useLanguage()
  const [selectedTeam, setSelectedTeam] = useState<"first" | "awasit" | "amal" | "baraem">("first")
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<"first" | "awasit" | "amal" | "baraem">("first")

  // Mock data for live scores
  const liveMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الأهلي بنغازي",
      homeScore: 78,
      awayScore: 72,
      status: "live",
      quarter: 4,
      timeRemaining: "3:45",
      competition: "الدوري الليبي لكرة السلة",
    },
    {
      id: 2,
      homeTeam: "الاتحاد",
      awayTeam: "السويحلي",
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      date: "2025-11-06",
      time: "19:00",
      competition: "كأس ليبيا لكرة السلة",
    },
  ]

  // Mock data for past matches
  const pastMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الهلال",
      homeScore: 92,
      awayScore: 85,
      date: "2025-10-25",
      competition: "الدوري الليبي لكرة السلة",
    },
    {
      id: 2,
      homeTeam: "الأهلي طرابلس",
      awayTeam: "السويحلي",
      homeScore: 76,
      awayScore: 88,
      date: "2025-10-20",
      competition: "الدوري الليبي لكرة السلة",
    },
    {
      id: 3,
      homeTeam: "السويحلي",
      awayTeam: "الاتحاد",
      homeScore: 95,
      awayScore: 82,
      date: "2025-10-15",
      competition: "الدوري الليبي لكرة السلة",
    },
  ]

  const squad = {
    first: [
      {
        id: 1,
        name: "محمد الصغير",
        position: "حارس",
        number: 1,
        age: 28,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball1/280/320",
      },
      {
        id: 2,
        name: "أحمد السويحلي",
        position: "جناح",
        number: 7,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball2/280/320",
      },
      {
        id: 3,
        name: "عمر الزروق",
        position: "مهاجم",
        number: 10,
        age: 29,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball3/280/320",
      },
      {
        id: 4,
        name: "سالم المبروك",
        position: "وسط",
        number: 8,
        age: 25,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball4/280/320",
      },
      {
        id: 5,
        name: "خالد الترهوني",
        position: "مركز",
        number: 15,
        age: 27,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball5/280/320",
      },
      {
        id: 6,
        name: "يوسف البشير",
        position: "جناح",
        number: 9,
        age: 24,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball6/280/320",
      },
      {
        id: 7,
        name: "عبدالرحمن القذافي",
        position: "حارس",
        number: 12,
        age: 30,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball7/280/320",
      },
      {
        id: 8,
        name: "فرج الأسود",
        position: "مهاجم",
        number: 11,
        age: 27,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball8/280/320",
      },
      {
        id: 9,
        name: "منصور الكيلاني",
        position: "وسط",
        number: 6,
        age: 25,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball9/280/320",
      },
      {
        id: 10,
        name: "رمضان الشريف",
        position: "مركز",
        number: 14,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball10/280/320",
      },
    ],
    awasit: [
      {
        id: 11,
        name: "علي المهدي",
        position: "جناح",
        number: 20,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball11/280/320",
      },
      {
        id: 12,
        name: "حسن الفيتوري",
        position: "مركز",
        number: 21,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball12/280/320",
      },
      {
        id: 13,
        name: "طارق الشريف",
        position: "حارس",
        number: 22,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball13/280/320",
      },
      {
        id: 14,
        name: "بشير الزنتاني",
        position: "وسط",
        number: 23,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball14/280/320",
      },
      {
        id: 15,
        name: "نبيل الورفلي",
        position: "مهاجم",
        number: 24,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball15/280/320",
      },
    ],
    amal: [
      {
        id: 16,
        name: "عبدالله الصادق",
        position: "جناح",
        number: 30,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball16/280/320",
      },
      {
        id: 17,
        name: "إبراهيم الزنتاني",
        position: "مركز",
        number: 31,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball17/280/320",
      },
      {
        id: 18,
        name: "محمود الطرابلسي",
        position: "حارس",
        number: 32,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball18/280/320",
      },
      {
        id: 19,
        name: "أمين الفيتوري",
        position: "وسط",
        number: 33,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball19/280/320",
      },
    ],
    baraem: [
      {
        id: 20,
        name: "كريم الزروق",
        position: "جناح",
        number: 40,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball20/280/320",
      },
      {
        id: 21,
        name: "طه الكيلاني",
        position: "مركز",
        number: 41,
        age: 10,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball21/280/320",
      },
      {
        id: 22,
        name: "زياد المبروك",
        position: "حارس",
        number: 42,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/bball22/280/320",
      },
    ],
  }

  // Mock data for upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الهلال",
      date: "2025-11-10",
      time: "18:00",
      venue: "صالة السويحلي الرياضية",
      competition: "الدوري الليبي لكرة السلة",
    },
    {
      id: 2,
      homeTeam: "الأهلي طرابلس",
      awayTeam: "السويحلي",
      date: "2025-11-17",
      time: "19:30",
      venue: "صالة طرابلس الرياضية",
      competition: "الدوري الليبي لكرة السلة",
    },
  ]

  const teamNews = {
    first: [
      {
        id: 1,
        title: "الفريق الأول يحقق فوزاً مثيراً على الأهلي بنغازي",
        date: "2025-10-29",
        excerpt: "حقق فريقنا الأول فوزاً مثيراً على الأهلي بنغازي بنتيجة 78-72 في مباراة مثيرة شهدت تألق لاعبينا.",
        image: "https://picsum.photos/seed/bballnews1/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 2,
        title: "محمد الصغير يسجل 35 نقطة في مباراة واحدة",
        date: "2025-10-26",
        excerpt: "سجل نجمنا محمد الصغير 35 نقطة في المباراة الأخيرة ليصبح أفضل هداف في الدوري هذا الموسم.",
        image: "https://picsum.photos/seed/bballnews2/400/300",
        tags: ["achievement"],
      },
      {
        id: 3,
        title: "المدرب يشيد بروح الفريق والانضباط التكتيكي",
        date: "2025-10-23",
        excerpt: "أشاد المدرب الفني بروح الفريق والانضباط التكتيكي الذي أظهره اللاعبون في المباريات الأخيرة.",
        image: "https://picsum.photos/seed/bballnews3/400/300",
        tags: ["training"],
      },
    ],
    awasit: [
      {
        id: 4,
        title: "فريق الأواسط يتأهل لنصف النهائي",
        date: "2025-10-28",
        excerpt: "تأهل فريق الأواسط لنصف نهائي البطولة بعد فوز مستحق على فريق الاتحاد.",
        image: "https://picsum.photos/seed/bballnews4/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 5,
        title: "تطور ملحوظ في أداء لاعبي الأواسط",
        date: "2025-10-25",
        excerpt: "أشاد المدرب بالتطور الكبير في مستوى لاعبي فريق الأواسط خلال الفترة الأخيرة.",
        image: "https://picsum.photos/seed/bballnews5/400/300",
        tags: ["training"],
      },
    ],
    amal: [
      {
        id: 6,
        title: "فريق الآمال يحقق انتصاراً كبيراً",
        date: "2025-10-27",
        excerpt: "فاز فريق الآمال على منافسه بفارق 20 نقطة في مباراة مثيرة ضمن البطولة المحلية.",
        image: "https://picsum.photos/seed/bballnews6/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 7,
        title: "برنامج تدريبي خاص للاعبي الآمال",
        date: "2025-10-24",
        excerpt: "أطلق النادي برنامجاً تدريبياً خاصاً لتطوير المهارات الأساسية للاعبي فريق الآمال.",
        image: "https://picsum.photos/seed/bballnews7/400/300",
        tags: ["training"],
      },
    ],
    baraem: [
      {
        id: 8,
        title: "فريق البراعم يبدأ موسمه بفوز مستحق",
        date: "2025-10-26",
        excerpt: "افتتح فريق البراعم موسمه بفوز مستحق على فريق الهلال في مباراة ممتعة.",
        image: "https://picsum.photos/seed/bballnews8/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 9,
        title: "تكريم لاعبي البراعم المتميزين",
        date: "2025-10-23",
        excerpt: "كرم النادي مجموعة من لاعبي فريق البراعم المتميزين تقديراً لجهودهم.",
        image: "https://picsum.photos/seed/bballnews9/400/300",
        tags: ["announcement"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/basketball-court.jpg')] bg-cover bg-center opacity-20" />
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
              كرة السلة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              فريق كرة السلة - نادي السويحلي الرياضي
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
                          مباشر - الربع {match.quarter} - {match.timeRemaining}
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
                      <div className="px-4 text-2xl font-bold text-[#666666]">
                        {match.status === "live" ? ":" : "VS"}
                      </div>
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
            <h2 className="text-3xl font-bold text-[#333333]">اللاعبون</h2>
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

        {/* Past Matches Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <TrendingUp className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">المباريات السابقة</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-2 border-[#D32F2F]/20">
                  <CardHeader className="bg-[#D32F2F]/5 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#666666]">{match.competition}</span>
                      <span className="text-sm text-[#666666]">{match.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-center">
                        <p className="mb-2 text-lg font-bold text-[#333333]">{match.homeTeam}</p>
                        <p className="text-3xl font-bold text-[#D32F2F]">{match.homeScore}</p>
                      </div>
                      <div className="px-4 text-xl font-bold text-[#666666]">-</div>
                      <div className="flex-1 text-center">
                        <p className="mb-2 text-lg font-bold text-[#333333]">{match.awayTeam}</p>
                        <p className="text-3xl font-bold text-[#D32F2F]">{match.awayScore}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
