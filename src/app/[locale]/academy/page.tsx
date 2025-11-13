"use client"

import useLanguage from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Trophy, Target, Calendar, Newspaper, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlayerCarousel } from "@/components/player-carousel"

export default function AcademyPage() {
  const { isArabic } = useLanguage()

  // Mock data for academy players
  const academyPlayers = [
    {
      id: 1,
      name: isArabic ? "عبدالله الصادق" : "Abdullah Al-Sadiq",
      position: isArabic ? "مهاجم" : "Forward",
      number: 10,
      age: 14,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 2,
      name: isArabic ? "إبراهيم الزنتاني" : "Ibrahim Al-Zentani",
      position: isArabic ? "وسط" : "Midfielder",
      number: 8,
      age: 13,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 3,
      name: isArabic ? "محمود الطرابلسي" : "Mahmoud Al-Tarabulsi",
      position: isArabic ? "حارس مرمى" : "Goalkeeper",
      number: 1,
      age: 15,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 4,
      name: isArabic ? "أمين الفيتوري" : "Amin Al-Fayturi",
      position: isArabic ? "مدافع" : "Defender",
      number: 4,
      age: 14,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 5,
      name: isArabic ? "سيف الدين المبروك" : "Saif Al-Din Al-Mabrouk",
      position: isArabic ? "مدافع" : "Defender",
      number: 5,
      age: 13,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 6,
      name: isArabic ? "حمزة الشريف" : "Hamza Al-Sharif",
      position: isArabic ? "وسط" : "Midfielder",
      number: 6,
      age: 15,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 7,
      name: isArabic ? "عمر الهوني" : "Omar Al-Houni",
      position: isArabic ? "وسط" : "Midfielder",
      number: 7,
      age: 14,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 8,
      name: isArabic ? "ياسين القذافي" : "Yassin Al-Gaddafi",
      position: isArabic ? "مهاجم" : "Forward",
      number: 9,
      age: 13,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 9,
      name: isArabic ? "كريم الزروق" : "Karim Al-Zarouq",
      position: isArabic ? "مدافع" : "Defender",
      number: 3,
      age: 15,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
    {
      id: 10,
      name: isArabic ? "طه الكيلاني" : "Taha Al-Kilani",
      position: isArabic ? "وسط" : "Midfielder",
      number: 11,
      age: 14,
      nationality: isArabic ? "ليبيا" : "Libya",
      image: "/placeholder.svg?height=320&width=280",
    },
  ]

  // Mock data for academy news
  const academyNews = [
    {
      id: 1,
      title: isArabic ? "أكاديمية السويحلي تفتح باب التسجيل للموسم الجديد" : "Al-Suwaihli Academy Opens Registration for New Season",
      date: "2025-10-29",
      excerpt: isArabic
        ? "تعلن أكاديمية نادي السويحلي عن فتح باب التسجيل للموسم الجديد لجميع الفئات العمرية من 8 إلى 16 سنة."
        : "Al-Suwaihli Club Academy announces the opening of registration for the new season for all age groups from 8 to 16 years.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: isArabic ? "لاعبو الأكاديمية يشاركون في البطولة الوطنية" : "Academy Players Participate in National Championship",
      date: "2025-10-26",
      excerpt: isArabic
        ? "يشارك فريق الأكاديمية في البطولة الوطنية للناشئين التي تقام في طرابلس الشهر القادم."
        : "The academy team will participate in the National Youth Championship to be held in Tripoli next month.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: isArabic ? "ورشة تدريبية للمدربين في الأكاديمية" : "Training Workshop for Academy Coaches",
      date: "2025-10-23",
      excerpt: isArabic
        ? "نظمت الأكاديمية ورشة تدريبية متخصصة للمدربين حول أحدث أساليب التدريب للناشئين."
        : "The academy organized a specialized training workshop for coaches on the latest youth training methods.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: isArabic ? "عبدالله الصادق يسجل هاتريك في مباراة الأكاديمية" : "Abdullah Al-Sadiq Scores Hat-trick in Academy Match",
      date: "2025-10-20",
      excerpt: isArabic
        ? "سجل الموهبة الشابة عبدالله الصادق ثلاثة أهداف في مباراة الأكاديمية أمام أكاديمية الأهلي."
        : "Young talent Abdullah Al-Sadiq scored three goals in the academy match against Al-Ahly Academy.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: isArabic ? "برنامج تطوير المهارات الفردية في الأكاديمية" : "Individual Skills Development Program at the Academy",
      date: "2025-10-17",
      excerpt: isArabic
        ? "أطلقت الأكاديمية برنامجاً جديداً لتطوير المهارات الفردية للاعبين الموهوبين."
        : "The academy launched a new program to develop individual skills for talented players.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: isArabic ? "زيارة نجوم الفريق الأول لأكاديمية الناشئين" : "First Team Stars Visit Youth Academy",
      date: "2025-10-14",
      excerpt: isArabic
        ? "زار نجوم الفريق الأول أكاديمية الناشئين وشاركوا في تدريب تحفيزي مع اللاعبين الصغار."
        : "First team stars visited the youth academy and participated in a motivational training session with young players.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const programs = [
    {
      title: isArabic ? "برنامج المواهب الصغيرة" : "Young Talents Program",
      ageRange: isArabic ? "8-10 سنوات" : "8-10 years",
      description: isArabic
        ? "برنامج تأسيسي يركز على تطوير المهارات الأساسية والحب للعبة"
        : "Foundational program focusing on developing basic skills and love for the game",
      features: isArabic
        ? ["تدريب 3 مرات أسبوعياً", "مدربون متخصصون", "معدات مجانية"]
        : ["Training 3 times per week", "Specialized coaches", "Free equipment"],
    },
    {
      title: isArabic ? "برنامج الناشئين" : "Youth Program",
      ageRange: isArabic ? "11-13 سنة" : "11-13 years",
      description: isArabic
        ? "برنامج متقدم لتطوير المهارات التكتيكية والفنية"
        : "Advanced program for developing tactical and technical skills",
      features: isArabic
        ? ["تدريب 4 مرات أسبوعياً", "مباريات دورية", "متابعة طبية"]
        : ["Training 4 times per week", "Regular matches", "Medical follow-up"],
    },
    {
      title: isArabic ? "برنامج الشباب" : "Junior Program",
      ageRange: isArabic ? "14-16 سنة" : "14-16 years",
      description: isArabic
        ? "برنامج احترافي للإعداد للانضمام للفرق الأولى"
        : "Professional program preparing for first team transition",
      features: isArabic
        ? ["تدريب يومي", "برامج تغذية", "تحليل أداء متقدم"]
        : ["Daily training", "Nutrition programs", "Advanced performance analysis"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5]" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/academy-training.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
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
              {isArabic ? "أكاديمية السويحلي" : "Al-Suwaihli Academy"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              {isArabic ? "نبني أبطال المستقبل" : "Building Tomorrow's Champions"}
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
                  <div>
                    <h2 className="mb-4 text-3xl font-bold text-[#333333]">
                      {isArabic ? "عن الأكاديمية" : "About the Academy"}
                    </h2>
                    <p className="mb-4 text-lg leading-relaxed text-[#666666]">
                      {isArabic
                        ? "أكاديمية نادي السويحلي هي مؤسسة رياضية متخصصة في تدريب وتطوير المواهب الشابة. نوفر بيئة احترافية ومدربين معتمدين لضمان تطوير مهارات اللاعبين الفنية والتكتيكية والبدنية."
                        : "Al-Suwaihli Club Academy is a specialized sports institution dedicated to training and developing young talents. We provide a professional environment and certified coaches to ensure the development of players' technical, tactical, and physical skills."}
                    </p>
                    <p className="text-lg leading-relaxed text-[#666666]">
                      {isArabic
                        ? "نؤمن بأن الاستثمار في الشباب هو مفتاح النجاح المستقبلي، ولذلك نقدم برامج تدريبية شاملة تغطي جميع جوانب اللعبة."
                        : "We believe that investing in youth is the key to future success, which is why we offer comprehensive training programs covering all aspects of the game."}
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
                        <p className="text-sm text-[#666666]">
                          {isArabic ? "لاعب في الأكاديمية" : "Players in Academy"}
                        </p>
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
                        <p className="text-sm text-[#666666]">
                          {isArabic ? "بطولة محلية" : "Local Championships"}
                        </p>
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
                        <p className="text-sm text-[#666666]">
                          {isArabic ? "لاعب انضم للفريق الأول" : "Players Promoted to First Team"}
                        </p>
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
            className="mb-6 flex items-center gap-3"
          >
            <Target className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">
              {isArabic ? "البرامج التدريبية" : "Training Programs"}
            </h2>
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
                    <p className="mb-4 text-[#666666]">{program.description}</p>
                    <div className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-[#666666]">
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
            className="mb-6 flex items-center gap-3"
          >
            <Users className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">
              {isArabic ? "لاعبو الأكاديمية" : "Academy Players"}
            </h2>
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
            className="mb-6 flex items-center gap-3"
          >
            <Newspaper className="h-8 w-8 text-[#D32F2F]" />
            <h2 className="text-3xl font-bold text-[#333333]">
              {isArabic ? "أخبار الأكاديمية" : "Academy News"}
            </h2>
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
        </section>
      </div>
    </div>
  )
}
