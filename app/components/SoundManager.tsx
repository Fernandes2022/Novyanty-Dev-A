"use client";
import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function SoundManager() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('sound-enabled');
    if (stored) {
      setSoundEnabled(stored === 'true');
    }

    if (typeof window !== 'undefined') {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
  }, []);

  const playBoop = () => {
    if (!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('sound-enabled', String(newState));
    if (newState) playBoop();
  };

  useEffect(() => {
    if (soundEnabled) {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          playBoop();
        }
      });
    }
  }, [soundEnabled]);

  return (
    <motion.button
      onClick={toggleSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-3 glass rounded-full border border-white/20 hover:border-purple-500/50 transition-colors"
      title={soundEnabled ? "Sound On" : "Sound Off"}
    >
      {soundEnabled ? (
        <Volume2 className="h-5 w-5 text-purple-400" />
      ) : (
        <VolumeX className="h-5 w-5 text-gray-400" />
      )}
    </motion.button>
  );
}
