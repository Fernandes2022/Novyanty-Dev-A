#!/bin/bash

echo "🔍 Checking Try It Live button section..."
echo ""

echo "=== Finding the buttons ==="
LINE_NUM=$(grep -n "Generate Preview" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current button structure ==="
sed -n "$((LINE_NUM - 20)),$((LINE_NUM + 30))p" app/page.tsx

echo ""
echo "📋 Looking for:"
echo "  - whileHover scale values"
echo "  - gap between buttons (gap-3, gap-4, etc.)"
echo "  - Button container flex settings"

