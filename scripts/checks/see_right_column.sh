#!/bin/bash

echo "🔍 Showing the RIGHT column (around line 631)..."
echo ""

FILE_PATH="app/workspace/page.tsx"

echo "=== Right column content (lines 620-750) ==="
sed -n '620,750p' "$FILE_PATH"

echo ""
echo "📋 This should show:"
echo "  - rightPanelRef location"
echo "  - What's rendered when previewContent exists"
echo "  - Where to add placeholder when !previewContent"

