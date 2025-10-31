#!/bin/bash

echo "📁 Moving mobile video to public/videos/ folder..."

# 1. Move the video file
if [ -f "public/VIDEO-2025-10-31-20-16-50.mp4" ]; then
    mv public/VIDEO-2025-10-31-20-16-50.mp4 public/videos/VIDEO-2025-10-31-20-16-50.mp4
    echo "✅ Moved VIDEO-2025-10-31-20-16-50.mp4 to public/videos/"
else
    echo "⚠️  Video already in correct location or not found"
fi

# 2. Backup page.tsx
cp app/page.tsx app/page.tsx.backup-video-location-$(date +%Y%m%d-%H%M%S)

# 3. Update the video path in page.tsx
echo "📹 Updating video path in code..."

sed -i 's|src="/VIDEO-2025-10-31-20-16-50.mp4"|src="/videos/VIDEO-2025-10-31-20-16-50.mp4"|g' app/page.tsx

echo "✅ Video path updated"

# 4. Verify changes
echo ""
echo "📹 Updated video element:"
grep -A 3 "<video" app/page.tsx | head -6

echo ""
echo "📁 Videos in public/videos/:"
ls -lh public/videos/*.mp4 | grep -E "(VIDEO-2025|x-large-vecteezy)"

# 5. Test build
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🚀 Deploying final fix..."
    
    git add .
    git commit -m "fix: Move mobile video to public/videos/ folder for consistency

- Moved VIDEO-2025-10-31-20-16-50.mp4 to public/videos/
- Updated video path to /videos/VIDEO-2025-10-31-20-16-50.mp4
- Both videos now properly organized in public/videos/

📱 Mobile: /videos/VIDEO-2025-10-31-20-16-50.mp4
🖥️  Desktop: /videos/x-large-vecteezy...mp4

All videos in one location for better organization"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo ""
    echo "📋 FINAL VIDEO SETUP:"
    echo "  📁 Location: public/videos/"
    echo "  📱 Mobile: VIDEO-2025-10-31-20-16-50.mp4 (left-aligned)"
    echo "  🖥️  Desktop: x-large-vecteezy...mp4 (centered)"
    echo ""
    echo "🌐 Live in 2-3 minutes!"
    echo ""
    echo "🎉 ALL DONE! Everything is properly organized now!"
else
    echo "❌ Build failed!"
    cp app/page.tsx.backup-video-location-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

