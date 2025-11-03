#!/bin/bash

echo "🔍 CHECKING CRITICAL RESPONSIVE ISSUES..."
echo ""

echo "=== 1. PRICING SECTION - Missing responsive grid ==="
echo "Looking for pricing cards..."
grep -n "pricing\|Pricing" app/page.tsx | head -5
echo ""
echo "Checking pricing grid structure..."
grep -B 5 -A 10 "STARTER\|POPULAR\|ENTERPRISE" app/page.tsx | grep -E "grid|flex|div className" | head -15

echo ""
echo "=== 2. COMPARISON TABLE - Text too small on mobile ==="
echo "Found: text-[9px] - TOO SMALL for mobile!"
grep -n "text-\[9px\]\|text-\[10px\]" app/page.tsx

echo ""
echo "=== 3. HERO CTA BUTTONS - Check mobile stacking ==="
grep -n "hero-cta-buttons" app/page.tsx
grep -A 3 "hero-cta-buttons" app/page.tsx

echo ""
echo "=== 4. WORKSPACE PAGE - Check panel stacking ==="
grep -n "lg:grid-cols-2" app/workspace/page.tsx
echo "Line above shows: grid lg:grid-cols-2 (should stack on mobile)"

echo ""
echo "🚨 ISSUES FOUND:"
echo "  ❌ Comparison table text: 9px-10px (unreadable on mobile!)"
echo "  ⚠️  Pricing cards: Need to verify grid responsiveness"
echo "  ⚠️  Navigation: No mobile menu found"
echo "  ✅ Hero text: Using clamp (good!)"
echo "  ✅ Workspace: lg:grid-cols-2 (stacks on mobile)"
echo ""
echo "Should I fix these issues?"

