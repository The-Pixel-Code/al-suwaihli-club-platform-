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

export default function FootballPage() {
  const { t, language } = useLanguage()
  const [selectedTeam, setSelectedTeam] = useState<"first" | "awasit" | "amal" | "baraem">("first")
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<"first" | "awasit" | "amal" | "baraem">("first")

  // Mock data for live scores
  const liveMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الأهلي طرابلس",
      homeScore: 2,
      awayScore: 1,
      status: "live",
      minute: 67,
      competition: "الدوري الليبي الممتاز",
    },
    {
      id: 2,
      homeTeam: "الاتحاد",
      awayTeam: "السويحلي",
      homeScore: 0,
      awayScore: 0,
      status: "upcoming",
      date: "2025-11-01",
      time: "18:00",
      competition: "كأس ليبيا",
    },
  ]

  // Mock data for league standings
  const standings = [
    { position: 1, team: "الأهلي بنغازي", played: 15, won: 11, drawn: 3, lost: 1, gf: 32, ga: 10, gd: 22, points: 36 },
    { position: 2, team: "السويحلي", played: 15, won: 10, drawn: 4, lost: 1, gf: 28, ga: 12, gd: 16, points: 34 },
    { position: 3, team: "الأهلي طرابلس", played: 15, won: 9, drawn: 3, lost: 3, gf: 25, ga: 15, gd: 10, points: 30 },
    { position: 4, team: "الاتحاد", played: 15, won: 8, drawn: 4, lost: 3, gf: 22, ga: 14, gd: 8, points: 28 },
    { position: 5, team: "الهلال", played: 15, won: 7, drawn: 5, lost: 3, gf: 20, ga: 16, gd: 4, points: 26 },
  ]

  // Mock data for squad
  const squad = {
    first: [
      {
        id: 1,
        name: "محمد الصغير",
        position: "حارس مرمى",
        number: 1,
        age: 28,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player1/280/320",
      },
      {
        id: 2,
        name: "أحمد السويحلي",
        position: "مدافع",
        number: 4,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player2/280/320",
      },
      {
        id: 3,
        name: "عمر الزروق",
        position: "مدافع",
        number: 5,
        age: 29,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player3/280/320",
      },
      {
        id: 4,
        name: "سالم المبروك",
        position: "وسط",
        number: 8,
        age: 25,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player4/280/320",
      },
      {
        id: 5,
        name: "خالد الترهوني",
        position: "وسط",
        number: 10,
        age: 27,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player5/280/320",
      },
      {
        id: 6,
        name: "يوسف البشير",
        position: "مهاجم",
        number: 9,
        age: 24,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player6/280/320",
      },
      {
        id: 7,
        name: "عبدالرحمن القذافي",
        position: "حارس مرمى",
        number: 12,
        age: 30,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player7/280/320",
      },
      {
        id: 8,
        name: "فرج الأسود",
        position: "مدافع",
        number: 2,
        age: 27,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player8/280/320",
      },
      {
        id: 9,
        name: "منصور الكيلاني",
        position: "مدافع",
        number: 3,
        age: 25,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player9/280/320",
      },
      {
        id: 10,
        name: "رمضان الشريف",
        position: "وسط",
        number: 6,
        age: 26,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player10/280/320",
      },
      {
        id: 11,
        name: "عماد الدين الطرابلسي",
        position: "وسط",
        number: 7,
        age: 28,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player11/280/320",
      },
      {
        id: 12,
        name: "معتز الهوني",
        position: "مهاجم",
        number: 11,
        age: 23,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player12/280/320",
      },
    ],
    awasit: [
      {
        id: 13,
        name: "علي المهدي",
        position: "حارس مرمى",
        number: 22,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player13/280/320",
      },
      {
        id: 14,
        name: "حسن الفيتوري",
        position: "مدافع",
        number: 15,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player14/280/320",
      },
      {
        id: 15,
        name: "طارق الشريف",
        position: "وسط",
        number: 18,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player15/280/320",
      },
      {
        id: 16,
        name: "بشير الزنتاني",
        position: "مدافع",
        number: 13,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player16/280/320",
      },
      {
        id: 17,
        name: "نبيل الورفلي",
        position: "وسط",
        number: 16,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player17/280/320",
      },
      {
        id: 18,
        name: "أسامة المصراتي",
        position: "مهاجم",
        number: 19,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player18/280/320",
      },
      {
        id: 19,
        name: "وليد البوسيفي",
        position: "مدافع",
        number: 14,
        age: 15,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player19/280/320",
      },
      {
        id: 20,
        name: "جمال الدين الساحلي",
        position: "وسط",
        number: 17,
        age: 14,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player20/280/320",
      },
    ],
    amal: [
      {
        id: 21,
        name: "عبدالله الصادق",
        position: "مهاجم",
        number: 11,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player21/280/320",
      },
      {
        id: 22,
        name: "إبراهيم الزنتاني",
        position: "وسط",
        number: 14,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player22/280/320",
      },
      {
        id: 23,
        name: "محمود الطرابلسي",
        position: "حارس مرمى",
        number: 1,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player23/280/320",
      },
      {
        id: 24,
        name: "أمين الفيتوري",
        position: "مدافع",
        number: 4,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player24/280/320",
      },
      {
        id: 25,
        name: "سيف الدين المبروك",
        position: "مدافع",
        number: 5,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player25/280/320",
      },
      {
        id: 26,
        name: "حمزة الشريف",
        position: "وسط",
        number: 8,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player26/280/320",
      },
      {
        id: 27,
        name: "عمر الهوني",
        position: "وسط",
        number: 10,
        age: 13,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player27/280/320",
      },
      {
        id: 28,
        name: "ياسين القذافي",
        position: "مهاجم",
        number: 9,
        age: 12,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player28/280/320",
      },
    ],
    baraem: [
      {
        id: 29,
        name: "كريم الزروق",
        position: "مدافع",
        number: 3,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player29/280/320",
      },
      {
        id: 30,
        name: "طه الكيلاني",
        position: "وسط",
        number: 6,
        age: 10,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player30/280/320",
      },
      {
        id: 31,
        name: "زياد المبروك",
        position: "حارس مرمى",
        number: 1,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player31/280/320",
      },
      {
        id: 32,
        name: "فيصل الترهوني",
        position: "مهاجم",
        number: 9,
        age: 10,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player32/280/320",
      },
      {
        id: 33,
        name: "ماجد الشريف",
        position: "مدافع",
        number: 4,
        age: 11,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player33/280/320",
      },
      {
        id: 34,
        name: "نادر الهوني",
        position: "وسط",
        number: 8,
        age: 10,
        nationality: "ليبيا",
        image: "https://picsum.photos/seed/player34/280/320",
      },
    ],
  }

  // Mock data for upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الهلال",
      date: "2025-11-05",
      time: "16:00",
      venue: "ملعب السويحلي",
      competition: "الدوري الليبي الممتاز",
    },
    {
      id: 2,
      homeTeam: "الأهلي بنغازي",
      awayTeam: "السويحلي",
      date: "2025-11-12",
      time: "18:30",
      venue: "ملعب بنغازي",
      competition: "الدوري الليبي الممتاز",
    },
  ]

  // Mock data for news
  const teamNews = {
    first: [
      {
        id: 1,
        title: "الفريق الأول يحقق فوزاً مهماً على الأهلي طرابلس",
        date: "2025-10-20",
        excerpt:
          "حقق الفريق الأول لنادي السويحلي فوزاً مستحقاً على الأهلي طرابلس بنتيجة 2-1 في مباراة مثيرة شهدها ملعب السويحلي.",
        image: "https://picsum.photos/seed/news1/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 2,
        title: "المدرب يشيد بأداء اللاعبين في التدريبات",
        date: "2025-10-18",
        excerpt: "أشاد المدرب الفني للفريق الأول بمستوى اللاعبين خلال التدريبات الأخيرة استعداداً للمباراة القادمة.",
        image: "https://picsum.photos/seed/news2/400/300",
        tags: ["training"],
      },
      {
        id: 3,
        title: "يوسف البشير يتصدر قائمة الهدافين",
        date: "2025-10-15",
        excerpt: "واصل المهاجم يوسف البشير تألقه ليتصدر قائمة هدافي الدوري الليبي برصيد 12 هدفاً.",
        image: "https://picsum.photos/seed/news3/400/300",
        tags: ["achievement"],
      },
      {
        id: 4,
        title: "تعاقد جديد مع لاعب دولي",
        date: "2025-10-12",
        excerpt: "أعلن النادي عن التعاقد مع لاعب دولي جديد لتعزيز صفوف الفريق الأول في الموسم الحالي.",
        image: "https://picsum.photos/seed/news4/400/300",
        tags: ["announcement"],
      },
    ],
    awasit: [
      {
        id: 5,
        title: "فريق الأواسط يتأهل لنهائي البطولة",
        date: "2025-10-19",
        excerpt: "تأهل فريق الأواسط لنهائي البطولة بعد فوزه على فريق الاتحاد بركلات الترجيح.",
        image: "https://picsum.photos/seed/news5/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 6,
        title: "ترقية لاعبين من فريق الأواسط للفريق الأول",
        date: "2025-10-16",
        excerpt: "قرر الجهاز الفني ترقية ثلاثة لاعبين من فريق الأواسط للمشاركة مع الفريق الأول في المباريات القادمة.",
        image: "https://picsum.photos/seed/news6/400/300",
        tags: ["announcement"],
      },
      {
        id: 7,
        title: "معسكر تدريبي مكثف لفريق الأواسط",
        date: "2025-10-13",
        excerpt: "يخوض فريق الأواسط معسكر تدريبياً مكثفاً استعداداً للمباريات الحاسمة في البطولة.",
        image: "https://picsum.photos/seed/news7/400/300",
        tags: ["training"],
      },
    ],
    amal: [
      {
        id: 8,
        title: "فريق الآمال يحقق الفوز الخامس على التوالي",
        date: "2025-10-21",
        excerpt: "واصل فريق الآمال انتصاراته المتتالية بفوزه على فريق الهلال بثلاثة أهداف نظيفة.",
        image: "https://picsum.photos/seed/news8/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 9,
        title: "موهبة شابة تلفت أنظار الأندية الأوروبية",
        date: "2025-10-17",
        excerpt: "لفت اللاعب الشاب عبدالله الصادق أنظار عدة أندية أوروبية بعد أدائه المميز في البطولة الإفريقية.",
        image: "https://picsum.photos/seed/news9/400/300",
        tags: ["achievement"],
      },
      {
        id: 10,
        title: "برنامج تطوير خاص للاعبي الآمال",
        date: "2025-10-14",
        excerpt: "أطلق النادي برنامجاً تطويرياً خاصاً للاعبي فريق الآمال لصقل مهاراتهم الفنية والبدنية.",
        image: "https://picsum.photos/seed/news10/400/300",
        tags: ["training"],
      },
    ],
    baraem: [
      {
        id: 11,
        title: "فريق البراعم يفوز ببطولة المنطقة",
        date: "2025-10-22",
        excerpt: "حقق فريق البراعم لقب بطولة المنطقة بعد فوزه في المباراة النهائية بنتيجة 3-1.",
        image: "https://picsum.photos/seed/news11/400/300",
        tags: ["match", "victory"],
      },
      {
        id: 12,
        title: "معسكر تدريبي صيفي لفريق البراعم",
        date: "2025-10-14",
        excerpt: "يخوض فريق البراعم معسكر تدريبياً صيفياً استعداداً للبطولة الوطنية المقررة الشهر القادم.",
        image: "https://picsum.photos/seed/news12/400/300",
        tags: ["training"],
      },
      {
        id: 13,
        title: "تكريم لاعبي البراعم المتميزين",
        date: "2025-10-11",
        excerpt: "كرم النادي مجموعة من لاعبي فريق البراعم المتميزين تقديراً لجهودهم وإنجازاتهم.",
        image: "https://picsum.photos/seed/news13/400/300",
        tags: ["announcement"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/football-stadium-crowd.png')] bg-cover bg-center opacity-20" />
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
              {t("football")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              فريق كرة القدم - نادي السويحلي الرياضي
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
                          مباشر - {match.minute}'
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
                        <th className="p-3 text-center font-semibold">تعادل</th>
                        <th className="p-3 text-center font-semibold">خسر</th>
                        <th className="p-3 text-center font-semibold">له</th>
                        <th className="p-3 text-center font-semibold">عليه</th>
                        <th className="p-3 text-center font-semibold">الفارق</th>
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
                          <td className="p-3 text-center">{team.drawn}</td>
                          <td className="p-3 text-center">{team.lost}</td>
                          <td className="p-3 text-center">{team.gf}</td>
                          <td className="p-3 text-center">{team.ga}</td>
                          <td className="p-3 text-center font-semibold">{team.gd > 0 ? `+${team.gd}` : team.gd}</td>
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
