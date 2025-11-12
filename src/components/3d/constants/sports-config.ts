export const SPORTS_CONFIG = {
  soccer: {
    file: 'soccer-ball.glb',
    scale: 1.2,
    position: [0, 0, 0] as [number, number, number],
    label: 'Soccer',
    emoji: '⚽',
    nameAr: 'كرة القدم',
    color: '#ffffff',
    animationPattern: 'rotate-xy' as const,
  },
  basketball: {
    file: 'basket-ball.glb',
    scale: 2.9,
    position: [0, 0, 0],
    label: 'Basketball',
    emoji: '🏀',
    nameAr: 'كرة السلة',
    color: '#ee6730',
    animationPattern: 'bounce' // Changed to bounce for more dynamic basketball feel
  },
  volleyball: {
    file: 'volley-ball.glb',
    scale: 3.0,
    position: [0, 0, 0],
    label: 'Volleyball',
    emoji: '🏐',
    nameAr: 'الكرة الطائرة',
    color: '#ffffff',
    animationPattern: 'rotate-wave' // Keep the wave pattern for volleyball
  },
  'table-tennis': {
    file: 'table-tennis-paddle.glb',
    scale: 0.12,
    position: [0, 0, 0],
    label: 'Table Tennis',
    emoji: '🏓',
    nameAr: 'تنس الطاولة',
    color: '#8B0000',
    animationPattern: 'gallop' // Now properly implemented
  },
  chess: {
    file: 'chess-knight.glb',
    scale: 0.5,
    position: [0, 0, 0],
    label: 'Chess',
    emoji: '♟️',
    nameAr: 'الشطرنج',
    color: '#1a1a1a',
    animationPattern: 'chess-piece' // Now has a proper pattern instead of empty
  }
} as const;
