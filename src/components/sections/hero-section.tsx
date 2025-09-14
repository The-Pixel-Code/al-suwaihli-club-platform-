"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Trophy, Users, Calendar } from "lucide-react";
import { motion } from "motion/react";

import { useTranslations } from "next-intl";
import useLanguage from "@/hooks/use-language";

import { cn } from "@/lib/utils";
import { SoccerBall3D } from "@/components/3d/soccer-ball-3d";

export const HeroSection = () => {
  const t = useTranslations("Hero");
  const { lang: locale, isArabic: isRtl } = useLanguage();


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F5FA] via-[#F5F5FA] to-[#FFE5E5]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"
        />

        {/* Animated Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#ff0005"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "flex-1 text-center lg:text-left",
              isRtl && "lg:text-right"
            )}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6",
                isRtl ? "flex-row-reverse" : ""
              )}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">
                {t("badge")}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold mb-4",
                isRtl ? "font-[Almarai]" : "font-[Inter]"
              )}
            >
              <span className="text-gray-900">{t("title.part1")}</span>
              <br />
              <span className="text-red-600">{t("title.part2")}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "text-lg md:text-xl text-gray-600 mb-8 max-w-xl",
                isRtl ? "lg:mr-0 lg:ml-auto" : "lg:ml-0 lg:mr-auto"
              )}
            >
              {t("subtitle")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "flex flex-wrap gap-8 mb-8",
                isRtl ? "lg:justify-end" : "lg:justify-start",
                "justify-center"
              )}
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">80+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.trophies")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">5000+</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.members")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">1944</div>
                  <div className="text-sm text-gray-600">
                    {t("stats.founded")}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={cn(
                "flex flex-wrap gap-4",
                isRtl ? "lg:justify-end" : "lg:justify-start",
                "justify-center"
              )}
            >
              <Link
                href={`/${locale}/membership`}
                className="px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t("cta.join")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t("cta.learn")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Logo and Visual Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex justify-center items-center relative"
          >
            <div className="relative">
              {/* Main Logo Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Decorative Circle */}
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
                  >
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full opacity-30"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#ff0005"
                        strokeWidth="0.5"
                        strokeDasharray="5 5"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="60"
                        fill="none"
                        stroke="#FFA500"
                        strokeWidth="0.5"
                        strokeDasharray="3 7"
                      />
                    </svg>
                  </motion.div>
                  {/* Animated 3D models */}
                  <div
                    className="relative"
                  >
                    {/* Animated 3D models */}
                    <SoccerBall3D scale={4} />
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-full blur-3xl -z-10" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg"
              >
                <span className="text-2xl">🏐</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg"
              >
                <span className="text-2xl">⚽</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-20 -left-20 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg"
              >
                <span className="text-2xl">🏆</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
