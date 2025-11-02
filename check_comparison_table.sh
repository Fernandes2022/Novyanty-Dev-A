#!/bin/bash

echo "🔍 Checking comparison table structure..."
echo ""

echo "=== Finding Why Choose Creative Workspace section ==="
LINE_NUM=$(grep -n "Why Choose Creative Workspace" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current table structure (next 100 lines) ==="
sed -n "$((LINE_NUM)),$((LINE_NUM + 100))p" app/page.tsx

echo ""
echo "📋 Current setup:"
echo "  - grid grid-cols-3 (3 columns)"
echo "  - min-w-[600px] (minimum width 600px - causes horizontal scroll)"
echo "  - Text sizes that might be too large for mobile"

