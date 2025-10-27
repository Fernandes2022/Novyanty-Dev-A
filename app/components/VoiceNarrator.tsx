"use client";
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceNarratorProps {
  text: string;
  autoPlay?: boolean;
}

export function VoiceNarrator({ text, autoPlay = false }: VoiceNarratorProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const enabled = localStorage.getItem('voice-enabled') === 'true';
    setIsEnabled(enabled);
    
    if (enabled && autoPlay) {
      speak(text);
    }
  }, [text, autoPlay]);

  const speak = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) {
      console.log('Text-to-speech not supported');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Zira')
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speak(text);
    }
  };

  const toggleEnabled = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('voice-enabled', String(newState));
    if (!newState) {
      window.speechSynthesis.cancel();
    }
  };

  if (!isEnabled) {
    return (
      <motion.button
        onClick={toggleEnabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/20 hover:border-purple-500/50 transition-colors text-sm"
      >
        <VolumeX className="h-4 w-4" />
        <span className="hidden sm:inline">Enable Voice</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleVoice}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm ${
        isSpeaking 
          ? 'bg-purple-600 border-purple-500 text-white' 
          : 'glass border-white/20 hover:border-purple-500/50'
      }`}
    >
      <motion.div
        animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Volume2 className="h-4 w-4" />
      </motion.div>
      <span className="hidden sm:inline">
        {isSpeaking ? 'Speaking...' : 'Listen'}
      </span>
    </motion.button>
  );
}
