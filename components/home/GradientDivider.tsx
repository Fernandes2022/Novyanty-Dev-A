'use client';

import { motion } from 'framer-motion';

export function GradientDivider() {
  return (
    <div className="relative h-14 md:h-16 overflow-hidden">
      {/* Main flowing gradient - EXACT from Vercel */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.35) 0%, rgba(236, 72, 153, 0.4) 25%, rgba(139, 92, 246, 0.4) 50%, rgba(6, 182, 212, 0.35) 75%, rgba(139, 92, 246, 0.35) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Soft glow pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.25) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default GradientDivider;
