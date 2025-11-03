#!/bin/bash

echo "🔍 FINDING CONNECT SECTION..."
echo ""

# Search for "Connect" heading
grep -rn "Connect" app/ --include="*.tsx" --include="*.jsx" -B 5 -A 15

echo ""
echo "=========================================="
echo ""

# Also search for Twitter, TikTok, Instagram
grep -rn "Twitter\|TikTok\|Instagram" app/ --include="*.tsx" --include="*.jsx" -B 3 -A 3

