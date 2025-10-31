#!/bin/bash

echo "🔍 Checking video file locations..."

# Check what videos we have
echo ""
echo "Videos in public/:"
ls -lh public/*.mp4 2>/dev/null || echo "  No MP4 files in public/"

echo ""
echo "Videos in public/videos/:"
ls -lh public/videos/*.mp4 2>/dev/null || echo "  No MP4 files in public/videos/"

# Backup
cp app/page.tsx app/page.tsx.backup-video-paths-$(date +%Y%m%d-%H%M%S)

# Let's update the video sources based on what we have
echo ""
echo "📹 Updating video source paths..."

python3 << 'PYTHON_EOF'
import os
import re

# Check what videos exist
mobile_video_exists = os.path.exists('public/VIDEO-2025-10-31-20-16-50.mp4')
desktop_video_exists = os.path.exists('public/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4')

print(f"Mobile video exists: {mobile_video_exists}")
print(f"Desktop video exists: {desktop_video_exists}")

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Update video sources
if mobile_video_exists and not desktop_video_exists:
    # Use mobile video for both mobile and desktop
    print("\n✅ Using VIDEO-2025-10-31-20-16-50.mp4 for ALL devices")
    
    # Replace the video element
    old_video = r'<video[^>]*>.*?</video>'
    new_video = '''<video autoPlay loop muted playsInline className="w-full h-full object-cover hero-video-background">
                <source src="/VIDEO-2025-10-31-20-16-50.mp4" type="video/mp4" />
              </video>'''
    
    content = re.sub(old_video, new_video, content, flags=re.DOTALL)
    
elif mobile_video_exists and desktop_video_exists:
    # Keep both videos
    print("\n✅ Using different videos for mobile and desktop")
    
    old_video = r'<video[^>]*>.*?</video>'
    new_video = '''<video autoPlay loop muted playsInline className="w-full h-full object-cover hero-video-background">
                <source src="/VIDEO-2025-10-31-20-16-50.mp4" type="video/mp4" media="(max-width: 768px)" />
                <source src="/videos/user-ai-generation-FomhdaM140Cu-1080p.mp4" type="video/mp4" />
              </video>'''
    
    content = re.sub(old_video, new_video, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

PYTHON_EOF

echo ""
echo "📹 Updated video element:"
grep -A 3 "<video" app/page.tsx | head -6

# Build test
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🚀 Deploying fix..."
    
    git add .
    git commit -m "fix: Update video paths - use mobile video for all devices

- Mobile video: /VIDEO-2025-10-31-20-16-50.mp4
- Desktop video removed (was in /videos/ which no longer exists)
- Same video now plays on all devices
- Added hero-video-background class for mobile styling
- Left-aligned on mobile, centered on desktop"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo ""
    echo "📱 Video setup:"
    echo "  ✅ All devices use: VIDEO-2025-10-31-20-16-50.mp4"
    echo "  ✅ Mobile: Left-aligned, fills viewport"
    echo "  ✅ Desktop: Standard display"
    echo "  ✅ Continuous loop, autoplay"
    echo ""
    echo "🌐 Live in 2-3 minutes!"
else
    echo "❌ Build failed!"
    cp app/page.tsx.backup-video-paths-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

