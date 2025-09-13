"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ClubLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function ClubLogo({ 
  width = 100, 
  height = 100, 
  className = "",
  priority = false 
}: ClubLogoProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    // Fallback to regular img tag if Next Image fails
    return (
      <img
        src="/assets/Al-Swihli_Misratah.png"
        alt="Al-Suwaihli Club"
        width={width}
        height={height}
        className={cn("object-contain", className)}
      />
    );
  }

  return (
    <Image
      src="/assets/Al-Swihli_Misratah.png"
      alt="Al-Suwaihli Club"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority={priority}
      onError={() => setImgError(true)}
      unoptimized // This bypasses Next.js image optimization
    />
  );
}
