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
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.log('Text-to-speech not supported in this browser');
      return;
    }

    // Load voices - they may not be immediately available
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log('Voices loaded:', voices.length);
      }
    };

    // Load voices immediately
    loadVoices();

    // Also listen for voiceschanged event (Chrome needs this)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech!');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Wait a moment for cancel to complete
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.length);
      
      // Try to find a female voice
      let femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Google US English Female') ||
        voice.name.includes('Microsoft Zira') ||
        (voice.name.includes('en') && voice.name.includes('Female'))
      );

      // If no female voice found, try to get any English voice
      if (!femaleVoice) {
        femaleVoice = voices.find(voice => 
          voice.lang.startsWith('en')
        );
      }

      // If still no voice, use the first available
      if (!femaleVoice && voices.length > 0) {
        femaleVoice = voices[0];
      }
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
        console.log('Using voice:', femaleVoice.name);
      } else {
        console.log('No voice found, using default');
      }
      
      // Voice settings
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 1.0; // Full volume

      // Event handlers
      utterance.onstart = () => {
        console.log('Speech started');
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsSpeaking(false);
        alert('Error with text-to-speech. Please try again.');
      };

      // Speak!
      window.speechSynthesis.speak(utterance);
      console.log('Speech queued');
    }, 100);
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      console.log('Stopping speech');
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      console.log('Starting speech');
      speak();
    }
  };

  return (
    <motion.button
      onClick={toggleVoice}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg border transition-all text-sm font-semibold ${
        isSpeaking 
          ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/50' 
          : 'glass border-white/20 hover:border-purple-500/50 text-white hover:bg-white/10'
      }`}
    >
      <motion.div
        animate={isSpeaking ? { 
          scale: [1, 1.3, 1],
          rotate: [0, 5, -5, 0]
        } : {}}
        transition={{ 
          duration: 0.5, 
          repeat: isSpeaking ? Infinity : 0 
        }}
      >
        {isSpeaking ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </motion.div>
      <span>
        {isSpeaking ? '🎙️ Speaking...' : '🎧 Listen to Guide'}
      </span>
    </motion.button>
  );
}
