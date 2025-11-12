import React from 'react';
import { motion } from 'motion/react';
import { SPORTS_CONFIG } from '@/components/3d/constants/sports-config';
import { SportType } from '@/components/3d/types/sports.types';

interface SportSelectorProps {
  currentSport: SportType;
  onSportChange: (sport: SportType) => void;
  className?: string;
}

export function SportSelector(props: SportSelectorProps) {
  const { currentSport, onSportChange, className = "" } = props;

  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {Object.entries(SPORTS_CONFIG).map(([key, config]) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSportChange(key as SportType)}
          className={`
            px-3 py-2 rounded-full font-medium transition-all duration-200
            ${currentSport === key
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 hover:bg-white'
            }
          `}
        >
          <span className="mr-1">{config.emoji}</span>
          <span className="hidden sm:inline">{config.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
