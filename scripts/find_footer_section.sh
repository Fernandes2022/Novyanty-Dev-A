#!/bin/bash

echo "🔍 SEARCHING FOR FOOTER SECTION..."
echo ""
echo "Looking for 'Secure • Fast • Loved' section..."
echo ""

# Search for the text
echo "=========================================="
echo "SEARCH RESULTS:"
echo "=========================================="
echo ""

grep -rn "Secure.*Fast.*Loved" app/ --include="*.tsx" --include="*.jsx" -A 5 -B 5

echo ""
echo "----------------------------------------"
echo ""

grep -rn "Built with.*by creators" app/ --include="*.tsx" --include="*.jsx" -A 3 -B 3

echo ""
echo "=========================================="
echo ""

# Also search for just "Loved" in case it's split
grep -rn "Loved" app/ --include="*.tsx" --include="*.jsx" -B 2 -A 2

