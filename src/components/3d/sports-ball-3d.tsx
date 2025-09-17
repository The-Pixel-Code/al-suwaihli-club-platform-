/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Float,
  SpotLight,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

// Enhanced sport types with more options
export type SportType = 'soccer' | 'basketball' | 'volleyball' | 'tennis' | 'chess' | 'table-tennis';

// Model configuration with correct file names and scales
const MODEL_CONFIG = {
  soccer: {
    file: 'soccer-ball.glb',
    scale: 1.0,  // This is our reference scale
    position: [0, 0, 0]
  },
  basketball: {
    file: 'basket-ball.glb',
    scale: 0.15,  // Much smaller since basket-ball.glb is large
    position: [0, 0, 0]
  },
  volleyball: {
    file: 'volley-ball.glb',
    scale: 0.08,  // Even smaller since volley-ball.glb is very large
    position: [0, 0, 0]
  },
  tennis: {
    file: 'tennis-ball.glb',
    scale: 1.0,
    position: [0, 0, 0]
  },
  'table-tennis': {
    file: 'table-tennis-paddle.glb',
    scale: 0.8,
    position: [0, 0, 0]
  },
  chess: {
    file: 'chess-knight.glb',
    scale: 0.5,  // Adjust based on actual size
    position: [0, 0, 0]
  }
};

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

// Individual sport model component with enhanced animations and proper scaling
function SportModel({ 
  sportType,
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1,
  visible = true,
  fadeIn = true,
}: { 
  sportType: SportType;
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
  visible?: boolean;
  fadeIn?: boolean;
}) {
  const modelRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const config = MODEL_CONFIG[sportType];

  const gltf = useGLTF(`/models/${config.file}`);
  const scene = gltf.scene;

  useFrame((state, delta) => {
    if (!visible) return;

    // Model rotation and floating
    if (modelRef.current) {
      // Different rotation patterns for different sports
      switch (sportType) {
        case 'soccer':
          modelRef.current.rotation.y += delta * rotationSpeed;
          modelRef.current.rotation.x += delta * 0.3;
          break;
        case 'basketball':
          modelRef.current.rotation.y += delta * rotationSpeed * 1.2;
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
          // Bouncing effect for basketball
          modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
          break;
        case 'volleyball':
          modelRef.current.rotation.y += delta * rotationSpeed;
          modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
          break;
        case 'tennis':
          modelRef.current.rotation.y += delta * rotationSpeed * 0.8;
          modelRef.current.position.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
          break;
        case 'table-tennis':
          // Table tennis paddle with swinging motion
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
          modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
          modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
          break;
        case 'chess':
          // Chess knight galloping motion
          modelRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.3;
          modelRef.current.rotation.y = state.clock.elapsedTime * 0.3;
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
          break;
        default:
          modelRef.current.rotation.y += delta * rotationSpeed;
          break;
      }
      
      // Base floating effect (except basketball which has bouncing)
      if (sportType !== 'basketball') {
        modelRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * floatIntensity * delta * 2;
      }
    }
    
    // Smooth fade in/out transition
    if (groupRef.current) {
      const targetOpacity = visible && fadeIn ? 1 : 0;
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);
            material.transparent = true;
          }
        }
      });
    }
  });

  const clonedScene = scene.clone();
  // Apply model-specific scale and position
  const finalScale = scale * config.scale;

  return (
    <Float
      speed={sportType === 'chess' ? 0.5 : 1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} visible={visible}>
        <group ref={modelRef} position={config.position as number | THREE.Vector3 | [x: number, y: number, z: number] | readonly [x: number, y: number, z: number] | Readonly<THREE.Vector3> | undefined}>
          <Center>
            <primitive
              object={clonedScene}
              scale={finalScale}
            />
          </Center>
        </group>
      </group>
    </Float>
  );
}

