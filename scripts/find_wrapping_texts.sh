#!/bin/bash

echo "🔍 FINDING WRAPPING TEXT ISSUES..."
echo ""

echo "1. 'Ready to Get Started' section:"
grep -n "Ready to Get Started" app/page.tsx -A 3 -B 2

echo ""
echo "=========================================="
echo ""

echo "2. 'Go Live & Unlock Premium' section:"
grep -n "Go Live.*Unlock Premium" app/page.tsx -A 3 -B 2

