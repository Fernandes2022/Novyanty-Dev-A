'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Palette, Rocket } from 'lucide-react';

export default function LandingHero() {
  return (
    <div className="relative flex items-center justify-center h-full overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-6 p-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-2xl mx-auto"
        >
          <Sparkles className="w-10 h-10 text-violet-600" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-lg mb-4">
            Create Stunning Content
            <br />
            <span className="text-yellow-300">In Seconds</span>
          </h1>
          <p className="text-lg text-white/90 max-w-lg mx-auto drop-shadow">
            Adaptive-powered workspace that transforms your ideas into professional designs
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: Zap, label: 'Fast', color: 'from-yellow-400 to-orange-500' },
            { icon: Palette, label: 'Beautiful', color: 'from-pink-400 to-purple-500' },
            { icon: Rocket, label: 'Powerful', color: 'from-blue-400 to-cyan-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${item.color} text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2 cursor-pointer`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-4"
        >
          <p className="text-white/80 text-sm">
            ← Enter a prompt to get started
          </p>
        </motion.div>
      </div>
    </div>
  );
}