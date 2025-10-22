import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  isRtl: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  titleHighlight, 
  subtitle, 
  isRtl, 
  className 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={cn("text-center mb-12", className)}
  >
    <h2 className={cn(
      "text-4xl md:text-5xl font-bold mb-4",
      isRtl ? "font-[Almarai]" : "font-[Inter]"
    )}>
      <span className="text-gray-900">{title}</span>
      <span className="text-red-600 ml-2">{titleHighlight}</span>
    </h2>
    <p className={cn(
      "text-xl text-gray-600 max-w-2xl mx-auto",
      isRtl ? "font-[Almarai]" : "font-[Inter]"
    )}>
      {subtitle}
    </p>
  </motion.div>
);