'use client';

import { motion } from 'framer-motion';

export function GradientDivider() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      {/* Main animated gradient bar - EXACT from screenshot */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.4) 25%, rgba(139, 92, 246, 0.4) 50%, rgba(6, 182, 212, 0.3) 75%, rgba(139, 92, 246, 0.3) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Glowing pulse overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.4) 50%, transparent 100%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default GradientDivider;
