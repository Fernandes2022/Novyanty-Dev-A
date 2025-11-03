#!/bin/bash

echo "🔧 Adding hero-video-background class to video element..."

# Backup
cp app/page.tsx app/page.tsx.backup-video-class-$(date +%Y%m%d-%H%M%S)

# Add the hero-video-background class to the video element
sed -i 's/className="w-full h-full object-cover"/className="w-full h-full object-cover hero-video-background"/g' app/page.tsx

echo "✅ Class added to video element"

# Verify
echo ""
echo "📹 New video element:"
grep -A 2 "<video" app/page.tsx | head -5

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
    git commit -m "fix: Add hero-video-background class for mobile video styling

- Ensures mobile video CSS applies correctly
- Left-aligned on mobile devices
- Fills viewport height
- Continuous loop with autoplay"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo ""
    echo "📱 Mobile video should now:"
    echo "  ✅ Play VIDEO-2025-10-31-20-16-50.mp4 on mobile"
    echo "  ✅ Be left-aligned"
    echo "  ✅ Fill viewport height"
    echo "  ✅ Loop continuously"
    echo ""
    echo "🌐 Check your site in 2-3 minutes!"
    echo ""
    echo "📱 Test on mobile:"
    echo "  1. Open site on mobile device or"
    echo "  2. Desktop: F12 → Toggle device toolbar (Ctrl+Shift+M)"
    echo "  3. Select iPhone or Samsung"
    echo "  4. Video should play from left side!"
else
    echo "❌ Build failed!"
    cp app/page.tsx.backup-video-class-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

