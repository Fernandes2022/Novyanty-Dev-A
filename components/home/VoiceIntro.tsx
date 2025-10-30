'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function VoiceIntro() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if already played this session
    const played = sessionStorage.getItem('voiceIntroPlayed');
    if (played) {
      setHasPlayed(true);
      return;
    }

    // Auto-play after 1 second
    const timer = setTimeout(() => {
      playVoice();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const playVoice = () => {
    if (audioRef.current && !hasPlayed) {
      audioRef.current.play().catch(() => {
        // Auto-play blocked, user needs to interact first
        console.log('Autoplay blocked, waiting for user interaction');
      });
      setIsPlaying(true);
      setHasPlayed(true);
      sessionStorage.setItem('voiceIntroPlayed', 'true');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      {/* Audio element - using ElevenLabs text-to-speech or similar */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
      >
        {/* We'll generate this audio file */}
        <source src="/audio/intro-voice.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute/Unmute button */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleMute}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all group"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
            
            {/* Audio waves animation */}
            {!isMuted && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full rounded-full border-2 border-white/30"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default VoiceIntro;
