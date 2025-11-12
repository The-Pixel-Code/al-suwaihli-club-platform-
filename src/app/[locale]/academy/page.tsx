"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Trophy, Target, Calendar, Newspaper, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlayerCarousel } from "@/components/player-carousel"
import useLanguage from "@/hooks/use-language"

export default function AcademyPage() {
  const t = useTranslations("Navigation")
  const { lang: locale, isArabic: isRtl } = useLanguage()

  const academyPlayers = [
    {
      id: 1,
      name: "عبدالله الصادق",
      position: "مهاجم",
      number: 10,
      age: 14,
      nationality: "ليبيا",
      image: "/academy-player-1.jpg",
    },
    {
      id: 2,
      name: "إبراهيم الزنتاني",
      position: "وسط",
      number: 8,
      age: 13,
      nationality: "ليبيا",
      image: "/academy-player-2.jpg",
    },
    {
      id: 3,
      name: "محمود الطرابلسي",
      position: "حارس مرمى",
      number: 1,
      age: 15,
      nationality: "ليبيا",
      image: "/academy-player-3.jpg",
    },
    {
      id: 4,
      name: "أمين الفيتوري",
      position: "مدافع",
      number: 4,
      age: 14,
      nationality: "ليبيا",
      image: "/academy-player-4.jpg",
    },
    {
      id: 5,
      name: "سيف الدين المبروك",
      position: "مدافع",
      number: 5,
      age: 13,
      nationality: "ليبيا",
      image: "/academy-player-5.jpg",
    },
    {
      id: 6,
      name: "حمزة الشريف",
      position: "وسط",
      number: 6,
      age: 15,
      nationality: "ليبيا",
      image: "/academy-player-6.jpg",
    },
    {
      id: 7,
      name: "عمر الهوني",
      position: "وسط",
      number: 7,
      age: 14,
      nationality: "ليبيا",
      image: "/academy-player-7.jpg",
    },
    {
      id: 8,
      name: "ياسين القذافي",
      position: "مهاجم",
      number: 9,
      age: 13,
      nationality: "ليبيا",
      image: "/academy-player-8.jpg",
    },
    {
      id: 9,
      name: "كريم الزروق",
      position: "مدافع",
      number: 3,
      age: 15,
      nationality: "ليبيا",
      image: "/academy-player-9.jpg",
    },
    {
      id: 10,
      name: "طه الكيلاني",
      position: "وسط",
      number: 11,
      age: 14,
      nationality: "ليبيا",
      image: "/academy-player-10.jpg",
    },
  ]

  const academyNews = [
    {
      id: 1,
      title: "أكاديمية السويحلي تفتح باب التسجيل للموسم الجديد",
      date: "2025-10-29",
      excerpt: "تعلن أكاديمية نادي السويحلي عن فتح باب التسجيل للموسم الجديد لجميع الفئات العمرية من 8 إلى 16 سنة.",
      image: "/academy-registration.jpg",
    },
    {
      id: 2,
      title: "لاعبو الأكاديمية يشاركون في البطولة الوطنية",
      date: "2025-10-26",
      excerpt: "يشارك فريق الأكاديمية في البطولة الوطنية للناشئين التي تقام في طرابلس الشهر القادم.",
      image: "/academy-tournament.jpg",
    },
    {
      id: 3,
      title: "ورشة تدريبية للمدربين في الأكاديمية",
      date: "2025-10-23",
      excerpt: "نظمت الأكاديمية ورشة تدريبية متخصصة للمدربين حول أحدث أساليب التدريب للناشئين.",
      image: "/academy-training-workshop.jpg",
    },
    {
      id: 4,
      title: "عبدالله الصادق يسجل هاتريك في مباراة الأكاديمية",
      date: "2025-10-20",
      excerpt: "سجل الموهبة الشابة عبدالله الصادق ثلاثة أهداف في مباراة الأكاديمية أمام أكاديمية الأهلي.",
      image: "/academy-match-goals.jpg",
    },
    {
      id: 5,
      title: "برنامج تطوير المهارات الفردية في الأكاديمية",
      date: "2025-10-17",
      excerpt: "أطلقت الأكاديمية برنامجاً جديداً لتطوير المهارات الفردية للاعبين الموهوبين.",
      image: "/academy-skills-development.jpg",
    },
    {
      id: 6,
      title: "زيارة نجوم الفريق الأول لأكاديمية الناشئين",
      date: "2025-10-14",
      excerpt: "زار نجوم الفريق الأول أكاديمية الناشئين وشاركوا في تدريب تحفيزي مع اللاعبين الصغار.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const programs = [
    {
      title: "برنامج المواهب الصغيرة",
      ageRange: "8-10 سنوات",
      description: "برنامج تأسيسي يركز على تطوير المهارات الأساسية والحب للعبة",
      features: ["تدريب 3 مرات أسبوعياً", "مدربون متخصصون", "معدات مجانية"],
    },
    {
      title: "برنامج الناشئين",
      ageRange: "11-13 سنة",
      description: "برنامج متقدم لتطوير المهارات التكتيكية والفنية",
      features: ["تدريب 4 مرات أسبوعياً", "مباريات دورية", "متابعة طبية"],
    },
    {
      title: "برنامج الشباب",
      ageRange: "14-16 سنة",
      description: "برنامج احترافي للإعداد للانضمام للفرق الأولى",
      features: ["تدريب يومي", "برامج تغذية", "تحليل أداء متقدم"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5]" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-white ${isRtl ? "text-right" : "text-left"}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-4"
            >
              <GraduationCap className="h-16 w-16" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 text-5xl font-bold"
            >
              أكاديمية السويحلي
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              نبني أبطال المستقبل
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* About Academy Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-[#D32F2F]/20">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <h2 className="mb-4 text-3xl font-bold text-[#333333]">عن الأكاديمية</h2>
                    <p className="mb-4 text-lg leading-relaxed text-[#666666]">
                      أكاديمية نادي السويحلي هي مؤسسة رياضية متخصصة في تدريب وتطوير المواهب الشابة. نوفر بيئة احترافية
                      ومدربين معتمدين لضمان تطوير مهارات اللاعبين الفنية والتكتيكية والبدنية.
                    </p>
                    <p className="text-lg leading-relaxed text-[#666666]">
                      نؤمن بأن الاستثمار في الشباب هو مفتاح النجاح المستقبلي، ولذلك نقدم برامج تدريبية شاملة تغطي جميع
                      جوانب اللعبة.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 rounded-lg bg-[#D32F2F]/5 p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D32F2F]">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#D32F2F]">200+</p>
                        <p className="text-sm text-[#666666]">لاعب في الأكاديمية</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 rounded-lg bg-[#FFD700]/10 p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD700]">
                        <Trophy className="h-6 w-6 text-[#333333]" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#D32F2F]">15+</p>
                        <p className="text-sm text-[#666666]">بطولة محلية</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 rounded-lg bg-[#D32F2F]/5 p-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D32F2F]">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#D32F2F]">25+</p>
                        <p className="text-sm text-[#666666]">لاعب انضم للفريق الأول</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Programs Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-6 flex items-center gap-3 ${isRtl ? "flex-row-reverse justify-end" : ""}`}
          >
            <Target className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">البرامج التدريبية</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-2 border-[#D32F2F]/20">
                  <CardHeader className="bg-[#D32F2F]/5">
                    <Badge className="mb-2 w-fit bg-[#D32F2F]">{program.ageRange}</Badge>
                    <CardTitle className="text-xl text-[#333333]">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className={`mb-4 text-[#666666] ${isRtl ? "text-right" : "text-left"}`}>{program.description}</p>
                    <div className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 text-sm text-[#666666] ${isRtl ? "flex-row-reverse justify-end" : ""}`}
                        >
                          <span className="mt-1 text-[#D32F2F]">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Players Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-6 flex items-center gap-3 ${isRtl ? "flex-row-reverse justify-end" : ""}`}
          >
            <Users className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">لاعبو الأكاديمية</h2>
          </motion.div>
          <PlayerCarousel players={academyPlayers} />
        </section>

        {/* News Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-6 flex items-center gap-3 ${isRtl ? "flex-row-reverse justify-end" : ""}`}
          >
            <Newspaper className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">أخبار الأكاديمية</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {academyNews.map((news, index) => (
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
                  <CardContent className={`p-4 ${isRtl ? "text-right" : "text-left"}`}>
                    <div
                      className={`mb-2 flex items-center gap-2 text-sm text-[#666666] ${isRtl ? "flex-row-reverse justify-end" : ""}`}
                    >
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
        </section>
      </div>
    </div>
  )
}
