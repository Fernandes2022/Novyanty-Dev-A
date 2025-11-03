#!/bin/bash

echo "🔧 Fixing VideoBackground component to use new video..."

# Backup
cp components/home/VideoBackground.tsx components/home/VideoBackground.tsx.backup-$(date +%Y%m%d-%H%M%S)

# Replace the old video with new one
sed -i 's|/videos/x-large-vecteezy_young-girl-which-applying-virtual-reality-headset-during_13279729_x-large.mp4|/videos/How much FPS.mp4|g' components/home/VideoBackground.tsx

echo "✅ Replaced old video (18MB) with new video (2.3MB)"

# Verify the change
echo ""
echo "=== Verification: New video source ==="
grep "source src=" components/home/VideoBackground.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Change:"
    echo "  ❌ OLD: x-large-vecteezy...mp4 (18MB)"
    echo "  ✅ NEW: How much FPS.mp4 (2.3MB)"
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Run this to deploy:"
    echo "  git add ."
    echo "  git commit -m 'fix: Update VideoBackground to use new video'"
    echo "  git push origin main"
else
    echo "❌ Build failed"
    cp components/home/VideoBackground.tsx.backup-$(date +%Y%m%d-%H%M%S) components/home/VideoBackground.tsx
    exit 1
fi

