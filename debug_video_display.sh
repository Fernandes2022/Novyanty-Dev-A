#!/bin/bash

echo "🔍 DEBUGGING VIDEO DISPLAY ISSUE..."
echo ""

echo "1. Checking if video is in a modal/hidden by default:"
echo "=========================================="
grep -n "showVideo" app/page.tsx -B 5 -A 5 | head -40

echo ""
echo "=========================================="
echo "2. Checking video element and its container:"
echo "=========================================="
sed -n '170,190p' app/page.tsx

echo ""
echo "=========================================="
echo "3. Checking if useEffect was actually added:"
echo "=========================================="
grep -n "videoFpsRef.current?.play" app/page.tsx -B 3 -A 3

echo ""
echo "=========================================="
echo "DIAGNOSIS:"
echo "=========================================="
echo ""

# Check if showVideo controls visibility
if grep -q "showVideo &&" app/page.tsx || grep -q "if.*showVideo" app/page.tsx; then
    echo "⚠️  VIDEO IS HIDDEN BY DEFAULT!"
    echo "The video is controlled by 'showVideo' state"
    echo ""
    echo "Current showVideo state:"
    grep -n "showVideo.*useState" app/page.tsx
    echo ""
    echo "Video only shows when showVideo is true!"
fi

