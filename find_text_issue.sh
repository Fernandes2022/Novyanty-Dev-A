#!/bin/bash

echo "🔍 Finding the text issue..."
echo ""

echo "Searching for 'go live and unlock premium'..."
grep -n "go live and unlock premium" app/page.tsx -i -A 3 -B 3

echo ""
echo "Searching for 'Ready to get started'..."
grep -n "Ready to get started" app/page.tsx -i -A 3 -B 3

echo ""
echo "Searching for 'join thousand creators transforming'..."
grep -n "join thousand" app/page.tsx -i -A 3 -B 3

echo ""
echo "Searching for 'reality' in context..."
grep -n "reality" app/page.tsx -i -A 2 -B 2

echo ""
echo "=========================================="
echo "Let me show you the pricing/CTA section:"
echo "=========================================="
echo ""

# Show the pricing section
awk '/Pricing|Get Started|join.*creators/,/section>/' app/page.tsx | head -50

