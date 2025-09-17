export const SPORTS_CONFIG = {
  soccer: {
    file: 'soccer-ball.glb',
    scale: 1.0,
    position: [0, 0, 0] as [number, number, number],
    label: 'Soccer',
    emoji: '⚽',
    nameAr: 'كرة القدم',
    color: '#ffffff',
    animationPattern: 'rotate-xy' as const,
  },
    basketball: {
    file: 'basket-ball.glb',
    scale: 3.0,
    position: [0, 0, 0],
    label: 'Basketball',
    emoji: '🏀',
    nameAr: 'كرة السلة',
    color: '#ee6730',
    animationPattern: 'rotate-wave'
  },
  volleyball: {
    file: 'volley-ball.glb',
    scale: 2.5,
    position: [0, 0, 0],
    label: 'Volleyball',
    emoji: '🏐',
    nameAr: 'الكرة الطائرة',
    color: '#ffffff',
    animationPattern: 'rotate-wave'
  },
  'table-tennis': {
    file: 'table-tennis-paddle.glb',
    scale: 0.1,
    position: [0, 0, 0],
    label: 'Table Tennis',
    emoji: '🏓',
    nameAr: 'تنس الطاولة',
    color: '#8B0000',
    animationPattern: 'gallop'
  },
  chess: {
    file: 'chess-knight.glb',
    scale: 0.5,
    position: [0, 0, 0],
    label: 'Chess',
    emoji: '♟️',
    nameAr: 'الشطرنج',
    color: '#1a1a1a',
    animationPattern: ''
  }
} as const;