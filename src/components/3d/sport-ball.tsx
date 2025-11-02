import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import { SportType } from "@/components/3d/types/sports.types";
import { LoadingProgress } from "@/components/3d/ui/loading-progress";
import { SportModel } from "@/components/3d/models/sport-model";

interface SportBallProps {
  /** Sport type to display */
  sport: SportType;
  /** Width of the canvas in pixels */
  width?: number;
  /** Height of the canvas in pixels */
  height?: number;
  /** Scale of the 3D model */
  scale?: number;
  /** Enable automatic rotation */
  autoRotate?: boolean;
  /** Rotation speed (default: 1) */
  autoRotateSpeed?: number;
  /** Enable shadows */
  enableShadows?: boolean;
  /** Environment preset for lighting */
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
  /** Additional CSS classes */
  className?: string;
}

/**
 * SportBall - A simple 3D sport ball component
 *
 * Displays a single sport ball without transitions.
 * Perfect for hero sections and decorative elements.
 *
 * @example
 * ```tsx
 * <SportBall
 *   sport="soccer"
 *   width={112}
 *   height={112}
 *   scale={1.8}
 *   autoRotate={true}
 * />
 * ```
 */
export function SportBall({
  sport,
  width = 120,
  height = 120,
  scale = 2,
  autoRotate = true,
  autoRotateSpeed = 1,
  enableShadows = false,
  environmentPreset = "studio",
  className = "",
}: SportBallProps) {
  // Get animation properties based on sport type
  const getSportAnimationProps = (sportType: SportType) => {
    switch (sportType) {
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

  const animProps = getSportAnimationProps(sport);

  return (
    <div className={className} style={{ width, height }}>
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
            autoRotateSpeed={autoRotateSpeed}
          />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            castShadow={enableShadows}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.3} />

          {/* Sport Model */}
          <SportModel
            sportType={sport}
            scale={scale}
            rotationSpeed={animProps.rotationSpeed}
            floatIntensity={animProps.floatIntensity}
            visible={true}
            fadeIn={true}
          />

          <Environment preset={environmentPreset} />
        </Suspense>
      </Canvas>
    </div>
  );
}
