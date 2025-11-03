#!/bin/bash

echo "🔍 Searching for text-section-title and text-body definitions..."
echo ""

echo "=== Checking tailwind.config.ts ==="
if [ -f "tailwind.config.ts" ]; then
    grep -A 5 -B 5 "section-title\|text-body" tailwind.config.ts || echo "Not in tailwind.config.ts"
else
    echo "tailwind.config.ts not found"
fi

echo ""
echo "=== Checking globals.css for @apply or custom classes ==="
grep -B 2 -A 5 "\.text-section-title\|\.text-body" app/globals.css || echo "Not defined as CSS classes"

echo ""
echo "=== Let me check all files for these definitions ==="
find . -name "*.css" -o -name "*.ts" -o -name "*.js" | xargs grep -l "section-title\|text-body" 2>/dev/null | head -5

echo ""
echo "📋 ANALYSIS:"
echo "Based on the usage, these appear to be Tailwind utility classes."
echo ""
echo "Current sizes (estimated):"
echo "  - text-section-title: likely text-3xl or text-4xl"
echo "  - text-body: likely text-base or text-lg"
echo "  - text-xl md:text-2xl: 1.25rem / 1.5rem"
echo ""
echo "To DOUBLE them, we need to:"
echo "  1. text-section-title → text-5xl or text-6xl"
echo "  2. text-body → text-xl or text-2xl"
echo "  3. text-xl md:text-2xl → text-2xl md:text-4xl"

