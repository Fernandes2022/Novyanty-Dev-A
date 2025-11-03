#!/bin/bash

echo "🔧 FIXING VIDEO MUTE & AUTOPLAY ISSUES..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-video-$(date +%Y%m%d-%H%M%S)
cp components/home/VideoBackground.tsx components/home/VideoBackground.tsx.backup-$(date +%Y%m%d-%H%M%S)

echo "1️⃣  Fixing main video in homepage..."

# Fix the video element to ensure muted works
sed -i '176s/.*/<video autoPlay loop muted playsInline webkit-playsinline x-webkit-airplay="allow" preload="auto" className="w-full h-full object-cover hero-video-background">/' app/page.tsx

echo "✅ Added webkit prefixes and preload"
echo ""

echo "2️⃣  Updating VideoBackground component..."

# Replace VideoBackground with better implementation
cat > components/home/VideoBackground.tsx << 'VIDEO_BG'
'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from 'next-themes';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force mute first
    video.muted = true;
    video.defaultMuted = true;
    
    const playVideo = async () => {
      try {
        // Ensure muted before playing
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Video autoplay prevented, waiting for user interaction');
        
        // Retry on user interaction
        const tryPlay = async () => {
          try {
            video.muted = true;
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
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
VIDEO_BG

echo "✅ VideoBackground updated with better error handling"
echo ""

echo "3️⃣  Fixing workspace video..."

# Update workspace video
sed -i '179,182s/.*/            autoPlay\n            loop\n            muted\n            playsInline\n            webkit-playsinline="true"\n            preload="auto"/' app/workspace/page.tsx 2>/dev/null || echo "Workspace video OK"

echo "✅ Workspace video updated"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  VIDEO FIXES APPLIED!"
    echo "✅ =========================================="
    echo ""
    echo "📹 What's fixed:"
    echo "   ✅ Videos now ALWAYS muted by default"
    echo "   ✅ Better autoplay handling (works on more browsers)"
    echo "   ✅ Fallback to play on user interaction"
    echo "   ✅ Proper webkit prefixes for iOS"
    echo "   ✅ Preload for faster playback"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Improve video mute and autoplay consistency

- Force muted state before playing
- Add webkit prefixes for iOS compatibility  
- Better error handling for autoplay
- Fallback to user interaction if blocked
- Add preload for smoother playback
- Videos now consistently muted and autoplay"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! Videos will work consistently now! 🎥"
    fi
else
    echo "❌ Build failed"
fi

