#!/bin/bash

echo "🔧 ADDING autoPlay ATTRIBUTE TO FIX AUTOPLAY..."
echo ""

# Backup
cp components/home/VideoBackground.tsx components/home/VideoBackground.tsx.backup-autoplay-$(date +%Y%m%d-%H%M%S)

# Add autoPlay attribute to the video element
sed -i '' 's/<video$/<video\n          autoPlay/' components/home/VideoBackground.tsx

echo "✅ Added autoPlay attribute!"
echo ""

echo "Verifying the change:"
grep -A 5 "<video" components/home/VideoBackground.tsx | head -10
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎥 Video should now:"
    echo "   ✅ Autoplay on page load"
    echo "   ✅ Start muted (for browser policy)"
    echo "   ✅ Loop continuously"
    echo "   ✅ Mute/unmute button works"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Add autoPlay attribute to background video

- Video now autoplays on page load
- Starts muted for browser autoplay policy compliance
- Works with existing mute/unmute button"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! Video should autoplay now!"
    fi
else
    echo "❌ Build failed, restoring backup..."
    LATEST_BACKUP=$(ls -t components/home/VideoBackground.tsx.backup-* | head -1)
    cp "$LATEST_BACKUP" components/home/VideoBackground.tsx
fi

