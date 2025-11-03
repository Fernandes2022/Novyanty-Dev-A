#!/bin/bash

echo "📱 CHECKING RESPONSIVENESS ACROSS ENTIRE SITE..."
echo ""

echo "=== 1. Checking Hero Section (page.tsx) ==="
echo "Looking for responsive issues in hero..."
grep -n "clamp\|text-\|px-\|py-\|md:\|lg:\|xl:" app/page.tsx | grep -A 2 -B 2 "hero\|Hero" | head -30

echo ""
echo "=== 2. Checking Navigation (Navbar) ==="
if [ -f "components/Navbar.tsx" ]; then
    echo "Found Navbar.tsx - checking mobile menu..."
    grep -n "md:\|lg:\|hidden\|block\|flex" components/Navbar.tsx | head -20
else
    echo "Navbar not found in components/"
fi

echo ""
echo "=== 3. Checking Try It Live Section ==="
grep -n "Try It Live\|grid\|gap-" app/page.tsx | head -15

echo ""
echo "=== 4. Checking Pricing Cards ==="
grep -n "grid-cols\|md:grid-cols\|lg:grid-cols" app/page.tsx | grep -B 2 -A 2 "pricing\|plan"

echo ""
echo "=== 5. Checking Workspace Page ==="
if [ -f "app/workspace/page.tsx" ]; then
    echo "Found workspace - checking layout..."
    grep -n "grid\|flex\|md:\|lg:" app/workspace/page.tsx | head -20
fi

echo ""
echo "=== 6. Checking globals.css for responsive issues ==="
grep -n "@media\|min-width\|max-width" app/globals.css | head -20

echo ""
echo "=== 7. Common responsive issues to check ==="
echo "Searching for potential problems..."
echo ""

# Check for fixed widths that might break mobile
echo "❓ Fixed widths (might break mobile):"
grep -n "width: [0-9]" app/page.tsx app/workspace/page.tsx 2>/dev/null | grep -v "100%\|auto" | head -10

echo ""
echo "❓ Absolute positioning (might overflow):"
grep -n "absolute\|fixed" app/page.tsx | head -10

echo ""
echo "❓ Text sizes without clamp:"
grep -n "text-\[" app/page.tsx | head -10

echo ""
echo "📋 RESPONSIVE CHECKLIST:"
echo "  1. Hero text - using clamp? ✓/✗"
echo "  2. Navigation - mobile menu working? ✓/✗"
echo "  3. Try It Live buttons - stacking on mobile? ✓/✗"
echo "  4. Pricing cards - grid responsive? ✓/✗"
echo "  5. Workspace - panels stacking on mobile? ✓/✗"
echo "  6. Images/videos - object-cover and responsive? ✓/✗"
echo ""
echo "🔍 Run this to see issues, then I'll fix them!"

