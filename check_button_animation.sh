#!/bin/bash

echo "🔍 Checking Generate Preview & Chaos Mode buttons..."
echo ""

echo "=== Finding the buttons in Try It Live section ==="
LINE_NUM=$(grep -n "Generate Preview" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current button structure ==="
sed -n "$((LINE_NUM - 15)),$((LINE_NUM + 35))p" app/page.tsx

echo ""
echo "📋 Checking:"
echo "  - Current gap between buttons"
echo "  - whileHover scale values"
echo "  - Container flex settings"

