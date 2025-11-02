#!/bin/bash

echo "🔍 Finding the right column in workspace..."
echo ""

FILE_PATH="app/workspace/page.tsx"

echo "=== Looking for rightPanelRef section ==="
grep -n "rightPanelRef" "$FILE_PATH"

echo ""
echo "=== Showing the grid columns section (lines 365-550) ==="
sed -n '365,550p' "$FILE_PATH"

echo ""
echo "📋 Need to find:"
echo "  - Where the right column renders"
echo "  - Where to add the Preview Variants placeholder"
echo "  - The condition: show placeholder when !previewContent"

