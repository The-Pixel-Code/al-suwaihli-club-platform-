"use client";
import { motion } from "motion/react";

export const AnimatedSportsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Removed top and bottom bars */}

      {/* Modern Gradient Orbs - Reduced red, added more variety */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-linear-to-tl from-amber-400/12 via-orange-500/8 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-linear-to-r from-teal-500/8 to-cyan-500/6 rounded-full blur-3xl"
      />

      {/* Additional subtle orb for depth */}
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-linear-to-bl from-indigo-500/8 to-transparent rounded-full blur-3xl"
      />

      {/* Modern Hexagonal Pattern */}
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="modern-hex"
              width="60"
              height="52"
              patternUnits="userSpaceOnUse"
            >
              {/* Hexagon pattern */}
              <path
                d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z"
                fill="none"
                stroke="url(#hexGradient)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient
              id="hexGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#modern-hex)" />
        </svg>
      </motion.div>

      {/* Modern Sport Field Elements - Subtle and Contemporary */}
      <motion.div
        animate={{
          opacity: [0.02, 0.06, 0.02],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center circle - modern sport field */}
          <circle
            cx="600"
            cy="400"
            r="100"
            fill="none"
            stroke="url(#circleGradient)"
            strokeWidth="1.5"
            opacity="0.3"
            strokeDasharray="5 10"
          />
          <circle
            cx="600"
            cy="400"
            r="60"
            fill="none"
            stroke="url(#circleGradient)"
            strokeWidth="1"
            opacity="0.25"
          />

          {/* Modern corner accents */}
          <path
            d="M 50 50 Q 50 150, 150 150"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            opacity="0.2"
          />
          <path
            d="M 1150 50 Q 1150 150, 1050 150"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity="0.2"
          />

          <defs>
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Modern light sweep - reduced red, added gradient variety */}
      <motion.div
        animate={{
          x: [-200, 1400],
          opacity: [0, 0.12, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-0 left-0 w-96 h-full bg-linear-to-r from-transparent via-blue-500/8 to-transparent rotate-12 blur-xl"
      />
      <motion.div
        animate={{
          x: [1400, -200],
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 6,
        }}
        className="absolute bottom-0 right-0 w-96 h-full bg-linear-to-l from-transparent via-purple-500/8 to-transparent -rotate-12 blur-xl"
      />

      {/* Modern floating sport icons - More subtle and varied */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 text-blue-500/6 text-9xl"
      >
        ⚽
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -8, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 right-1/4 text-orange-500/7 text-8xl"
      >
        🏀
      </motion.div>
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 right-1/3 text-purple-500/6 text-7xl -rotate-45"
      >
        🏆
      </motion.div>
      {/* Modern corner glows - colorful and contemporary */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-blue-500/15 via-purple-500/10 to-transparent rounded-br-full blur-2xl"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-orange-500/15 via-amber-500/10 to-transparent rounded-tl-full blur-2xl"
      />

      {/* Additional modern accents */}
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full"
      />
      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/8 rounded-full"
      />
    </div>
  );
};
