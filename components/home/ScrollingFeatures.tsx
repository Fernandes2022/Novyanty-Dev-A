'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ScrollingFeaturesProps {
  features: Feature[];
}

export function ScrollingFeatures({ features }: ScrollingFeaturesProps) {
  // Duplicate features for seamless loop
  const duplicatedFeatures = [...features, ...features, ...features];

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -100 * features.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedFeatures.map((feature, i) => (
          <motion.div
            key={i}
            className="card-dark group cursor-pointer flex-shrink-0 w-80"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default ScrollingFeatures;
