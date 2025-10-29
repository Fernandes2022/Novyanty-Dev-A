"use client";

import { motion } from "framer-motion";

export function GradientDivider() {
  return (
    <div className="relative h-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "linear-gradient(90deg, transparent, rgba(123, 92, 255, 0.5), transparent)",
            "linear-gradient(90deg, transparent, rgba(255, 102, 196, 0.5), transparent)",
            "linear-gradient(90deg, transparent, rgba(0, 245, 160, 0.5), transparent)",
            "linear-gradient(90deg, transparent, rgba(123, 92, 255, 0.5), transparent)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating wave effect */}
      <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#gradient)"
          animate={{
            d: [
              "M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z",
              "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z",
              "M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(123, 92, 255, 0.2)" />
            <stop offset="50%" stopColor="rgba(255, 102, 196, 0.2)" />
            <stop offset="100%" stopColor="rgba(0, 245, 160, 0.2)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
