"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import useLanguage from "@/hooks/use-language";
import { Trophy, Target, Award } from "lucide-react";

export default function AboutTheClubPage() {
  const t = useTranslations("About");
  const { isArabic: isRtl } = useLanguage();

  // Milestones data
  const milestones = [
    { year: "1974", key: "1974" },
    { year: "1985", key: "1985" },
    { year: "1992", key: "1992" },
    { year: "2005", key: "2005" },
    { year: "2015", key: "2015" },
    { year: "2024", key: "2024" },
  ];

  // Core values data
  const values = [
    { key: "excellence", icon: Trophy },
    { key: "teamwork", icon: Target },
    { key: "passion", icon: Award },
    { key: "professionalism", icon: Trophy },
    { key: "development", icon: Target },
    { key: "continuity", icon: Award },
  ];

  return (
    <div className="min-h-screen relative" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16 mt-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[var(--color-primary,#d51a2d)]">50</div>
                <div className="text-gray-600 mt-2">{t("stats.years")}</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[var(--color-primary,#d51a2d)]">5</div>
                <div className="text-gray-600 mt-2">{t("stats.sports")}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            {t("milestones.title")}
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8 mb-12 relative"
              >
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div
                    className={`absolute top-16 ${
                      isRtl ? "right-[60px]" : "left-[60px]"
                    } w-0.5 h-full bg-gray-200`}
                  />
                )}

                {/* Year badge */}
                <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary,#d51a2d)] to-red-700 flex items-center justify-center shadow-xl relative z-10">
                  <span className="text-3xl font-bold text-white">
                    {milestone.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-lg text-gray-700">
                    {t(`milestones.${milestone.key}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-4"
          >
            {t("values.title")}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary,#d51a2d)] to-red-700 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`values.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              {isRtl ? "منشآتنا الرياضية" : "Our Sports Facilities"}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {isRtl
                ? "نفخر بتقديم أحدث المنشآت الرياضية المجهزة بأعلى المعايير العالمية لخدمة رياضيينا وأعضائنا"
                : "We pride ourselves on providing state-of-the-art sports facilities equipped to the highest international standards to serve our athletes and members"}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}