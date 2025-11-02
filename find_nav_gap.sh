#!/bin/bash

echo "🔍 Finding the exact gap setting for navigation..."
echo ""

echo "=== Searching for the navigation container with gap ==="
grep -n "hidden md:flex flex-1 items-center justify-end gap" app/page.tsx

echo ""
echo "=== Showing lines 225-245 ==="
sed -n '225,245p' app/page.tsx

echo ""
echo "📋 Looking for the div that contains FAQ and About with gap-X"

