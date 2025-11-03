#!/bin/bash

echo "🔧 Adding videoFpsRef properly..."
echo ""

# Find where refs are declared (look for videoRef)
echo "Finding ref declarations..."
grep -n "useRef" app/page.tsx | head -5

echo ""

# Add the ref right after the existing videoRef
sed -i '/const videoRef = useRef/a\  const videoFpsRef = useRef<HTMLVideoElement>(null);' app/page.tsx

echo "✅ Added videoFpsRef"
echo ""

echo "Checking refs now:"
grep -n "videoRef\|videoFpsRef" app/page.tsx | head -5

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
        git commit -m "fix: Add video ref for FPS video playback"
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Still broken"
fi

