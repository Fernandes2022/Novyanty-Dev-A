#!/bin/bash

echo "🔍 Checking hero heading 'Build a website before your coffee cools'..."
echo ""

echo "=== Finding the heading ==="
LINE_NUM=$(grep -n "Build a website before your coffee cools" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current heading structure ==="
sed -n "$((LINE_NUM - 10)),$((LINE_NUM + 10))p" app/page.tsx

echo ""
echo "=== Checking the styles ==="
grep -B 5 -A 5 "Build a website before your coffee cools" app/page.tsx | grep -E "className|style|fontSize"

echo ""
echo "�� Current setup:"
echo "  - Looking for: className with text size"
echo "  - Looking for: style with fontSize"
echo "  - Looking for: max-width or line wrapping settings"

