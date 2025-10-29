'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  sparkles?: boolean;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  sparkles = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [hasPlayed, setHasPlayed] = useState(false);

  const spring = useSpring(from, { stiffness: 50, damping: 30, duration: duration * 1000 });
  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      spring.set(to);
      if (!hasPlayed) {
        setHasPlayed(true);
      }
    } else if (isInView && prefersReducedMotion) {
      spring.set(to);
    }
  }, [isInView, to, spring, prefersReducedMotion, hasPlayed]);

  const sparklePositions = sparkles
    ? Array.from({ length: 8 }, (_, i) => ({ angle: (i * 360) / 8, delay: i * 0.1 }))
    : [];

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-bold">
          {prefix}
          <motion.span>{display}</motion.span>
          {suffix}
        </span>
      </motion.div>

      {sparkles && isInView && !prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {sparklePositions.map((sparkle, i) => {
            const angle = (sparkle.angle * Math.PI) / 180;
            const distance = 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x, y, scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: sparkle.delay, ease: 'easeOut' }}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-[2px]" />
              </motion.div>
            );
          })}
        </div>
      )}

      {isInView && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(135deg, rgba(123, 92, 255, 0.5) 0%, rgba(255, 102, 196, 0.5) 100%)' }}
        />
      )}
    </div>
  );
}

export default AnimatedCounter;
