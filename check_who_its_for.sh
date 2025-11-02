#!/bin/bash

echo "🔍 Checking 'Who It's For' section..."
echo ""

echo "=== Finding the section ==="
LINE_NUM=$(grep -n "Who It's For" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current items (showing next 80 lines) ==="
sed -n "$((LINE_NUM)),$((LINE_NUM + 80))p" app/page.tsx

echo ""
echo "📋 Current count: Looking for items with icon, title, description..."

