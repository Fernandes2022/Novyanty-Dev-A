'use client';

import { motion } from 'framer-motion';

export function GradientDivider() {
  return (
    <div className="relative h-20 md:h-24 overflow-hidden">
      {/* Flowing water wave layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 20%, #8B5CF6 40%, #06B6D4 60%, #8B5CF6 80%, #EC4899 100%)',
          backgroundSize: '300% 100%',
          opacity: 0.4,
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
      
      {/* Flowing water wave layer 2 (opposite direction) */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #06B6D4 0%, #8B5CF6 25%, #EC4899 50%, #8B5CF6 75%, #06B6D4 100%)',
          backgroundSize: '300% 100%',
          opacity: 0.3,
        }}
        animate={{
          backgroundPosition: ['100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Pulsing glow overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Top shimmer line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #8B5CF6 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '200% 50%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Bottom shimmer line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #EC4899 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 50%', '0% 50%'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

export default GradientDivider;
