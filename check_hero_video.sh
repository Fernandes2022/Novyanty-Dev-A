#!/bin/bash

echo "🔍 Checking hero video source..."
echo ""

echo "=== Current video source in page.tsx ==="
grep -n "videos/" app/page.tsx | grep -E "source|video" | head -10

echo ""
echo "=== Full video tag structure ==="
LINE_NUM=$(grep -n "<video" app/page.tsx | head -1 | cut -d: -f1)
sed -n "$((LINE_NUM)),$((LINE_NUM + 15))p" app/page.tsx

echo ""
echo "=== Checking if How much FPS.mp4 exists ==="
ls -lh public/videos/ | grep -i "fps\|FPS"

echo ""
echo "📋 Checking:"
echo "  - What video is currently being used"
echo "  - If 'How much FPS.mp4' was applied"
echo "  - If it got reverted somehow"

