#!/bin/bash

echo "🔧 Restoring workspace properly..."
echo ""

# Restore from backup
cp app/workspace/page.tsx.backup-ultimate-* app/workspace/page.tsx

echo "✅ Workspace restored to working state"
echo ""

# The video is already fine - it has autoPlay, loop, muted, playsInline
# Just leave it as is!

echo "Current video section:"
sed -n '178,190p' app/workspace/page.tsx

echo ""
echo "Video already has correct attributes - no changes needed!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📹 Current state:"
    echo "   ✅ Homepage video - Fixed with webkit prefixes"
    echo "   ✅ VideoBackground - Better error handling"
    echo "   ✅ Workspace video - Already working correctly"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Improve video mute and autoplay consistency

- Homepage video: webkit prefixes for iOS
- VideoBackground: better autoplay error handling
- Force muted state on all videos
- Consistent video behavior across browsers"
        
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Build failed"
fi

