#!/bin/bash

echo "🔍 Finding navigation code..."
echo ""

echo "=== Searching for navigation files ==="
find . -name "*.tsx" -o -name "*.ts" | grep -i nav

echo ""
echo "=== Searching for 'Adaptive Engine' in all files ==="
grep -r "Adaptive Engine" --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js" . 2>/dev/null | head -20

echo ""
echo "=== Checking layout.tsx ==="
grep -n "Adaptive\|FAQ\|About\|Get Started" app/layout.tsx 2>/dev/null | head -20

echo ""
echo "=== Checking page.tsx ==="
grep -n "Adaptive\|FAQ\|About\|Get Started" app/page.tsx 2>/dev/null | head -20

