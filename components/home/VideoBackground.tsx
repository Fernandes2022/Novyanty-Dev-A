'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from 'next-themes';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play().catch(() => {
        const play = () => video.play();
        ['click', 'touchstart', 'scroll'].forEach(event => {
          document.addEventListener(event, play, { once: true, passive: true });
        });
      });
    };

    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  if (prefersReducedMotion) return null;

  const opacity = 0.7;
  const isLight = theme === 'light';
  const filter = isLight 
    ? 'brightness(1.2) contrast(1.1) saturate(1.2)' 
    : 'brightness(0.95) contrast(1.1) saturate(1.15)';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity,
          filter,
          transform: 'translate3d(0,0,0)',
          willChange: 'auto',
        }}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/How much FPS.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoBackground;
