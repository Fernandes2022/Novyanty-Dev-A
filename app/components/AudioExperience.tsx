"use client";
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AudioExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const voiceoverScript = `Welcome to Creative Workspace. A place where dreams transform into reality. 
    Where your ideas dance across the screen, painting stories only you can tell. 
    We believe in the power of creation. The magic of bringing something beautiful into the world. 
    No barriers. No complexity. Just you and your vision. 
    Let us be the canvas for your masterpiece. Let us help you build something extraordinary. 
    Because every great creation starts with a single spark. And that spark... is you.`;

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const playPianoNote = (frequency: number, duration: number, delay: number) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    setTimeout(() => {
      const oscillator = audioContextRef.current!.createOscillator();
      const noteGain = audioContextRef.current!.createGain();
      
      oscillator.type = 'sine'; // Piano-like sound
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current!.currentTime);
      
      // ADSR envelope for piano-like sound
      noteGain.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.3, audioContextRef.current!.currentTime + 0.01);
      noteGain.gain.exponentialRampToValueAtTime(0.1, audioContextRef.current!.currentTime + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current!.currentTime + duration);
      
      oscillator.connect(noteGain);
      noteGain.connect(gainNodeRef.current!);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current!.currentTime + duration);
      
      oscillatorsRef.current.push(oscillator);
    }, delay);
  };

  const playPianoMelody = () => {
    // Beautiful, emotional piano progression (Cmaj7 - Am7 - Fmaj7 - G)
    const melody = [
      { notes: [261.63, 329.63, 392.00, 493.88], duration: 2, delay: 0 },      // Cmaj7
      { notes: [220.00, 261.63, 329.63, 440.00], duration: 2, delay: 2000 },   // Am7
      { notes: [174.61, 261.63, 329.63, 440.00], duration: 2, delay: 4000 },   // Fmaj7
      { notes: [196.00, 246.94, 293.66, 392.00], duration: 2, delay: 6000 },   // G
      { notes: [261.63, 329.63, 392.00, 493.88], duration: 3, delay: 8000 },   // Cmaj7 (resolution)
    ];

    melody.forEach(chord => {
      chord.notes.forEach(frequency => {
        playPianoNote(frequency, chord.duration, chord.delay);
      });
    });

    // Heartbeat-like bass pulse
    const heartbeat = [
      { freq: 65.41, delay: 0 },     // C2
      { freq: 65.41, delay: 400 },
      { freq: 65.41, delay: 2000 },
      { freq: 65.41, delay: 2400 },
      { freq: 65.41, delay: 4000 },
      { freq: 65.41, delay: 4400 },
      { freq: 65.41, delay: 6000 },
      { freq: 65.41, delay: 6400 },
      { freq: 65.41, delay: 8000 },
      { freq: 65.41, delay: 8400 },
    ];

    heartbeat.forEach(beat => {
      playPianoNote(beat.freq, 0.3, beat.delay);
    });
  };

  const speakVoiceover = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(voiceoverScript);
    
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Female') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Zira')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.85; // Slow, sensational delivery
    utterance.pitch = 1.05; // Slightly higher, warm female voice
    utterance.volume = 0.9;

    window.speechSynthesis.speak(utterance);
  };

  const startAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : 0.15, audioContextRef.current.currentTime);
    }

    setIsPlaying(true);
    
    // Start voiceover
    speakVoiceover();
    
    // Start piano music
    const playMusic = () => {
      playPianoMelody();
    };
    
    playMusic();
    
    // Loop piano every 11 seconds
    intervalRef.current = setInterval(playMusic, 11000);

    // Progress animation
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);
  };

  const stopAudio = () => {
    setIsPlaying(false);
    setProgress(0);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    window.speechSynthesis.cancel();
    
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      gainNodeRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0.15 : 0,
        audioContextRef.current!.currentTime
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        className="glass-dark rounded-2xl p-4 md:p-6 border border-purple-500/30 backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0
              }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
            >
              <Music className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white">Experience Our Vision</h3>
              <p className="text-xs text-gray-400">Piano & Voiceover Journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 md:p-3 rounded-lg border-2 transition-all ${
                isPlaying 
                  ? 'bg-purple-600 border-purple-500 text-white' 
                  : 'glass border-white/20 text-white hover:border-purple-500/50'
              }`}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Pause className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play className="h-4 w-4 md:h-5 md:w-5 ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 md:p-3 rounded-lg glass border-2 border-white/20 text-white hover:border-purple-500/50 transition-all"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-black/40 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          {isPlaying && (
            <motion.div
              className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '400%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </div>

        {/* Visualizer */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex items-center justify-center gap-1"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-full"
                animate={{
                  height: [8, 32, 8],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut"
                }}
                style={{ height: 8 }}
              />
            ))}
          </motion.div>
        )}

        {/* Beautiful Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 1 : 0.5 }}
          transition={{ duration: 1 }}
          className="text-center text-xs md:text-sm text-gray-400 italic mt-4"
        >
          "Every great creation starts with a single spark..."
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
