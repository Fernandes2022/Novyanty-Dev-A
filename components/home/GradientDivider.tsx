'use client';

import { motion } from 'framer-motion';

export function GradientDivider() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      {/* Subtle background blend - nearly invisible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      
      {/* Moving wave line - THIS is what's visible */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[4px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 20%, rgba(236, 72, 153, 0.9) 40%, rgba(139, 92, 246, 0.9) 60%, rgba(6, 182, 212, 0.8) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
          filter: 'blur(1px)',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Glowing pulse on the wave */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.6) 0%, transparent 50%)',
          backgroundSize: '50% 100%',
        }}
        animate={{
          opacity: [0.4, 0.9, 0.4],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default GradientDivider;
