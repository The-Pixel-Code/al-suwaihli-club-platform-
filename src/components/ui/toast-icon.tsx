import React from "react";

interface ToastIconProps {
  type: "success" | "error";
  className?: string;
}

export const ToastIcon: React.FC<ToastIconProps> = ({ type, className = "" }) => {
  if (type === "success") {
    return (
      <div className={`relative w-12 h-12 ${className}`}>
        {/* Outer decorative circle with Libyan pattern */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500/30 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/30" />
        
        {/* Inner pattern inspired by traditional Libyan geometric designs */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background decorative star pattern */}
          <circle cx="24" cy="24" r="18" fill="url(#successGradient)" opacity="0.2" />
          
          {/* Check mark with decorative elements */}
          <path
            d="M14 24L20 30L34 16"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-md"
          />
          
          {/* Corner decorative elements */}
          <path
            d="M10 10L14 10L14 14"
            stroke="#d51a2d"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M38 10L34 10L34 14"
            stroke="#d51a2d"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          <defs>
            <linearGradient id="successGradient" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className={`relative w-12 h-12 ${className}`}>
        {/* Outer decorative circle */}
        <div className="absolute inset-0 rounded-full border-2 border-red-500/30 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-800/30" />
        
        {/* Inner pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background decorative pattern */}
          <circle cx="24" cy="24" r="18" fill="url(#errorGradient)" opacity="0.2" />
          
          {/* X mark with decorative elements */}
          <path
            d="M16 16L32 32M32 16L16 32"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-md"
          />
          
          {/* Corner decorative elements */}
          <path
            d="M10 10L14 10L14 14"
            stroke="#d51a2d"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M38 10L34 10L34 14"
            stroke="#d51a2d"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          <defs>
            <linearGradient id="errorGradient" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return null;
};
