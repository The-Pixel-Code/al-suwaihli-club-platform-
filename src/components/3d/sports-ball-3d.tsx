import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  SpotLight,
  useGLTF,
} from "@react-three/drei";

import { SportType } from "@/components/3d/types/sports.types";
import { SPORTS_CONFIG } from "@/components/3d/constants/sports-config";

import { LoadingProgress } from "@/components/3d/ui/loading-progress";
import { SportModel } from "@/components/3d/models/sport-model";

interface SportsBall3DProps {
  width?: number;
  height?: number;
  className?: string;
  scale?: number;
  showSelector?: boolean;
  autoRotate?: boolean;
  autoSwitchInterval?: number;
  initialSport?: SportType;
  enableShadows?: boolean;
  environmentPreset?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse";
  transitionDuration?: number;
  /**
   * When true, only displays one 3D object at a time during transitions.
   * When false (default), shows overlapping objects during transitions for smoother effect.
   * Useful for hero sections where you want cleaner, single-object display.
   */
  singleObjectMode?: boolean;
}

export function SportsBall3D({
  width = 320,
  height = 320,
  className = "",
  scale = 3,
  autoRotate = false,
  autoSwitchInterval = 5000,
  initialSport = "soccer",
  enableShadows = true,
  environmentPreset = "city",
  transitionDuration = 600, // Longer transition for smoother effect
  singleObjectMode = false, // Default to showing transition overlap
}: SportsBall3DProps) {
  const [currentSport, setCurrentSport] = useState<SportType>(initialSport);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedSports, setDisplayedSports] = useState<{
    current: SportType;
    previous?: SportType;
  }>(() => ({ current: initialSport }));

  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const allSports = Object.keys(SPORTS_CONFIG) as SportType[];

  // Auto-switch between sports with smooth transitions
  useEffect(() => {
    if (autoRotate) {
      let currentIndex = allSports.indexOf(currentSport);
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % allSports.length;
        setCurrentSport(allSports[currentIndex]);
      }, autoSwitchInterval);
      return () => clearInterval(interval);
    }
  }, [currentSport, autoRotate, autoSwitchInterval, allSports]);

  // Enhanced transition handling with overlap
  useEffect(() => {
    // Use a functional update so we don't read displayedSports from the closure
    setDisplayedSports((prev) => {
      // If nothing to do, return previous state
      if (prev.current === currentSport) return prev;

      setIsTransitioning(true);

      // Clear any existing transition timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Single Object Mode: Only show one object at a time
      if (singleObjectMode) {
        // Immediately switch to the new sport without overlap
        transitionTimeoutRef.current = setTimeout(() => {
          setDisplayedSports({ current: currentSport });
          setIsTransitioning(false);
        }, transitionDuration);
        
        return { current: currentSport };
      }

      // Standard Mode: Show overlap during transition
      // Set up the transition phases: show the old current while marking the new one as previous
      const newState = {
        current: prev.current,
        previous: currentSport,
      };

      // Phase 1: Start showing the new model while fading out the old one
      const halfTransition = transitionDuration / 2;

      setTimeout(() => {
        // Use functional update again to derive previous.current reliably at timeout time
        setDisplayedSports((prev2) => ({
          current: currentSport,
          previous: prev2.current,
        }));
      }, halfTransition);

      // Phase 2: Complete the transition
      transitionTimeoutRef.current = setTimeout(() => {
        setDisplayedSports({ current: currentSport });
        setIsTransitioning(false);
      }, transitionDuration);

      return newState;
    });

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentSport, transitionDuration, singleObjectMode]);

  // Get animation properties based on sport type
  const getSportAnimationProps = (sport: SportType) => {
    switch (sport) {
      case "table-tennis":
        return { rotationSpeed: 0.8, floatIntensity: 0.15 };
      case "chess":
        return { rotationSpeed: 0.2, floatIntensity: 0.05 };
      case "basketball":
        return { rotationSpeed: 0.4, floatIntensity: 0.12 };
      case "volleyball":
        return { rotationSpeed: 0.5, floatIntensity: 0.1 };
      default:
        return { rotationSpeed: 0.3, floatIntensity: 0.1 };
    }
  };

  return (
    <div className="space-y-4">
      <div className={`relative ${className}`} style={{ width, height }}>
        <Canvas
          shadows={enableShadows}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 35 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={<LoadingProgress />}>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
            />

            {/* Enhanced Lighting Setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow={enableShadows}
              shadow-mapSize={[2048, 2048]}
            />
            <pointLight
              position={[-10, 10, -10]}
              intensity={0.5}
              color="#ff6b6b"
            />
            <pointLight
              position={[10, -10, 10]}
              intensity={0.5}
              color="#4dabf7"
            />
            <SpotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              castShadow={enableShadows}
            />

            {/* Current Sport Model */}
            <SportModel
              key={`current-${displayedSports.current}`}
              sportType={displayedSports.current}
              scale={scale}
              {...getSportAnimationProps(displayedSports.current)}
              visible={true}
              fadeIn={true}
            />

            {/* Previous Sport Model (during transition) - Only show if not in single object mode */}
            {!singleObjectMode && displayedSports.previous && isTransitioning && (
              <SportModel
                key={`previous-${displayedSports.previous}`}
                sportType={displayedSports.previous}
                scale={scale}
                {...getSportAnimationProps(displayedSports.previous)}
                visible={false} // Will fade out
                fadeIn={false}
              />
            )}

            <Environment preset={environmentPreset} />
          </Suspense>
        </Canvas>
      </div>

      {/* Optional transition indicator */}
      {isTransitioning && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-50" />
      )}
    </div>
  );
}

// Hook to preload all sport models
export function usePreloadSportModels() {
  Object.values(SPORTS_CONFIG).forEach((config) => {
    try {
      useGLTF.preload(`/models/${config.file}`);
    } catch (error) {
      console.log(
        `Could not preload ${config.file}, will use fallback, error:`,
        error
      );
    }
  });
}
