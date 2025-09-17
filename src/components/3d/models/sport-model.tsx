import React, { useRef } from 'react';
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

  // Handle fade in/out
  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetOpacity = visible && fadeIn ? 1 : 0;
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = Array.isArray(child.material) ? child.material[0] : child.material;
          if ('opacity' in material) {
            material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 8);
            material.transparent = true;
          }
        }
      });
    }
  });

  return (
    <Float
      speed={sportType === 'chess' ? 0.5 : 1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef} visible={visible}>
        <group ref={modelRef} position={config.position}>
          <Center>
            <primitive object={clonedScene} scale={finalScale} />
          </Center>
        </group>
      </group>
    </Float>
  );
}
