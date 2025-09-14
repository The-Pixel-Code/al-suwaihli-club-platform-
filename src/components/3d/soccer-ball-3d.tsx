"use client";

import React, { useRef, Suspense } from 'react';
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

// Soccer Ball Model component
function SoccerBallModel({ 
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1
}: { 
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/SoccerBall.glb');
  
  useFrame((state, delta) => {
    if (modelRef.current) {
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

// Fallback soccer ball if model fails to load
function FallbackSoccerBall({ scale = 1 }: { scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff"
        roughness={0.3}
        metalness={0.1}
      />
      {/* Add soccer ball pattern */}
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshStandardMaterial 
          color="#000000"
          transparent
          opacity={0.8}
          roughness={0.4}
        />
      </mesh>
    </mesh>
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

export function SoccerBall3D({ 
  width = 320, 
  height = 320,
  className = "",
  scale = 3
}: {
  width?: number;
  height?: number;
  className?: string;
  scale?: number;
}) {
  return (
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
            autoRotate
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
          
          {/* Soccer Ball Model */}
          <ErrorBoundary fallback={<FallbackSoccerBall scale={scale} />}>
            <SoccerBallModel
              scale={scale}
              rotationSpeed={0.3}
              floatIntensity={0.1}
            />
          </ErrorBoundary>
          
                    
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/models/soccer-ball.glb');