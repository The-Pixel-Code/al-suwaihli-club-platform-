import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { SportType } from '@/components/3d/types/sports.types';
import { getAnimationPattern } from '@/components/3d/utils/animation-patterns';

export function useSportAnimation(
  sportType: SportType,
  rotationSpeed: number = 0.5,
  floatIntensity: number = 0.1,
  enabled: boolean = true
) {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!modelRef.current || !enabled) return;
    
    const pattern = getAnimationPattern(sportType);
    pattern.apply(modelRef.current, state, delta, {
      rotationSpeed,
      floatIntensity
    });
  });

  return modelRef;
}
