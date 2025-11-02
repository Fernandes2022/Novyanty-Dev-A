#!/bin/bash

echo "🔍 Checking current section heading sizes..."
echo ""

echo "=== (1) How It Works ==="
grep -A 2 "How It" app/page.tsx | grep -E "(className|How It)" | head -3

echo ""
echo "=== (2) Why We're Different ==="
grep -A 2 "Why We're" app/page.tsx | grep -E "(className|Why We're)" | head -3

echo ""
echo "=== (3) Try It Live ==="
grep -A 2 "Try It" app/page.tsx | grep -E "(className|Try It)" | head -3

echo ""
echo "=== (4) Trusted by Creators Worldwide ==="
grep -A 2 "Trusted by Creators" app/page.tsx | grep -E "(className|Trusted)" | head-3

echo ""
echo "=== (5) Who It's For ==="
grep -A 2 "Who It's For" app/page.tsx | grep -E "(className|Who It)" | head -3

echo ""
echo "=== (6) Why Choose Creative Workspace ==="
grep -A 2 "Why Choose Creative Workspace" app/page.tsx | grep -E "(className|Why Choose)" | head -3

echo ""
echo "=== (7) Go Live & Unlock Premium ==="
grep -A 2 "Go Live" app/page.tsx | grep -E "(className|Go Live)" | head -3

echo ""
echo "📊 SUMMARY OF CURRENT SIZES:"
echo "================================"
grep -E "(How It Works|Why We're Different|Try It Live|Trusted by Creators|Who It's For|Why Choose Creative|Go Live & Unlock)" app/page.tsx | while read line; do
    if [[ $line == *"className"* ]]; then
        echo "$line" | grep -o 'text-[a-z-]*'
    fi
done | sort | uniq -c

