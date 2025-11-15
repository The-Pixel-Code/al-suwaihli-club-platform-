import { cn } from "@/lib/utils";
import React from "react";

interface GridSmallBackgroundProps {
    children: React.ReactNode;
}

export function GridSmallBackground({ children }: GridSmallBackgroundProps) {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "opacity-50",
          "[background-image:linear-gradient(to_right,rgba(220,38,38,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,38,38,0.15)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,rgba(220,38,38,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,38,38,0.2)_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        {children}
    </div>
  );
}
