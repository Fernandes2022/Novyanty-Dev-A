#!/bin/bash

echo "🔍 Checking pricing section structure..."
echo ""

echo "=== Finding Go Live & Unlock Premium section ==="
LINE_NUM=$(grep -n "Go Live & Unlock Premium" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current pricing cards structure (next 150 lines) ==="
sed -n "$((LINE_NUM)),$((LINE_NUM + 150))p" app/page.tsx

echo ""
echo "📋 Looking for:"
echo "  - POPULAR badge on Pro plan"
echo "  - CTA button differences"
echo "  - Which plans have badges"

