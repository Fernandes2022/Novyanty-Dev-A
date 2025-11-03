#!/bin/bash

echo "🔍 Checking why hero text is still on 2 lines..."
echo ""

echo "=== Finding the hero heading ==="
grep -n "Build a website before your coffee cools" app/page.tsx | head -1

echo ""
echo "=== Current fontSize setting ==="
LINE_NUM=$(grep -n "Build a website before your coffee cools" app/page.tsx | head -1 | cut -d: -f1)
sed -n "$((LINE_NUM - 15)),$((LINE_NUM + 5))p" app/page.tsx | grep -E "fontSize|clamp|style"

echo ""
echo "=== Showing full style block ==="
sed -n "$((LINE_NUM - 15)),$((LINE_NUM + 5))p" app/page.tsx

echo ""
echo "📋 Checking:"
echo "  - Current fontSize clamp values"
echo "  - Why it's still wrapping to 2 lines"
echo "  - What we need to change"

