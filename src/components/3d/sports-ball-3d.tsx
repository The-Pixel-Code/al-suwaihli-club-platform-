"use client";

import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  Html,
  useProgress,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

// Sport types
export type SportType = 'soccer' | 'basketball' | 'volleyball';

// Loading component
function LoadingProgress() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
        <div className="text-xs font-medium text-gray-600">Loading {progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

// Individual sport ball model component
function SportBallModel({ 
  sportType,
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1,
  isActive = true,
  // onLoadError,
}: { 
  sportType: SportType;
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
  isActive?: boolean;
  // onLoadError?: () => void;
}) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(`/models/${sportType}-ball.glb`);
  
  useFrame((state, delta) => {
    if (modelRef.current && isActive) {
      modelRef.current.rotation.y += delta * rotationSpeed;
      // Add subtle floating effect
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * floatIntensity;
    }
  });

  // Clone the scene to avoid issues with multiple uses
  const clonedScene = scene.clone();
  
  return (
    <group ref={modelRef}>
      <Center>
        <primitive 
          object={clonedScene} 
          scale={scale}
        />
      </Center>
    </group>
  );
}

// Animated transition wrapper for sport balls
function AnimatedSportBall({
  currentSport,
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1,
}: {
  currentSport: SportType;
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentModel, setCurrentModel] = useState(currentSport);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth transition effect
      if (isTransitioning) {
        groupRef.current.scale.lerp(new THREE.Vector3(0.1, 0.1, 0.1), delta * 8);
        if (groupRef.current.scale.x < 0.2) {
          setCurrentModel(currentSport);
          setIsTransitioning(false);
        }
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), delta * 6);
      }
    }
  });

  useEffect(() => {
    if (currentModel !== currentSport) {
      setIsTransitioning(true);
    }
  }, [currentSport, currentModel]);

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <SportBallModel
          sportType={currentModel}
          scale={1}
          rotationSpeed={rotationSpeed}
          floatIntensity={floatIntensity}
          isActive={!isTransitioning}
        />
      </Suspense>
    </group>
  );
}

// Fallback sport balls if models fail to load
function FallbackSportBall({ 
  sportType, 
  scale = 1 
}: { 
  sportType: SportType;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  const getSportColors = (sport: SportType) => {
    switch (sport) {
      case 'soccer':
        return { primary: "#ffffff", secondary: "#000000" };
      case 'basketball':
        return { primary: "#ff6b35", secondary: "#2c1810" };
      case 'volleyball':
        return { primary: "#ffffff", secondary: "#ff6b6b" };
    }
  };

  const colors = getSportColors(sportType);

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={colors.primary}
        roughness={0.3}
        metalness={0.1}
      />
      {/* Add sport-specific pattern */}
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial 
          color={colors.secondary}
          transparent
          opacity={0.6}
          roughness={0.4}
        />
      </mesh>
    </mesh>
  );
}

// Sport selector controls
function SportSelector({ 
  currentSport, 
  onSportChange, 
  className = "" 
}: {
  currentSport: SportType;
  onSportChange: (sport: SportType) => void;
  className?: string;
}) {
  const sports: { type: SportType; label: string; emoji: string }[] = [
    { type: 'soccer', label: 'Soccer', emoji: '⚽' },
    { type: 'basketball', label: 'Basketball', emoji: '🏀' },
    { type: 'volleyball', label: 'Volleyball', emoji: '🏐' },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {sports.map((sport) => (
        <motion.button
          key={sport.type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSportChange(sport.type)}
          className={`
            px-4 py-2 rounded-full font-medium transition-all duration-200
            ${currentSport === sport.type
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
            }
          `}
        >
          <span className="mr-2">{sport.emoji}</span>
          {sport.label}
        </motion.button>
      ))}
    </div>
  );
}

// Error boundary component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main SportsBall3D component
export function SportsBall3D({ 
  width = 320, 
  height = 320,
  className = "",
  scale = 3,
  showSelector = true,
  autoRotate = false,
  autoSwitchInterval = 5000, // Switch sports every 5 seconds
  initialSport = 'soccer' as SportType,
}: {
  width?: number;
  height?: number;
  className?: string;
  scale?: number;
  showSelector?: boolean;
  autoRotate?: boolean;
  autoSwitchInterval?: number;
  initialSport?: SportType;
}) {
  const [currentSport, setCurrentSport] = useState<SportType>(initialSport);

  // Auto-switch between sports
  useEffect(() => {
    if (autoRotate) {
      const sports: SportType[] = ['soccer', 'basketball', 'volleyball'];
      let currentIndex = sports.indexOf(currentSport);

      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % sports.length;
        setCurrentSport(sports[currentIndex]);
      }, autoSwitchInterval);

      return () => clearInterval(interval);
    }
  }, [currentSport, autoRotate, autoSwitchInterval]);

  return (
    <div className="space-y-4">
      {/* Sport Selector */}
      {showSelector && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <SportSelector
            currentSport={currentSport}
            onSportChange={setCurrentSport}
          />
        </motion.div>
      )}

      {/* 3D Canvas */}
      <div 
        className={`relative ${className}`}
        style={{ width, height }}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={<LoadingProgress />}>
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={autoRotate}
              autoRotateSpeed={0.3}
            />
            
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ff6b6b" />
            <pointLight position={[10, -10, 10]} intensity={0.3} color="#4dabf7" />
            
            {/* Animated Sport Ball */}
            <ErrorBoundary 
              fallback={<FallbackSportBall sportType={currentSport} scale={scale} />}
            >
              <AnimatedSportBall
                currentSport={currentSport}
                scale={scale}
                rotationSpeed={0.3}
                floatIntensity={0.1}
              />
            </ErrorBoundary>
            
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        {/* Sport Label */}
        <motion.div
          key={currentSport}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          {currentSport.charAt(0).toUpperCase() + currentSport.slice(1)}
        </motion.div>
      </div>
    </div>
  );
}

// Hook to preload all sport ball models
export function usePreloadSportModels() {
  useGLTF.preload('/models/soccer-ball.glb');
  useGLTF.preload('/models/basket-ball.glb');
  useGLTF.preload('/models/volley-ball.glb');
}