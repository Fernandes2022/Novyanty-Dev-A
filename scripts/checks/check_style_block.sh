#!/bin/bash

echo "🔍 Checking the actual style block..."
echo ""

LINE_NUM=$(grep -n "Build a website before your coffee cools" app/page.tsx | cut -d: -f1)
echo "Found text at line: $LINE_NUM"

echo ""
echo "=== Showing 20 lines BEFORE the text ==="
sed -n "$((LINE_NUM - 20)),$((LINE_NUM))p" app/page.tsx

