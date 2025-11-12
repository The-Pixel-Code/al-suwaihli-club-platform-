"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Calendar, Newspaper } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PlayerCarousel } from "@/components/player-carousel"

export default function OtherSportsPage() {
  const { t } = useLanguage()
  const [selectedSport, setSelectedSport] = useState<"boxing" | "karate" | "tabletennis">("boxing")

  const sportsData = {
    boxing: {
      name: "الملاكمة",
      nameEn: "Boxing",
      icon: "🥊",
      description: "فريق الملاكمة بنادي السويحلي يضم مجموعة من الملاكمين الموهوبين",
      achievements: ["بطولة ليبيا للملاكمة 2024", "3 ميداليات ذهبية في البطولة العربية"],
      players: [
        {
          id: 1,
          name: "أحمد الزروق",
          position: "وزن الريشة",
          number: 1,
          age: 24,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/boxing1/280/320",
        },
        {
          id: 2,
          name: "محمد السويحلي",
          position: "وزن الوسط",
          number: 2,
          age: 26,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/boxing2/280/320",
        },
        {
          id: 3,
          name: "خالد المبروك",
          position: "وزن الثقيل",
          number: 3,
          age: 28,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/boxing3/280/320",
        },
        {
          id: 4,
          name: "سالم الترهوني",
          position: "وزن الخفيف",
          number: 4,
          age: 23,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/boxing4/280/320",
        },
        {
          id: 5,
          name: "يوسف البشير",
          position: "وزن الوسط الثقيل",
          number: 5,
          age: 25,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/boxing5/280/320",
        },
      ],
      news: [
        {
          id: 1,
          title: "أحمد الزروق يتوج بلقب بطولة ليبيا للملاكمة",
          date: "2025-10-28",
          excerpt: "حقق ملاكمنا أحمد الزروق لقب بطولة ليبيا في وزن الريشة بعد فوز مستحق في النهائي.",
          image: "https://picsum.photos/seed/boxingnews1/400/300",
          tags: ["match", "victory"],
        },
        {
          id: 2,
          title: "محمد السويحلي يتأهل للبطولة الأفريقية",
          date: "2025-10-25",
          excerpt: "تأهل ملاكمنا محمد السويحلي لتمثيل ليبيا في البطولة الأفريقية للملاكمة المقررة في ديسمبر.",
          image: "https://picsum.photos/seed/boxingnews2/400/300",
          tags: ["announcement"],
        },
        {
          id: 3,
          title: "معسكر تدريبي مكثف للملاكمين",
          date: "2025-10-22",
          excerpt: "يخوض فريق الملاكمة معسكراً تدريبياً مكثفاً استعداداً للبطولة العربية القادمة.",
          image: "https://picsum.photos/seed/boxingnews3/400/300",
          tags: ["training"],
        },
      ],
    },
    karate: {
      name: "الكاراتيه",
      nameEn: "Karate",
      icon: "🥋",
      description: "فريق الكاراتيه بنادي السويحلي يتميز بمستوى عالٍ من الاحترافية",
      achievements: ["بطولة ليبيا للكاراتيه 2024", "5 ميداليات في البطولة العربية"],
      players: [
        {
          id: 6,
          name: "عمر الفيتوري",
          position: "كاتا",
          number: 6,
          age: 25,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate1/280/320",
        },
        {
          id: 7,
          name: "رامي الصادق",
          position: "كوميتيه - 75 كجم",
          number: 7,
          age: 27,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate2/280/320",
        },
        {
          id: 8,
          name: "طارق المهدي",
          position: "كوميتيه - 84 كجم",
          number: 8,
          age: 26,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate3/280/320",
        },
        {
          id: 9,
          name: "حسام الدين",
          position: "كاتا",
          number: 9,
          age: 24,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate4/280/320",
        },
        {
          id: 10,
          name: "فيصل النجار",
          position: "كوميتيه - 67 كجم",
          number: 10,
          age: 23,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate5/280/320",
        },
        {
          id: 11,
          name: "كريم الأسود",
          position: "كوميتيه +84 كجم",
          number: 11,
          age: 28,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/karate6/280/320",
        },
      ],
      news: [
        {
          id: 3,
          title: "عمر الفيتوري يحصد ذهبية الكاتا في البطولة الوطنية",
          date: "2025-10-27",
          excerpt: "تألق لاعبنا عمر الفيتوري وحقق الميدالية الذهبية في منافسات الكاتا ببطولة ليبيا.",
          image: "https://picsum.photos/seed/karatenews1/400/300",
          tags: ["match", "victory"],
        },
        {
          id: 4,
          title: "فريق الكاراتيه يستعد للبطولة العربية",
          date: "2025-10-24",
          excerpt: "بدأ فريق الكاراتيه معسكراً تدريبياً مكثفاً استعداداً للمشاركة في البطولة العربية القادمة.",
          image: "https://picsum.photos/seed/karatenews2/400/300",
          tags: ["training"],
        },
        {
          id: 5,
          title: "رامي الصادق يفوز بالميدالية الفضية",
          date: "2025-10-21",
          excerpt: "حقق لاعبنا رامي الصادق الميدالية الفضية في منافسات الكوميتيه وزن 75 كجم.",
          image: "https://picsum.photos/seed/karatenews3/400/300",
          tags: ["achievement"],
        },
      ],
    },
    tabletennis: {
      name: "تنس الطاولة",
      nameEn: "Table Tennis",
      icon: "🏓",
      description: "فريق تنس الطاولة بنادي السويحلي من أقوى الفرق في ليبيا",
      achievements: ["بطولة ليبيا لتنس الطاولة 2024", "المركز الثاني في البطولة العربية"],
      players: [
        {
          id: 12,
          name: "علي المهدي",
          position: "فردي رجال",
          number: 12,
          age: 26,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/tt1/280/320",
        },
        {
          id: 13,
          name: "حسن الشريف",
          position: "فردي رجال",
          number: 13,
          age: 24,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/tt2/280/320",
        },
        {
          id: 14,
          name: "طارق الصادق",
          position: "زوجي رجال",
          number: 14,
          age: 25,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/tt3/280/320",
        },
        {
          id: 15,
          name: "ياسر الكبير",
          position: "زوجي رجال",
          number: 15,
          age: 23,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/tt4/280/320",
        },
        {
          id: 16,
          name: "بلال السويحلي",
          position: "فردي رجال",
          number: 16,
          age: 27,
          nationality: "ليبيا",
          image: "https://picsum.photos/seed/tt5/280/320",
        },
      ],
      news: [
        {
          id: 5,
          title: "علي المهدي يتوج بلقب بطولة ليبيا لتنس الطاولة",
          date: "2025-10-26",
          excerpt: "حقق لاعبنا علي المهدي لقب بطولة ليبيا للفردي بعد أداء رائع في جميع المباريات.",
          image: "https://picsum.photos/seed/ttnews1/400/300",
          tags: ["match", "victory"],
        },
        {
          id: 6,
          title: "الثنائي طارق وياسر يحققان ذهبية الزوجي",
          date: "2025-10-23",
          excerpt: "توج الثنائي طارق الصادق وياسر الكبير بلقب بطولة ليبيا للزوجي بعد فوز مثير في النهائي.",
          image: "https://picsum.photos/seed/ttnews2/400/300",
          tags: ["match", "victory"],
        },
        {
          id: 7,
          title: "تدريبات مكثفة استعداداً للبطولة العربية",
          date: "2025-10-20",
          excerpt: "يخوض فريق تنس الطاولة تدريبات مكثفة استعداداً للمشاركة في البطولة العربية المقبلة.",
          image: "https://picsum.photos/seed/ttnews3/400/300",
          tags: ["training"],
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]" dir="rtl">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/sports-athletes-action.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-right"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 text-5xl font-bold"
            >
              {t("otherSports")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl"
            >
              الملاكمة، الكاراتيه، تنس الطاولة
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12" dir="rtl">
        <Tabs
          defaultValue="boxing"
          className="w-full"
          onValueChange={(value) => setSelectedSport(value as "boxing" | "karate" | "tabletennis")}
        >
          <TabsList className="mb-8 grid w-full grid-cols-3 bg-white" dir="rtl">
            <TabsTrigger
              value="tabletennis"
              className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white"
            >
              🏓 تنس الطاولة
            </TabsTrigger>
            <TabsTrigger value="karate" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
              🥋 الكاراتيه
            </TabsTrigger>
            <TabsTrigger value="boxing" className="data-[state=active]:bg-[#D32F2F] data-[state=active]:text-white">
              🥊 الملاكمة
            </TabsTrigger>
          </TabsList>

          {(["boxing", "karate", "tabletennis"] as const).map((sport) => (
            <TabsContent key={sport} value={sport}>
              {/* Sport Overview */}
              <section className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="border-2 border-[#D32F2F]/20">
                    <CardHeader className="bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white text-right">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="mb-2 text-5xl"
                      >
                        {sportsData[sport].icon}
                      </motion.div>
                      <CardTitle className="text-3xl">{sportsData[sport].name}</CardTitle>
                      <p className="text-lg opacity-90">{sportsData[sport].nameEn}</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="mb-6 text-lg text-[#666666] text-right">{sportsData[sport].description}</p>

                      {/* Achievements */}
                      <div>
                        <div className="mb-3 flex flex-row-reverse items-center gap-2 justify-end">
                          <h3 className="text-xl font-bold text-[#333333]">الإنجازات</h3>
                          <Trophy className="h-6 w-6 text-[#FFD700]" />
                        </div>
                        <div className="flex flex-wrap gap-3 justify-end">
                          {sportsData[sport].achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge variant="outline" className="border-[#D32F2F]/30 px-4 py-2 text-base">
                                <Award className="ml-2 h-4 w-4 text-[#FFD700]" />
                                {achievement}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </section>

              {/* Players Section */}
              <section className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 flex flex-row-reverse items-center gap-3 justify-end"
                >
                  <h2 className="text-3xl font-bold text-[#333333]">الرياضيون</h2>
                  <Medal className="h-8 w-8 text-[#D32F2F]" />
                </motion.div>
                <PlayerCarousel players={sportsData[sport].players} />
              </section>

              {/* News Section */}
              <section className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 flex flex-row-reverse items-center gap-3 justify-end"
                >
                  <h2 className="text-3xl font-bold text-[#333333]">الأخبار</h2>
                  <Newspaper className="h-8 w-8 text-[#D32F2F]" />
                </motion.div>
                <div className="grid gap-6 md:grid-cols-2">
                  {sportsData[sport].news.map((news, index) => (
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
                        <CardContent className="p-4 text-right">
                          <div className="mb-2 flex flex-row-reverse items-center gap-2 text-sm text-[#666666] justify-end">
                            <span>{news.date}</span>
                            <Calendar className="h-4 w-4" />
                          </div>
                          <h3 className="mb-2 text-lg font-bold text-[#333333] text-balance">{news.title}</h3>
                          <p className="text-sm leading-relaxed text-[#666666] text-pretty">{news.excerpt}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
