#!/bin/bash

echo "🔍 DEBUGGING VIDEO ISSUE - Full Investigation"
echo ""

echo "=== 1. Current working directory ==="
pwd

echo ""
echo "=== 2. Checking if video file exists ==="
ls -lh "public/videos/How much FPS.mp4" 2>/dev/null || echo "❌ VIDEO FILE NOT FOUND!"

echo ""
echo "=== 3. All videos in public/videos ==="
ls -lh public/videos/ 2>/dev/null || echo "❌ public/videos directory not found!"

echo ""
echo "=== 4. What does page.tsx say? (Hero video section) ==="
grep -A 3 -B 3 "<video" app/page.tsx | head -20

echo ""
echo "=== 5. Searching for ALL video references in page.tsx ==="
grep -n "\.mp4\|video" app/page.tsx | head -20

echo ""
echo "=== 6. Is there a VideoBackground component? ==="
find . -name "VideoBackground*" -type f 2>/dev/null

echo ""
echo "=== 7. If VideoBackground exists, what's in it? ==="
if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "Found VideoBackground.tsx:"
    cat components/home/VideoBackground.tsx | head -40
else
    echo "VideoBackground.tsx not found"
fi

echo ""
echo "=== 8. Checking build output ==="
ls -lh .next/static/ 2>/dev/null | head -10

echo ""
echo "📋 DIAGNOSIS:"
echo "This will show us:"
echo "  - If we're in the right folder"
echo "  - If the video file exists"
echo "  - Where the video is being loaded from"
echo "  - If there's a separate component handling video"

