import { SPORTS_CONFIG } from '@/components/3d/constants/sports-config';

export type SportType = keyof typeof SPORTS_CONFIG;
export type SportConfig = typeof SPORTS_CONFIG[SportType];
