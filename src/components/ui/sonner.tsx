"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "group toast group-[.toaster]:bg-white/95 group-[.toaster]:backdrop-blur-sm group-[.toaster]:dark:bg-gray-900/95 group-[.toaster]:border-2 group-[.toaster]:border-[#d51a2d]/30 group-[.toaster]:dark:border-[#f2b631]/30 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:min-w-[320px] group-[.toaster]:max-w-md",
            title: "group-[.toast]:text-gray-900 group-[.toast]:dark:text-white group-[.toast]:font-bold group-[.toast]:text-base group-[.toast]:text-center",
            description: "group-[.toast]:text-gray-600 group-[.toast]:dark:text-gray-300 group-[.toast]:text-sm group-[.toast]:text-center group-[.toast]:mt-1",
            success: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-white group-[.toast]:via-green-50/50 group-[.toast]:to-white group-[.toast]:dark:from-gray-900 group-[.toast]:dark:via-green-900/20 group-[.toast]:dark:to-gray-900 group-[.toast]:border-green-500/40 group-[.toast]:text-green-900 group-[.toast]:dark:text-green-100",
            error: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-white group-[.toast]:via-red-50/50 group-[.toast]:to-white group-[.toast]:dark:from-gray-900 group-[.toast]:dark:via-red-900/20 group-[.toast]:dark:to-gray-900 group-[.toast]:border-red-500/40 group-[.toast]:text-red-900 group-[.toast]:dark:text-red-100",
            info: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-white group-[.toast]:via-blue-50/50 group-[.toast]:to-white group-[.toast]:dark:from-gray-900 group-[.toast]:dark:via-blue-900/20 group-[.toast]:dark:to-gray-900 group-[.toast]:border-blue-500/40",
            warning: "group-[.toast]:bg-gradient-to-br group-[.toast]:from-white group-[.toast]:via-[#f2b631]/10 group-[.toast]:to-white group-[.toast]:dark:from-gray-900 group-[.toast]:dark:via-[#f2b631]/20 group-[.toast]:dark:to-gray-900 group-[.toast]:border-[#f2b631]/50",
            actionButton: "group-[.toast]:bg-[#d51a2d] group-[.toast]:text-white group-[.toast]:hover:bg-[#b01525] group-[.toast]:rounded-lg group-[.toast]:font-semibold",
            cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:dark:bg-gray-700 group-[.toast]:text-gray-900 group-[.toast]:dark:text-white group-[.toast]:rounded-lg",
          },
        }}
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
        {...props}
      />
      {/* Libyan decorative motif styles */}
      <style jsx global>{`
        .toaster [data-sonner-toast] {
          position: relative;
          overflow: hidden;
        }
        
        /* Libyan geometric pattern background */
        .toaster [data-sonner-toast]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.08;
          background-image:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 11px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 11px
            );
          pointer-events: none;
        }
        
        /* Decorative corner elements inspired by Libyan architecture */
        .toaster [data-sonner-toast]::after {
          content: '';
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          border-top: 2px solid #d51a2d;
          border-right: 2px solid #d51a2d;
          opacity: 0.3;
          pointer-events: none;
        }
        
        .toaster [data-sonner-toast] [data-icon] {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
        }
        
        /* Dark mode adjustments */
        .dark .toaster [data-sonner-toast]::after {
          border-color: #f2b631;
        }
      `}</style>
    </>
  )
}

export { Toaster }
