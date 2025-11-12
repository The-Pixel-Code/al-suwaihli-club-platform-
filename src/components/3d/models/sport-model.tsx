import React, { useRef, useEffect } from 'react';
import { useGLTF, Center, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { SportType } from '@/components/3d/types/sports.types';
import { SPORTS_CONFIG } from '@/components/3d/constants/sports-config';
import { useSportAnimation } from '@/components/3d/hooks/use-sport-animation';

interface SportModelProps {
  sportType: SportType;
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
  visible?: boolean;
  fadeIn?: boolean;
}

export function SportModel({ 
  sportType,
  scale = 1,
  rotationSpeed = 0.5,
  floatIntensity = 0.1,
  visible = true,
  fadeIn = true,
}: SportModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const config = SPORTS_CONFIG[sportType];
  const modelRef = useSportAnimation(sportType, rotationSpeed, floatIntensity, visible);

  const { scene } = useGLTF(`/models/${config.file}`);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  const finalScale = scale * config.scale;

  // State for smooth transitions
  const transitionState = useRef({
    currentOpacity: visible ? 1 : 0,
    targetOpacity: visible && fadeIn ? 1 : 0,
    currentScale: visible ? 1 : 0.8,
    targetScale: visible ? 1 : 0.8,
    currentY: 0,
    targetY: 0
  });

  // Update target values when visibility changes
  useEffect(() => {
    transitionState.current.targetOpacity = visible && fadeIn ? 1 : 0;
    transitionState.current.targetScale = visible ? 1 : 0.8;
    transitionState.current.targetY = visible ? 0 : -0.2;
  }, [visible, fadeIn]);

  // Enhanced fade in/out with scale and position transitions
  useFrame((_, delta) => {
    if (groupRef.current) {
      const state = transitionState.current;
      const lerpSpeed = delta * (visible ? 6 : 8); // Faster fade out than fade in
      
      // Smooth opacity transition
      state.currentOpacity = THREE.MathUtils.lerp(
        state.currentOpacity, 
        state.targetOpacity, 
        lerpSpeed
      );
      
      // Smooth scale transition for entrance/exit effect
      state.currentScale = THREE.MathUtils.lerp(
        state.currentScale, 
        state.targetScale, 
        lerpSpeed
      );
      
      // Smooth vertical position transition
      state.currentY = THREE.MathUtils.lerp(
        state.currentY, 
        state.targetY, 
        lerpSpeed
      );

      // Apply scale transition
      const scaleMultiplier = state.currentScale;
      groupRef.current.scale.setScalar(scaleMultiplier);
      
      // Apply position transition
      groupRef.current.position.y = state.currentY;

      // Apply opacity to all materials
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(material => {
            if ('opacity' in material) {
              material.opacity = state.currentOpacity;
              material.transparent = true;
              
              // Add a subtle color tint during transitions
              if ('color' in material && material.color) {
                const tintIntensity = state.currentOpacity;
                if (config.color && config.color !== '#ffffff') {
                  const baseColor = new THREE.Color(config.color);
                  const currentColor = material.color.clone();
                  material.color.lerpColors(currentColor, baseColor, (1 - tintIntensity) * 0.1);
                }
              }
            }
          });
        }
      });

      // Auto-hide the group when fully transparent for performance
      groupRef.current.visible = state.currentOpacity > 0.01;
    }
  });

  // Dynamic Float component properties based on sport type
  const getFloatProps = () => {
    switch (sportType) {
      case 'chess':
        return {
          speed: 0.3,
          rotationIntensity: 0.1,
          floatIntensity: 0.1,
          floatingRange: [-0.02, 0.02] as [number, number]
        };
      case 'table-tennis':
        return {
          speed: 1,
          rotationIntensity: 0.4,
          floatIntensity: 0.2,
          floatingRange: [-0.08, 0.08] as [number, number]
        };
      case 'basketball':
        return {
          speed: 1.2,
          rotationIntensity: 0.3,
          floatIntensity: 0.4,
          floatingRange: [-0.1, 0.1] as [number, number]
        };
      default:
        return {
          speed: 1,
          rotationIntensity: 0.2,
          floatIntensity: 0.3,
          floatingRange: [-0.05, 0.05] as [number, number]
        };
    }
  };

  const floatProps = getFloatProps();

  return (
    <Float {...floatProps}>
      <group ref={groupRef}>
        <group ref={modelRef} position={config.position}>
          <Center>
            <primitive object={clonedScene} scale={finalScale} />
          </Center>
        </group>
      </group>
    </Float>
  );
}
