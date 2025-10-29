'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from 'next-themes';

const mobileVideos = [
  '/videos/14282782_1080_1920_30fps.mp4',
  '/videos/14497408_1080_1920_60fps.mp4',
];

const desktopVideos = [
  '/videos/13706140_2160_3840_25fps.mp4',
  '/videos/14281440_2160_3840_50fps.mp4',
  '/videos/14318139_2160_3840_30fps.mp4',
  '/videos/14435039_2160_3840_24fps.mp4',
];

export function VideoBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videos = isMobile ? mobileVideos : desktopVideos;

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

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.addEventListener('ended', handleEnded);
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, videos.length]);

  if (prefersReducedMotion) return null;

  const isLight = theme === 'light';
  const opacity = isMobile ? (isLight ? 0.4 : 0.35) : (isLight ? 0.45 : 0.3);
  const filter = isMobile
    ? (isLight ? 'brightness(1.1) contrast(1.15) saturate(1.2)' : 'brightness(0.9) contrast(1.1) saturate(1.15)')
    : (isLight ? 'brightness(1.15) contrast(1.2) saturate(1.25)' : 'brightness(0.85) contrast(1.15) saturate(1.1)');

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        key={currentIndex}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          opacity,
          filter,
          transform: 'translate3d(0,0,0)',
          willChange: 'opacity',
        }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videos[currentIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoBackground;
