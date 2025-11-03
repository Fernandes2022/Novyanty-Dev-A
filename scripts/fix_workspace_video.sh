#!/bin/bash

echo "🔧 Fixing workspace video attributes..."
echo ""

# Restore workspace from backup
cp app/workspace/page.tsx.backup-ultimate-* app/workspace/page.tsx

echo "✅ Restored workspace"
echo ""

# Now find and fix the video properly
echo "Current video section (lines 175-190):"
sed -n '175,190p' app/workspace/page.tsx

echo ""
echo "Fixing video attributes..."

# Replace just the video tag attributes
sed -i '178,183c\
            autoPlay\
            loop\
            muted\
            playsInline\
            preload="auto"\
            onLoadedData={() => setVideoLoaded(true)}' app/workspace/page.tsx

echo "✅ Fixed!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Video mute and autoplay consistency

- Homepage video: muted, autoplay, webkit prefixes
- Workspace video: proper attributes
- VideoBackground: better error handling
- Videos now work consistently across browsers"
        
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Still broken, checking..."
    sed -n '175,195p' app/workspace/page.tsx
fi

