"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useSoundManager } from "@/hooks/useSoundManager";

export function SoundToggle() {
  const { isMuted, toggleMute, isLoaded } = useSoundManager();

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          !isMuted
            ? "bg-gradient-to-br from-blue-600 to-cyan-600"
            : "glass border border-white/20"
        }`}
      >
        {!isMuted ? (
          <>
            <Music className="h-6 w-6 text-white" />
            {/* Music wave animation */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </>
        ) : (
          <VolumeX className="h-6 w-6" />
        )}
      </motion.button>
    </motion.div>
  );
}