// Fallback sport model component for error cases
function FallbackSportModel({
  sportType,
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1,
  visible = true,
  fadeIn = true,
}: {
  sportType: SportType;
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
  visible?: boolean;
  fadeIn?: boolean;
}) {
  const modelRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!visible) return;

    // Model rotation and floating
    if (modelRef.current) {
      // Different rotation patterns for different sports
      switch (sportType) {
        case 'soccer':
          modelRef.current.rotation.y += delta * rotationSpeed;
          modelRef.current.rotation.x += delta * 0.3;
          break;
        case 'basketball':
          modelRef.current.rotation.y += delta * rotationSpeed * 1.2;
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
          // Bouncing effect for basketball
          modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
          break;
        case 'volleyball':
          modelRef.current.rotation.y += delta * rotationSpeed;
          modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
          break;
        case 'tennis':
          modelRef.current.rotation.y += delta * rotationSpeed * 0.8;
          modelRef.current.position.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
          break;
        case 'table-tennis':
          // Table tennis paddle with swinging motion
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
          modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
          modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
          break;
        case 'chess':
          // Chess knight galloping motion
          modelRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.3;
          modelRef.current.rotation.y = state.clock.elapsedTime * 0.3;
          modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
          break;
        default:
          modelRef.current.rotation.y += delta * rotationSpeed;
          break;
      }

      // Base floating effect (except basketball which has bouncing)
      if (sportType !== 'basketball') {
        modelRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * floatIntensity * delta * 2;
      }
    }

    // Smooth fade in/out transition
    if (groupRef.current) {
      const targetOpacity = visible && fadeIn ? 1 : 0;
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);
            material.transparent = true;
          }
        }
      });
    }
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} visible={visible}>
        <group ref={modelRef}>
          {sportType === 'soccer' && <FallbackSoccer scale={scale} />}
          {sportType === 'basketball' && <FallbackBasketball scale={scale} />}
          {sportType === 'volleyball' && <FallbackVolleyball scale={scale} />}
          {sportType === 'tennis' && <FallbackTennis scale={scale} />}
          {sportType === 'table-tennis' && <FallbackTableTennis scale={scale} />}
          {sportType === 'chess' && <FallbackChess scale={scale} />}
        </group>
      </group>
    </Float>
  );
}

// Fallback procedural models
function FallbackSoccer({ scale }: { scale: number }) {
  return (
    <>
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} transparent opacity={0} />
      </mesh>
      {/* Pentagon pattern */}
      {[...Array(20)].map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 20);
        const theta = Math.sqrt(20 * Math.PI) * phi;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(theta) * Math.sin(phi) * scale * 1.01,
              Math.sin(theta) * Math.sin(phi) * scale * 1.01,
              Math.cos(phi) * scale * 1.01,
            ]}
            scale={scale}
          >
            <circleGeometry args={[0.15, 5]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#000000" : "#ffffff"} 
              transparent 
              opacity={0} 
            />
          </mesh>
        );
      })}
    </>
  );
}

function FallbackBasketball({ scale }: { scale: number }) {
  return (
    <>
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ee6730" roughness={0.6} transparent opacity={0} />
      </mesh>
      {/* Basketball lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={scale}>
        <torusGeometry args={[1.01, 0.02, 8, 100]} />
        <meshStandardMaterial color="#000000" transparent opacity={0} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} scale={scale}>
        <torusGeometry args={[1.01, 0.02, 8, 100]} />
        <meshStandardMaterial color="#000000" transparent opacity={0} />
      </mesh>
    </>
  );
}

function FallbackVolleyball({ scale }: { scale: number }) {
  return (
    <>
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} transparent opacity={0} />
      </mesh>
      {/* Volleyball pattern */}
      <mesh scale={scale}>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial color="#ff6b6b" transparent opacity={0} />
      </mesh>
    </>
  );
}

function FallbackTennis({ scale }: { scale: number }) {
  return (
    <>
      <mesh castShadow receiveShadow scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ccff00" roughness={0.8} transparent opacity={0} />
      </mesh>
      {/* Tennis ball curve */}
      <mesh rotation={[0, 0, Math.PI / 4]} scale={scale}>
        <torusGeometry args={[1.01, 0.03, 8, 100]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0} />
      </mesh>
    </>
  );
}

function FallbackTableTennis({ scale }: { scale: number }) {
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ballRef.current) {
      // Ball bouncing motion
      ballRef.current.position.x = Math.sin(state.clock.elapsedTime * 3) * 0.8;
      ballRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.8 + 0.5;
      ballRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <>
      {/* Paddle */}
      <group rotation={[0, 0, Math.PI / 8]} scale={scale * 0.7}>
        {/* Handle */}
        <mesh position={[0, -1.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1, 12]} />
          <meshStandardMaterial color="#654321" roughness={0.7} transparent opacity={0} />
        </mesh>
        {/* Paddle face */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.08, 32]} />
          <meshStandardMaterial color="#8B0000" roughness={0.3} metalness={0.1} transparent opacity={0} />
        </mesh>
        {/* Red rubber */}
        <mesh position={[0, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.02, 32]} />
          <meshStandardMaterial color="#FF0000" roughness={0.9} transparent opacity={0} />
        </mesh>
        {/* Black rubber */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.02, 32]} />
          <meshStandardMaterial color="#000000" roughness={0.9} transparent opacity={0} />
        </mesh>
      </group>
      
      {/* Ping pong ball */}
      <mesh ref={ballRef} position={[0.5, 0.8, 0]} castShadow scale={scale}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} transparent opacity={0} />
      </mesh>
    </>
  );
}

function FallbackChess({ scale }: { scale: number }) {
  return (
    <group scale={scale * 0.7}>
      {/* Chess piece base */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} transparent opacity={0} />
      </mesh>
      
      {/* Knight body */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.4, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} transparent opacity={0} />
      </mesh>
      
      {/* Knight head */}
      <mesh position={[0.3, 0.6, 0]} castShadow rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.35, 0.8, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} transparent opacity={0} />
      </mesh>
    </group>
  );
}

