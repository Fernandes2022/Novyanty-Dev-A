#!/bin/bash

echo "🔍 Diagnosing why About is entering Get Started..."
echo ""

echo "=== Current navigation structure (lines 220-265) ==="
sed -n '220,265p' app/page.tsx

echo ""
echo "=== Checking Get Started button size ==="
grep -A 10 "Get Started - Far Right" app/page.tsx | head -15

echo ""
echo "=== Looking for flex settings ==="
grep -n "flex-1\|flex-none\|justify-end" app/page.tsx | grep -E "22[0-9]:|23[0-9]:|24[0-9]:|25[0-9]:"

echo ""
echo "📋 Checking:"
echo "  - flex-1 on center nav (takes available space)"
echo "  - flex-none on Get Started (fixed size)"
echo "  - gap between items"
echo "  - Button width/padding"

