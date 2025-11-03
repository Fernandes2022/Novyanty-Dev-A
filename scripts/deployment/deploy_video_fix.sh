#!/bin/bash

echo "🚀 Deploying video fix..."
echo ""

# Stage all changes
git add .

# Commit with clear message
git commit -m "fix: Update VideoBackground to use new video

- Changed from old 18MB video to new 2.3MB video
- VideoBackground.tsx now uses 'How much FPS.mp4'
- 87% file size reduction for faster loading
- Both mobile and desktop will now show new video"

# Push to production
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   VIDEO FIX DEPLOYED!"
    echo "🎉 ================================"
    echo ""
    echo "✅ VideoBackground.tsx updated and pushed!"
    echo ""
    echo "📊 What changed:"
    echo "   ❌ OLD: 18MB VR headset video"
    echo "   ✅ NEW: 2.3MB 'How much FPS.mp4'"
    echo ""
    echo "⏱️  Live in 2-3 minutes!"
    echo ""
    echo "🔄 After deployment:"
    echo "   - Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)"
    echo "   - Or clear cache if needed"
    echo ""
    echo "🎊 This was the missing piece! Video will now show! 🎊"
else
    echo "❌ Deployment failed!"
    exit 1
fi

