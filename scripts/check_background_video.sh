#!/bin/bash

echo "🎥 CHECKING BACKGROUND VIDEO..."
echo ""

echo "1. Finding all video elements:"
echo "=========================================="
grep -rn "<video" app/ --include="*.tsx" -B 2 -A 5 | head -50

echo ""
echo "=========================================="
echo "2. Checking video file paths:"
echo "=========================================="
echo ""

# List all video files
echo "Videos in public/videos/:"
ls -lh public/videos/ 2>/dev/null || echo "❌ No videos folder found!"

echo ""
echo "=========================================="
echo "3. Checking 'How much FPS' video specifically:"
echo "=========================================="
echo ""

# Find references to FPS video
grep -rn "FPS\|fps" app/ --include="*.tsx" -B 2 -A 2

echo ""
echo "=========================================="
echo "4. Current video setup on homepage:"
echo "=========================================="
echo ""

# Show the exact video section
sed -n '170,185p' app/page.tsx

echo ""
echo "=========================================="
echo "DIAGNOSIS:"
echo "=========================================="
echo ""

# Check if video file exists
if [ -f "public/videos/How much FPS.mp4" ]; then
    echo "✅ Video file exists: How much FPS.mp4"
    ls -lh "public/videos/How much FPS.mp4"
elif [ -f "public/videos/how-much-fps.mp4" ]; then
    echo "⚠️  Found similar: how-much-fps.mp4"
else
    echo "❌ Video file NOT FOUND!"
    echo ""
    echo "Available videos:"
    ls public/videos/ 2>/dev/null
fi

