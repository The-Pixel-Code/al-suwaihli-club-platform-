import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SpotLight, useGLTF } from '@react-three/drei';

import { SportType } from '@/components/3d/types/sports.types';
import { SPORTS_CONFIG } from '@/components/3d/constants/sports-config';

import { LoadingProgress } from '@/components/3d/ui/loading-progress';

import { SportModel } from '@/components/3d/models/sport-model';

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
  environmentPreset?: 'apartment' | 'city' | 'dawn' | 'forest' | 'lobby' | 'night' | 'park' | 'studio' | 'sunset' | 'warehouse';
}

export function SportsBall3D({ 
  width = 320, 
  height = 320,
  className = "",
  scale = 3,
  autoRotate = false,
  autoSwitchInterval = 5000,
  initialSport = 'soccer',
  enableShadows = true,
  environmentPreset = 'city',
}: SportsBall3DProps) {
  const [currentSport, setCurrentSport] = useState<SportType>(initialSport);
  const [fadeIn, setFadeIn] = useState(true);
  const [displayedSport, setDisplayedSport] = useState(currentSport);

  const allSports = Object.keys(SPORTS_CONFIG) as SportType[];

  // Auto-switch between sports
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

  // Handle sport transitions
  useEffect(() => {
    if (displayedSport !== currentSport) {
      setFadeIn(false);
      const timer = setTimeout(() => {
        setDisplayedSport(currentSport);
        setFadeIn(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentSport, displayedSport]);

  return (
    <div className="space-y-4">
      <div className={`relative ${className}`} style={{ width, height }}>
        <Canvas
          shadows={enableShadows}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 35 }}
          style={{ background: 'transparent' }}
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
            
            {/* Lighting Setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow={enableShadows}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
            <pointLight position={[10, -10, 10]} intensity={0.5} color="#4dabf7" />
            <SpotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              castShadow={enableShadows}
            />
            
            {/* Sport Models */}
            {allSports.map((sport) => (
              <SportModel
                key={sport}
                sportType={sport}
                scale={scale}
                rotationSpeed={0.3}
                floatIntensity={0.1}
                visible={sport === displayedSport}
                fadeIn={fadeIn}
              />
            ))}
            
            <Environment preset={environmentPreset} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

// Hook to preload all sport models
export function usePreloadSportModels() {
  Object.values(SPORTS_CONFIG).forEach(config => {
    try {
      useGLTF.preload(`/models/${config.file}`);
    } catch (error) {
      console.log(`Could not preload ${config.file}, will use fallback, error:`, error);
    }
  });
}