// Enhanced transition wrapper
function AnimatedSportsShowcase({
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
  const [fadeIn, setFadeIn] = useState(true);
  const [displayedSport, setDisplayedSport] = useState(currentSport);

  const allSports: SportType[] = ['soccer', 'basketball', 'volleyball', 'tennis', 'table-tennis', 'chess'];

  useEffect(() => {
    if (displayedSport !== currentSport) {
      setFadeIn(false);
      const timer = setTimeout(() => {
        setDisplayedSport(currentSport);
        setFadeIn(true);
      }, 300); // Fade out duration

      return () => clearTimeout(timer);
    }
  }, [currentSport, displayedSport]);

  return (
    <>
      {allSports.map((sport) => (
        <SportModel
          key={sport}
          sportType={sport}
          scale={scale}
          rotationSpeed={rotationSpeed}
          floatIntensity={floatIntensity}
          visible={sport === displayedSport}
          fadeIn={fadeIn}
        />
      ))}
    </>
  );
}

// Enhanced sport selector with more sports
function SportSelector({ 
  currentSport, 
  onSportChange, 
  className = "" 
}: {
  currentSport: SportType;
  onSportChange: (sport: SportType) => void;
  className?: string;
}) {
  const sports: { type: SportType; label: string; emoji: string; nameAr: string }[] = [
    { type: 'soccer', label: 'Soccer', emoji: '⚽', nameAr: 'كرة القدم' },
    { type: 'basketball', label: 'Basketball', emoji: '🏀', nameAr: 'كرة السلة' },
    { type: 'volleyball', label: 'Volleyball', emoji: '🏐', nameAr: 'الكرة الطائرة' },
    { type: 'tennis', label: 'Tennis', emoji: '🎾', nameAr: 'التنس' },
    { type: 'table-tennis', label: 'Table Tennis', emoji: '🏓', nameAr: 'تنس الطاولة' },
    { type: 'chess', label: 'Chess', emoji: '♟️', nameAr: 'الشطرنج' },
  ];

  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {sports.map((sport) => (
        <motion.button
          key={sport.type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSportChange(sport.type)}
          className={`
            px-3 py-2 rounded-full font-medium transition-all duration-200 text-sm
            ${currentSport === sport.type
              ? 'bg-red-600 text-white shadow-lg scale-105'
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
            }
          `}
          title={sport.nameAr}
        >
          <span className="mr-1">{sport.emoji}</span>
          <span className="hidden sm:inline">{sport.label}</span>
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

// Main enhanced SportsBall3D component
export function SportsBall3D({ 
  width = 320, 
  height = 320,
  className = "",
  scale = 3,
  showSelector = true,
  autoRotate = false,
  autoSwitchInterval = 5000,
  initialSport = 'soccer' as SportType,
  enableShadows = true,
  environmentPreset = "city" as any,
}: {
  width?: number;
  height?: number;
  className?: string;
  scale?: number;
  showSelector?: boolean;
  autoRotate?: boolean;
  autoSwitchInterval?: number;
  initialSport?: SportType;
  enableShadows?: boolean;
  environmentPreset?: string;
}) {
  const [currentSport, setCurrentSport] = useState<SportType>(initialSport);

  const allSports: SportType[] = ['soccer', 'basketball', 'volleyball', 'tennis', 'table-tennis', 'chess'];

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
            
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow={enableShadows}
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff6b6b" />
            <pointLight position={[10, -10, 10]} intensity={0.5} color="#4dabf7" />
            
            {/* Spotlight for dramatic effect */}
            <SpotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              castShadow={enableShadows}
            />
            
            {/* Animated Sport Models */}
            <ErrorBoundary
              fallback={
                <FallbackSportModel
                  sportType={currentSport}
                  scale={scale}
                  rotationSpeed={0.3}
                  floatIntensity={0.1}
                  visible={true}
                  fadeIn={true}
                />
              }
            >
              <AnimatedSportsShowcase
                currentSport={currentSport}
                scale={scale}
                rotationSpeed={0.3}
                floatIntensity={0.1}
              />
            </ErrorBoundary>
            <Environment preset={environmentPreset as "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | undefined } />
          </Suspense>
        </Canvas>

        {/* Enhanced Sport Label with transition */}
        <motion.div
          key={currentSport}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
        >
          {currentSport.charAt(0).toUpperCase() + currentSport.slice(1).replace('-', ' ')}
        </motion.div>
      </div>
    </div>
  );
}

// Hook to preload all sport models with correct file names
export function usePreloadSportModels() {
  const models = Object.values(MODEL_CONFIG).map(config => config.file);
  
  models.forEach(model => {
    try {
      useGLTF.preload(`/models/${model}`);
    } catch (error) {
      console.log(`Could not preload ${model}, will use fallback, Error : ${error}`);
    }
  });
}