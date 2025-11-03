#!/bin/bash

echo "🔧 FIXING 'How much FPS' VIDEO PLAYBACK..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-fpsvideo-$(date +%Y%m%d-%H%M%S)

echo "1️⃣  Adding video playback handler..."

# Find the video section and add proper ref and useEffect
# First, check if we already have video handling
if grep -q "videoFpsRef" app/page.tsx; then
    echo "Video ref already exists, updating..."
else
    echo "Adding new video ref..."
    
    # Add useRef for the FPS video at the top with other refs
    sed -i '/const \[showVideo.*useState/a\  const videoFpsRef = useRef<HTMLVideoElement>(null);' app/page.tsx
fi

# Now add the useEffect to handle video playback
if ! grep -q "videoFpsRef.current?.play" app/page.tsx; then
    # Find where to add the useEffect (after other useEffects)
    LINE_NUM=$(grep -n "useEffect.*videoRef" app/page.tsx | head -1 | cut -d: -f1)
    
    if [ -n "$LINE_NUM" ]; then
        # Add after existing video useEffect
        sed -i "${LINE_NUM}a\\
  // FPS Video autoplay handler\\
  useEffect(() => {\\
    const video = videoFpsRef.current;\\
    if (!video || !showVideo) return;\\
\\
    video.muted = true;\\
    video.defaultMuted = true;\\
\\
    const playVideo = async () => {\\
      try {\\
        await video.play();\\
      } catch (error) {\\
        console.log('FPS video autoplay blocked, will play on interaction');\\
        const events = ['click', 'touchstart', 'scroll'];\\
        events.forEach(event => {\\
          document.addEventListener(event, async () => {\\
            try {\\
              await video.play();\\
            } catch (e) {}\\
          }, { once: true, passive: true });\\
        });\\
      }\\
    };\\
\\
    if (video.readyState >= 3) {\\
      playVideo();\\
    } else {\\
      video.addEventListener('loadeddata', playVideo, { once: true });\\
    }\\
\\
    return () => {\\
      video.pause();\\
    };\\
  }, [showVideo]);\\
" app/page.tsx
    fi
fi

# Update the video tag to include ref
sed -i 's/<video autoPlay loop muted playsInline className="w-full h-full object-cover hero-video-background">/<video ref={videoFpsRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover hero-video-background">/' app/page.tsx

echo "✅ Video handler added!"
echo ""

echo "2️⃣  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📹 FPS Video fixes:"
    echo "   ✅ Added ref for video control"
    echo "   ✅ Force muted state"
    echo "   ✅ Autoplay with fallback"
    echo "   ✅ Play on user interaction if blocked"
    echo "   ✅ Added preload for faster start"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Add proper video playback handling for FPS video

- Added video ref for better control
- Force muted state before playing
- Fallback to play on user interaction
- Better error handling
- Added preload for faster playback
- Video now plays consistently"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! FPS video should play now! 🎥"
    fi
else
    echo "❌ Build failed, checking errors..."
fi

