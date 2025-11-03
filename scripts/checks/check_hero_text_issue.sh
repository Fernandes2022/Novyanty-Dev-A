#!/bin/bash

echo "🔍 CHECKING HERO TEXT RENDERING ISSUE..."
echo ""

echo "=== Finding hero text section ==="
grep -n "Build a website before your" app/page.tsx | head -1

echo ""
echo "=== Showing hero text styling and structure ==="
LINE_NUM=$(grep -n "Build a website before your" app/page.tsx | head -1 | cut -d: -f1)
sed -n "$((LINE_NUM - 20)),$((LINE_NUM + 5))p" app/page.tsx

echo ""
echo "=== Checking for CSS effects that might cause glitching ==="
echo ""
echo "1. Text shadow effects:"
grep -n "textShadow\|text-shadow" app/page.tsx | head -5

echo ""
echo "2. Animations on text:"
grep -B 5 "Build a website" app/page.tsx | grep -E "animate|motion|transition"

echo ""
echo "3. Checking globals.css for text effects:"
grep -n "text-hero\|hero.*text\|glitch\|distort" app/globals.css | head -10

echo ""
echo "📋 Possible causes:"
echo "  - Text shadow too strong/multiple layers"
echo "  - Animation interference" 
echo "  - Font rendering issue"
echo "  - White-space: nowrap causing overflow"
echo "  - Video background bleeding through"

