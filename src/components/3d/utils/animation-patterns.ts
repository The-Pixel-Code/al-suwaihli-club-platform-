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
  
  'rotate-wave': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      model.rotation.y += delta * options.rotationSpeed;
      model.rotation.x = Math.sin(time * 2) * 0.2;
      model.rotation.z = Math.cos(time * 1.5) * 0.1;
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
  
  // Perfect for table tennis paddle - mimics playing motion
  'gallop': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      const speed = options.rotationSpeed;
      
      // Paddle swinging motion - back and forth like hitting a ball
      model.rotation.z = Math.sin(time * speed * 3) * 0.8; // Main swing motion
      model.rotation.y = Math.cos(time * speed * 2) * 0.3; // Side-to-side variation
      model.rotation.x = Math.sin(time * speed * 2.5 + Math.PI/4) * 0.2; // Slight tilt
      
      // Add a subtle bounce effect
      model.position.y = Math.abs(Math.sin(time * speed * 2)) * options.floatIntensity * 0.5;
      model.position.x = Math.sin(time * speed * 1.5) * options.floatIntensity * 0.3;
    }
  },
  
  // Elegant chess piece animation - subtle and dignified
  'chess-piece': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      const slowRotation = options.rotationSpeed * 0.3;
      
      // Very slow, stately rotation
      model.rotation.y += delta * slowRotation;
      
      // Gentle floating motion like the piece is thinking
      model.position.y = Math.sin(time * 0.8) * options.floatIntensity * 0.5;
      
      // Slight contemplative tilt
      model.rotation.x = Math.sin(time * 0.5) * 0.05;
      model.rotation.z = Math.cos(time * 0.7) * 0.03;
    }
  },
  
  // Smooth orbital motion - good for any spherical objects
  'orbital': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      
      model.rotation.y += delta * options.rotationSpeed;
      
      // Orbital floating pattern
      model.position.x = Math.cos(time * 0.5) * options.floatIntensity;
      model.position.y = Math.sin(time * 0.8) * options.floatIntensity * 0.5;
      model.position.z = Math.sin(time * 0.3) * options.floatIntensity * 0.3;
    }
  },
  
  // Gentle pulsing animation
  'pulse': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime;
      
      model.rotation.y += delta * options.rotationSpeed * 0.5;
      
      // Pulsing scale effect
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      model.scale.setScalar(pulse);
      
      // Gentle floating
      model.position.y = Math.sin(time * 1.2) * options.floatIntensity * 0.3;
    }
  },
  
  // Figure-8 pattern motion
  'figure-eight': {
    apply: (model, state, delta, options) => {
      const time = state.clock.elapsedTime * options.rotationSpeed;
      
      model.rotation.y += delta * options.rotationSpeed;
      
      // Figure-8 motion
      model.position.x = Math.sin(time) * options.floatIntensity;
      model.position.y = Math.sin(time * 2) * options.floatIntensity * 0.5;
      
      // Dynamic tilting based on position
      model.rotation.z = model.position.x * 0.2;
    }
  }
};

export function getAnimationPattern(patternName: string): AnimationPattern {
  // Handle empty pattern name for chess
  if (!patternName || patternName === '') {
    return patterns['chess-piece'];
  }
  
  return patterns[patternName] || patterns['rotate-xy'];
}
