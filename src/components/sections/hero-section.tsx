"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { useTranslations } from "next-intl";
import useLanguage from "@/hooks/use-language";

import { cn } from "@/lib/utils";
import { ClubLogo } from "@/components/ui/club-logo";
import { SportBall } from "@/components/3d/sport-ball";

export const HeroSection = () => {
  const t = useTranslations("Hero");
  const { isArabic: isRtl } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#F5F5FA] via-[#F5F5FA] to-[#FFE5E5]">
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
                  {/* Main Logo*/}
                  <div className="relative">
                    <ClubLogo className="w-full h-full md:scale-110 scale-90 md:pr-20 pr-12" />
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-linear-to-t from-red-600/20 to-transparent rounded-full blur-3xl -z-10" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements - Updated with all sports */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 rounded-2xl"
              >
                <SportBall
                  sport="soccer"
                  scale={2.8}
                  autoRotate={true}
                  autoRotateSpeed={1.5}
                  enableShadows={false}
                  environmentPreset="studio"
                />
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
                className="absolute -bottom-10 -left-10 rounded-2xl"
              >
                <SportBall
                  sport="volleyball"
                  scale={2.8}
                  autoRotate={true}
                  autoRotateSpeed={1.5}
                  enableShadows={false}
                  environmentPreset="studio"
                />
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

              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-20 -right-20 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg"
              >
                <span className="text-2xl">🏀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
