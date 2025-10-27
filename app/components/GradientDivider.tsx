"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function GradientDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const hue = useTransform(scrollYProgress, [0, 1], [260, 180]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-32 relative overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            hue,
            h => `linear-gradient(90deg, 
              hsl(${h}, 70%, 50%), 
              hsl(${h + 40}, 70%, 50%), 
              hsl(${h}, 70%, 50%)
            )`
          ),
          filter: 'blur(40px)',
          opacity: 0.3
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}
