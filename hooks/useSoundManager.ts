import { useEffect, useState, useCallback } from "react";

export function useSoundManager() {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("soundEnabled");
    if (saved !== null) {
      setIsMuted(saved === "false");
    }
    setIsLoaded(true);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem("soundEnabled", String(!newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback((soundName: string) => {
    if (isMuted) return;
    
    // Play sound logic here
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Silently fail if autoplay blocked
    });
  }, [isMuted]);

  return { isMuted, toggleMute, playSound, isLoaded };
}
