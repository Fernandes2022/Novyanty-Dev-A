#!/bin/bash

echo "🔧 Changing ⚡ to 👀 in 'Watch to build' section..."
echo ""

echo "=== Finding the Watch to build section ==="
grep -n "Watch\|⚡" app/page.tsx | head -20

echo ""
echo "=== Showing context ==="
grep -B 5 -A 5 "Watch.*build\|Watch.*Build" app/page.tsx | head -30

