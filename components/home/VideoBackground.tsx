'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import { Volume2, VolumeX } from 'lucide-react';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted for autoplay to work
    video.muted = true;
    video.defaultMuted = true;
    
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Video autoplay prevented, waiting for user interaction');
        
        // Retry on user interaction
        const tryPlay = async () => {
          try {
            await video.play();
            setIsPlaying(true);
          } catch (e) {
            console.log('Still cannot play video');
          }
        };

        // Try on multiple events
        const events = ['click', 'touchstart', 'touchend', 'scroll'];
        events.forEach(event => {
          document.addEventListener(event, tryPlay, { once: true, passive: true });
        });
      }
    };

    // Wait for video to be ready
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    video.load();

    return () => {
      video.pause();
    };
  }, []);

  // Toggle mute function
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (prefersReducedMotion) return null;

  const opacity = 0.7;
  const isLight = false; // Always dark mode
  const filter = isLight 
    ? 'brightness(1.2) contrast(1.1) saturate(1.2)' 
    : 'brightness(0.95) contrast(1.1) saturate(1.15)';

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Video - pointer-events-none so content above is clickable */}
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          style={{
            opacity,
            filter,
            transform: 'translate3d(0,0,0)',
            willChange: 'auto',
          }}
        >
          <source src="/videos/How much FPS.mp4?v=1762159836" type="video/mp4" />
        </video>
      </div>

      {/* Mute button - HAS pointer events */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 pointer-events-auto w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/40 group"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
