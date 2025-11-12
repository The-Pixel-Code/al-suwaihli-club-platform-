"use client";

/**
 * AnimatedSportsBackground Component
 *
 * Dynamic red/dark halftone-style background with animated circular dots.
 * Optimized for performance with CSS animations and GPU acceleration.
 * Supports prefers-reduced-motion for accessibility.
 *
 * Animation Logic:
 * - Circular Dots: Halftone gradient pattern with decreasing size and opacity
 * - Movement: Subtle left-to-right flowing motion with shimmer effect
 * - Floating Dots: Decorative individual dots with random floating animations
 * - All animations use translate3d for GPU acceleration and will-change hints
 *
 * Features:
 * - Tailwind CSS-based styling with custom CSS for animations
 * - GPU-optimized transforms with will-change hints
 * - Optional dark red background (can be disabled)
 * - Full accessibility support with prefers-reduced-motion
 * - Staggered animation delays for natural, flowing motion
 * - Decorative floating dots with varied sizes and colors (red/gold)
 */

interface AnimatedSportsBackgroundProps {
  /** Show dark red gradient background (default: true) */
  showDarkBackground?: boolean;
  /** Show decorative floating dots (default: true) */
  showFloatingDots?: boolean;
}

export const AnimatedSportsBackground = ({
  showDarkBackground = true,
  showFloatingDots = true,
}: AnimatedSportsBackgroundProps = {}) => {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
      role="presentation"
    >
      {/* Base gradient background - deep red to dark (conditional) */}
      {showDarkBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#3a0000] to-[#5a0000]" />
      )}

      {/* Animated Dot Rows - Halftone Pattern Effect */}
      {/* Row 1 - Top, largest dots */}
      <div
        className="dot-row absolute top-0 left-0 w-full h-[12%] opacity-40 motion-reduce:opacity-20 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 50, 50, 0.6) 8px, transparent 8px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0",
          animation: "flowRight 22s linear infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 2 */}
      <div
        className="dot-row absolute top-[12%] left-0 w-full h-[12%] opacity-45 motion-reduce:opacity-20 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 40, 40, 0.55) 7px, transparent 7px)",
          backgroundSize: "55px 55px",
          backgroundPosition: "15px 0",
          animation: "flowRight 20s linear infinite 0.5s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 3 */}
      <div
        className="dot-row absolute top-[24%] left-0 w-full h-[12%] opacity-50 motion-reduce:opacity-20 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(200, 30, 30, 0.5) 6px, transparent 6px)",
          backgroundSize: "50px 50px",
          backgroundPosition: "30px 0",
          animation: "flowRight 19s linear infinite 1s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 4 - Center, medium dots */}
      <div
        className="dot-row absolute top-[36%] left-0 w-full h-[12%] opacity-35 motion-reduce:opacity-15 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(180, 25, 25, 0.45) 5px, transparent 5px)",
          backgroundSize: "45px 45px",
          backgroundPosition: "10px 0",
          animation: "flowRight 21s linear infinite 1.5s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 5 */}
      <div
        className="dot-row absolute top-[48%] left-0 w-full h-[12%] opacity-30 motion-reduce:opacity-15 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(160, 20, 20, 0.4) 4px, transparent 4px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "25px 0",
          animation: "flowRight 18s linear infinite 2s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 6 */}
      <div
        className="dot-row absolute top-[60%] left-0 w-full h-[12%] opacity-25 motion-reduce:opacity-10 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(140, 15, 15, 0.35) 3.5px, transparent 3.5px)",
          backgroundSize: "35px 35px",
          backgroundPosition: "5px 0",
          animation: "flowRight 20s linear infinite 2.5s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 7 */}
      <div
        className="dot-row absolute top-[72%] left-0 w-full h-[12%] opacity-20 motion-reduce:opacity-10 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(120, 10, 10, 0.3) 3px, transparent 3px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "20px 0",
          animation: "flowRight 19s linear infinite 3s",
          willChange: "transform, opacity",
        }}
      />

      {/* Row 8 - Bottom, smallest dots */}
      <div
        className="dot-row absolute top-[84%] left-0 w-full h-[16%] opacity-15 motion-reduce:opacity-8 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 5, 5, 0.25) 2.5px, transparent 2.5px)",
          backgroundSize: "25px 25px",
          backgroundPosition: "12px 0",
          animation: "flowRight 21s linear infinite 3.5s",
          willChange: "transform, opacity",
        }}
      />

      {/* Ambient glow overlay for depth */}
      <div
        className="absolute top-[20%] left-[-10%] w-[50%] h-[60%] rounded-full opacity-20 motion-reduce:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 0, 0) 70%)",
          filter: "blur(80px)",
          animation: "subtleGlow 25s ease-in-out infinite",
          willChange: "opacity",
        }}
      />

      <div
        className="absolute bottom-[15%] right-[-5%] w-[45%] h-[55%] rounded-full opacity-15 motion-reduce:opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(242, 182, 49, 0.3) 0%, rgba(213, 26, 45, 0.2) 50%, rgba(255, 0, 0, 0) 70%)",
          filter: "blur(90px)",
          animation: "subtleGlow 28s ease-in-out infinite 5s",
          willChange: "opacity",
        }}
      />

      {/* Decorative Floating Dots */}
      {showFloatingDots && (
        <>
          {/* Red Dots - Various sizes */}
          <div
            className="absolute w-3 h-3 rounded-full bg-[#D32F2F] opacity-40 motion-reduce:animate-none"
            style={{
              top: "15%",
              left: "10%",
              animation: "floatDot 8s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#D32F2F] opacity-50 motion-reduce:animate-none"
            style={{
              top: "25%",
              left: "85%",
              animation: "floatDot 10s ease-in-out infinite 1s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-4 h-4 rounded-full bg-[#D32F2F] opacity-30 motion-reduce:animate-none"
            style={{
              top: "40%",
              left: "20%",
              animation: "floatDot 12s ease-in-out infinite 2s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#D32F2F] opacity-45 motion-reduce:animate-none"
            style={{
              top: "60%",
              left: "75%",
              animation: "floatDot 9s ease-in-out infinite 1.5s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-3.5 h-3.5 rounded-full bg-[#D32F2F] opacity-35 motion-reduce:animate-none"
            style={{
              top: "70%",
              left: "30%",
              animation: "floatDot 11s ease-in-out infinite 3s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#D32F2F] opacity-40 motion-reduce:animate-none"
            style={{
              top: "80%",
              left: "60%",
              animation: "floatDot 10s ease-in-out infinite 2.5s",
              willChange: "transform",
            }}
          />

          {/* Gold Dots - Accent colors */}
          <div
            className="absolute w-3 h-3 rounded-full bg-[#FFD700] opacity-35 motion-reduce:animate-none"
            style={{
              top: "20%",
              left: "50%",
              animation: "floatDot 13s ease-in-out infinite 1s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#FFD700] opacity-40 motion-reduce:animate-none"
            style={{
              top: "35%",
              left: "90%",
              animation: "floatDot 9s ease-in-out infinite 2s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#FFD700] opacity-45 motion-reduce:animate-none"
            style={{
              top: "55%",
              left: "15%",
              animation: "floatDot 11s ease-in-out infinite 3s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-3.5 h-3.5 rounded-full bg-[#FFD700] opacity-30 motion-reduce:animate-none"
            style={{
              top: "65%",
              left: "80%",
              animation: "floatDot 10s ease-in-out infinite 1.5s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#FFD700] opacity-50 motion-reduce:animate-none"
            style={{
              top: "85%",
              left: "40%",
              animation: "floatDot 12s ease-in-out infinite 2.5s",
              willChange: "transform",
            }}
          />

          {/* Mixed Color Dots - Subtle variations */}
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#B71C1C] opacity-35 motion-reduce:animate-none"
            style={{
              top: "30%",
              left: "65%",
              animation: "floatDot 14s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-3 h-3 rounded-full bg-[#FFB300] opacity-40 motion-reduce:animate-none"
            style={{
              top: "45%",
              left: "5%",
              animation: "floatDot 9s ease-in-out infinite 1s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#B71C1C] opacity-45 motion-reduce:animate-none"
            style={{
              top: "75%",
              left: "95%",
              animation: "floatDot 11s ease-in-out infinite 2s",
              willChange: "transform",
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#FFB300] opacity-30 motion-reduce:animate-none"
            style={{
              top: "50%",
              left: "45%",
              animation: "floatDot 13s ease-in-out infinite 3s",
              willChange: "transform",
            }}
          />
        </>
      )}

      <style jsx>{`
        /* Flow animation - move dots left to right with shimmer */
        @keyframes flowRight {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translate3d(60px, 0, 0);
            opacity: 0.6;
          }
          75% {
            opacity: 0.4;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }
        }

        /* Subtle glow animation for ambient depth */
        @keyframes subtleGlow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        /* Floating dot animation - smooth vertical and horizontal movement */
        @keyframes floatDot {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(10px, -15px, 0);
          }
          50% {
            transform: translate3d(-5px, -25px, 0);
          }
          75% {
            transform: translate3d(15px, -10px, 0);
          }
        }

        /* Accessibility - Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .dot-row {
            animation: none !important;
            opacity: 0.15 !important;
          }

          /* Static gradient fallback */
          .absolute.inset-0.bg-gradient-to-br {
            background: linear-gradient(
              135deg,
              #1a0000 0%,
              #3a0000 50%,
              #5a0000 100%
            );
          }
        }

        /* Performance optimization for mobile */
        @media (max-width: 640px) {
          .dot-row {
            animation-duration: 25s !important;
          }
        }
      `}</style>
    </div>
  );
};
