'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroParallaxProps {
  children: React.ReactNode;
}

export function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const prefersReducedMotion = useReducedMotion();
  const lastUpdateTime = useRef(0);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime.current < 100) return; // Throttle to 10fps
      lastUpdateTime.current = now;

      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ opacity: prefersReducedMotion ? 1 : opacity }}
    >
      <div
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: prefersReducedMotion
            ? 'linear-gradient(135deg, #0B0B15 0%, #111827 100%)'
            : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(123, 92, 255, 0.2) 0%, transparent 50%), linear-gradient(135deg, #0B0B15 0%, #111827 100%)`,
        }}
      />

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #7B5CFF 0%, transparent 70%)', top: '20%', left: '10%' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #FF66C4 0%, transparent 70%)', bottom: '20%', right: '10%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B15] to-transparent z-10 pointer-events-none" />
    </motion.div>
  );
}

export default HeroParallax;
