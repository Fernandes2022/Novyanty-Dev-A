#!/bin/bash

echo "🔍 CHECKING WORKSPACE PAGE MENU..."
echo ""

echo "=== Workspace navigation section ==="
grep -n "workspace\|Workspace" app/workspace/page.tsx | head -10

echo ""
echo "=== Finding navigation/header in workspace ==="
LINE_NUM=$(grep -n "flex h-20 items-center" app/workspace/page.tsx | head -1 | cut -d: -f1)
echo "Header section starts at line: $LINE_NUM"

echo ""
echo "=== Showing workspace header (lines around $LINE_NUM) ==="
sed -n "$((LINE_NUM - 5)),$((LINE_NUM + 40))p" app/workspace/page.tsx

echo ""
echo "=== Checking for Sign In / Auth buttons ==="
grep -n "Sign In\|Sign in\|Login\|Auth" app/workspace/page.tsx

echo ""
echo "=== Checking for mobile menu in workspace ==="
grep -n "md:hidden\|mobile" app/workspace/page.tsx | head -10

echo ""
echo "📋 Issues to check:"
echo "  - Is there a Sign In button?"
echo "  - Is there a mobile menu?"
echo "  - Are navigation links visible?"

