#!/bin/bash

echo "🔍 Checking current navigation spacing..."
echo ""

echo "=== Finding navigation section ==="
grep -n "FAQ\|About\|Get Started" app/page.tsx | grep -E "Link href|className" | head -20

echo ""
echo "=== Current gap setting ==="
grep -B 2 -A 2 "FAQ" app/page.tsx | grep "gap-" | head -5

echo ""
echo "=== Showing the navigation structure (lines 235-275) ==="
sed -n '235,275p' app/page.tsx

echo ""
echo "📋 Current setup:"
echo "  - Looking for: gap-6 (current spacing)"
echo "  - Need to increase to: gap-8 or gap-10"

