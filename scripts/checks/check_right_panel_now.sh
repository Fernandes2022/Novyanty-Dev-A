#!/bin/bash

echo "🔍 Checking right panel in workspace..."
echo ""

FILE_PATH="app/workspace/page.tsx"

echo "=== Finding the right panel section (lines 625-680) ==="
sed -n '625,680p' "$FILE_PATH"

echo ""
echo "=== Checking for Preview Variants and previewContent ==="
grep -n "Preview Variants\|previewContent\|samplePreviews" "$FILE_PATH" | head -20

echo ""
echo "📋 Looking for:"
echo "  - What shows when previewContent is empty"
echo "  - samplePreviews condition"
echo "  - The placeholder we need to add"

