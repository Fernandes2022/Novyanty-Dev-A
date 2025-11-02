#!/bin/bash

echo "🔍 Checking workspace page - RIGHT SIDE..."
echo ""

echo "=== Finding workspace page ==="
FILE_PATH="app/workspace/page.tsx"

if [ ! -f "$FILE_PATH" ]; then
    echo "Looking for workspace file..."
    FILE_PATH=$(find app -name "*workspace*.tsx" | head -1)
    echo "Found: $FILE_PATH"
fi

echo ""
echo "=== Looking at the main layout structure ==="
grep -n "grid\|flex\|col-span\|lg:col" "$FILE_PATH" | head -20

echo ""
echo "=== Checking for two-column or sidebar layout ==="
grep -A 10 "grid-cols-2\|flex.*gap\|sidebar\|aside" "$FILE_PATH" | head -40

echo ""
echo "=== Showing main content section (lines 50-150) ==="
sed -n '50,150p' "$FILE_PATH"

echo ""
echo "📋 Looking for:"
echo "  - Right sidebar or right column"
echo "  - Empty space on the right"
echo "  - Where to add Preview Variants box"

