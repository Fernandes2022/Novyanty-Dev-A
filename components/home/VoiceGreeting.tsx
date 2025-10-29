'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useVoiceAssist } from '@/hooks/useVoiceAssist';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VoiceGreetingProps {
  autoPlay?: boolean;
  position?: 'bottom-left' | 'bottom-right';
}

export function VoiceGreeting({ 
  autoPlay = true,
  position = 'bottom-left'
}: VoiceGreetingProps) {
  const { enabled, isPlaying, isSupported, toggleVoice, playGreeting, replay } = useVoiceAssist();
  const prefersReducedMotion = useReducedMotion();
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    if (!autoPlay || !enabled || !isSupported) return;

    // Desktop: Play after 2 seconds
    const desktopTimer = setTimeout(() => {
      playGreeting();
      setTimeout(() => setShowReplay(true), 10000);
    }, 2000);

    // Mobile: Play on ANY interaction
    const playOnMobile = () => {
      playGreeting();
      setTimeout(() => setShowReplay(true), 10000);
    };

    // Listen for mobile interactions
    const events = ['touchstart', 'click', 'scroll'];
    const listener = () => {
      playOnMobile();
      events.forEach(e => document.removeEventListener(e, listener));
    };
    
    events.forEach(event => {
      document.addEventListener(event, listener, { once: true, passive: true });
    });

    return () => {
      clearTimeout(desktopTimer);
      events.forEach(e => document.removeEventListener(e, listener));
    };
  }, [autoPlay, enabled, isSupported, playGreeting]);

  if (!isSupported) return null;

  const positionClasses = position === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6';

  return (
    <div className={`fixed ${positionClasses} z-50 flex flex-col gap-3`}>
      <motion.button
        onClick={toggleVoice}
        className={`group relative w-14 h-14 rounded-full backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-xl ${
          enabled 
            ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-purple-500/50' 
            : 'bg-white/10 border-2 border-white/20'
        }`}
        whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
        whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        {isPlaying && !prefersReducedMotion && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-600 to-purple-600"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: 0.15 }}
            />
          </>
        )}

        <div className="relative z-10">
          {enabled ? (
            <motion.div animate={isPlaying ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}>
              <Volume2 className="w-6 h-6 text-white drop-shadow-lg" />
            </motion.div>
          ) : (
            <VolumeX className="w-6 h-6 text-white/70" />
          )}
        </div>

        <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {enabled ? '🔇 Mute' : '🔊 Unmute'}
        </div>
      </motion.button>

      <AnimatePresence>
        {showReplay && enabled && (
          <motion.button
            onClick={() => {
              replay();
              setShowReplay(false);
              setTimeout(() => setShowReplay(true), 10000);
            }}
            className="group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200 shadow-lg"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
            whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
          >
            <RotateCcw className="w-5 h-5 text-white/80" />
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              🔁 Replay
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VoiceGreeting;
