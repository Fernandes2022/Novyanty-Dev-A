#!/bin/bash

echo "🔍 Locating 'How It Works' section..."
echo ""

echo "=== Finding the section ==="
grep -n "How It Works" app/page.tsx | head -5

echo ""
echo "=== Getting line numbers ==="
LINE_START=$(grep -n "Three steps to your dream website" app/page.tsx | cut -d: -f1)
echo "Section starts around line: $LINE_START"

echo ""
echo "=== Current structure (showing ~80 lines from How It Works) ==="
sed -n "${LINE_START},$((LINE_START + 80))p" app/page.tsx | head -80

echo ""
echo "📋 ANALYSIS:"
echo "Looking for:"
echo "  1. Icon divs (w-12 h-12 rounded-xl bg-gradient...)"
echo "  2. Title text (Say It, Watch It Build, Launch It)"
echo "  3. Where to move icons to be inline"

