import { useState, useEffect, useCallback } from 'react';

interface VoiceConfig {
  enabled: boolean;
  volume: number;
}

const STORAGE_KEY = 'creative-workspace-voice-config';

const voiceScripts = [
  "Hey, thanks for visiting us! Did you know you can build your website in less than a minute — without typing a single word?",
  "Wanna see how your site could look? Let's make a preview, free — right now.",
  "Just say it — or click start. We'll do the heavy lifting.",
];

export function useVoiceAssist() {
  const [config, setConfig] = useState<VoiceConfig>({
    enabled: true,
    volume: 0.85,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse voice config:', e);
      }
    }

    setIsSupported('speechSynthesis' in window);
  }, []);

  const saveConfig = useCallback((newConfig: Partial<VoiceConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const speak = useCallback((text: string) => {
    if (!isSupported || !config.enabled || typeof window === 'undefined') return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = config.volume;
    utterance.rate = 0.93;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Google') ||
        (voice.lang.includes('en') && voice.name.toLowerCase().includes('female'))
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [config.enabled, config.volume, isSupported]);

  const playGreeting = useCallback(() => {
    if (!hasPlayedOnce && config.enabled) {
      const randomScript = voiceScripts[Math.floor(Math.random() * voiceScripts.length)];
      speak(randomScript);
      setHasPlayedOnce(true);
    }
  }, [config.enabled, speak, hasPlayedOnce]);

  const toggleVoice = useCallback(() => {
    const newEnabled = !config.enabled;
    saveConfig({ enabled: newEnabled });
    
    if (!newEnabled && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [config.enabled, saveConfig]);

  const replay = useCallback(() => {
    setHasPlayedOnce(false);
    playGreeting();
  }, [playGreeting]);

  return {
    enabled: config.enabled,
    isPlaying,
    isSupported,
    speak,
    playGreeting,
    toggleVoice,
    replay,
  };
}

export default useVoiceAssist;
