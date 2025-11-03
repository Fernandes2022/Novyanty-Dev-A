#!/bin/bash

echo "🔧 Fixing build time inconsistency (3 minutes → 50 seconds)..."
echo ""

echo "=== Finding all build time mentions ==="
grep -n "3 minutes\|3 mins\|50 second\|Build time" app/page.tsx

echo ""
echo "=== Showing context around these mentions ==="
grep -B 3 -A 3 "3 minutes\|3 mins\|50 second" app/page.tsx

