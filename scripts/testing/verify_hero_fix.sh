#!/bin/bash

echo "🔍 Verifying hero text fix is in current code..."
echo ""

echo "=== Current hero heading style ==="
grep -A 5 "Build a website before your coffee cools" app/page.tsx | grep -B 8 "Build a website"

echo ""
echo "📋 Checking for:"
echo "  - fontSize: clamp(2.5rem, 8vw, 4rem) ← Should be 4rem max"
echo "  - whiteSpace: 'nowrap' ← Should force one line"

