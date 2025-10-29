"use client";
/* eslint-disable react/no-unknown-property */
import { motion, useScroll, useTransform } from 'framer-motion';

export function GlowLayer() {
  const { scrollYProgress } = useScroll();
  
  const hue1 = useTransform(scrollYProgress, [0, 1], [260, 180]);
  const hue2 = useTransform(scrollYProgress, [0, 1], [200, 280]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: useTransform(
            hue1,
            h => `hsl(${h}, 70%, 50%)`
          ),
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{
          background: useTransform(
            hue2,
            h => `hsl(${h}, 70%, 50%)`
          ),
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}
