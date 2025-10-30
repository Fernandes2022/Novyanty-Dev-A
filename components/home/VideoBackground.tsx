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
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
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

  // Preload next video
  useEffect(() => {
    const nextVideo = nextVideoRef.current;
    if (nextVideo) {
      nextVideo.load();
    }
  }, [nextIndex]);

  useEffect(() => {
    const video = currentVideoRef.current;
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
      // Start smooth transition
      setIsTransitioning(true);
      
      // Play next video
      const nextVideo = nextVideoRef.current;
      if (nextVideo) {
        nextVideo.play().catch(console.log);
      }

      // Complete transition after fade
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % videos.length);
        setIsTransitioning(false);
      }, 1000); // 1 second crossfade
    };

    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.addEventListener('ended', handleEnded);
    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, nextIndex, videos.length]);

  if (prefersReducedMotion) return null;

  const isLight = theme === 'light';
  const filter = isMobile
    ? (isLight ? 'brightness(1.2) contrast(1.1) saturate(1.2)' : 'brightness(0.95) contrast(1.1) saturate(1.15)')
    : (isLight ? 'brightness(1.25) contrast(1.15) saturate(1.25)' : 'brightness(0.9) contrast(1.1) saturate(1.1)');

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Current Video */}
      <video
        ref={currentVideoRef}
        key={`current-${currentIndex}`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isTransitioning ? 0 : 1,
          filter,
          transform: 'translate3d(0,0,0)',
          willChange: 'opacity',
          transition: 'opacity 1s ease-in-out',
        }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videos[currentIndex]} type="video/mp4" />
      </video>

      {/* Next Video (for crossfade) */}
      <video
        ref={nextVideoRef}
        key={`next-${nextIndex}`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isTransitioning ? 1 : 0,
          filter,
          transform: 'translate3d(0,0,0)',
          willChange: 'opacity',
          transition: 'opacity 1s ease-in-out',
        }}
        muted
        playsInline
        preload="auto"
      >
        <source src={videos[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoBackground;
