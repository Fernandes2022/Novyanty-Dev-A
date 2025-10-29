'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroParallaxProps {
  children: ReactNode;
}

export function HeroParallax({ children }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  
  // Only subtle Y movement, NO opacity fade
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <motion.div 
      style={{ y }}
      className="relative min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default HeroParallax;
