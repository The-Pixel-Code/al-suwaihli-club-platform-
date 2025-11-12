"use client";

import type React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PaginationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
  isRtl?: boolean;
  className?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total,
  current,
  onChange,
  isRtl = false,
  className,
}) => (
  <div
    className={cn("flex justify-center gap-2 mt-8", className)}
    role="tablist"
    aria-label={isRtl ? "التنقل بين الشرائح" : "Slide navigation"}
  >
    {Array.from({ length: total }, (_, index) => {
      const isActive = index === current;
      return (
        <button
          key={index}
          onClick={() => onChange(index)}
          role="tab"
          aria-selected={isActive}
          aria-label={
            isRtl
              ? `الشريحة ${index + 1} من ${total}`
              : `Slide ${index + 1} of ${total}`
          }
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
            isActive
              ? "w-12 h-3 rounded-full"
              : "w-3 h-3 rounded-full hover:w-4"
          )}
        >
          {/* Background */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300",
              isActive
                ? "bg-gradient-to-r from-red-600 to-red-500"
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />

          {/* Animated shine effect for active dot */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          )}
        </button>
      );
    })}
  </div>
);
