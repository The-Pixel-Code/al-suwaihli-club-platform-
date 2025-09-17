import * as THREE from 'three';

export interface AnimationOptions {
  rotationSpeed: number;
  floatIntensity: number;
}

export type AnimationPattern = {
  apply: (
    model: THREE.Group,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
    delta: number,
    options: AnimationOptions
  ) => void;
};

const patterns: Record<string, AnimationPattern> = {
  'rotate-xy': {
    apply: (model, state, delta, options) => {
      model.rotation.y += delta * options.rotationSpeed;
      model.rotation.x += delta * 0.3;
    }
  },
  'bounce': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      model.rotation.y += delta * options.rotationSpeed * 1.2;
      model.rotation.z = Math.sin(time) * 0.1;
      model.position.y = Math.sin(time * 2) * 0.1;
    }
  },
  // ... other patterns
};

export function getAnimationPattern(patternName: string): AnimationPattern {
  return patterns[patternName] || patterns['rotate-xy'];
}