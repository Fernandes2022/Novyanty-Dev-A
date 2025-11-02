#!/bin/bash

echo "🔍 CHECKING MOBILE MENU..."
echo ""

echo "=== Finding mobile menu section ==="
grep -n "md:hidden" app/page.tsx | head -5

echo ""
echo "=== Showing mobile menu structure ==="
LINE_NUM=$(grep -n "md:hidden flex items-center" app/page.tsx | head -1 | cut -d: -f1)
echo "Mobile menu starts at line: $LINE_NUM"

sed -n "$((LINE_NUM)),$((LINE_NUM + 30))p" app/page.tsx

echo ""
echo "=== Checking for hamburger button ==="
grep -n "menu\|Menu\|hamburger\|bars" app/page.tsx | head -10

echo ""
echo "=== Checking for mobile menu state ==="
grep -n "mobileMenuOpen\|menuOpen\|showMenu" app/page.tsx | head -5

echo ""
echo "📋 Analysis:"
echo "  - Does mobile menu have hamburger button?"
echo "  - Is there menu state management?"
echo "  - Are navigation links visible on mobile?"

