#!/bin/bash

echo "🔍 Checking CSS definitions for text classes..."
echo ""

echo "=== Searching for text-section-title definition ==="
grep -A 3 "text-section-title" app/globals.css || echo "Not found in globals.css, checking Tailwind defaults..."

echo ""
echo "=== Searching for text-body definition ==="
grep -A 3 "text-body" app/globals.css || echo "Not found in globals.css, checking Tailwind defaults..."

echo ""
echo "=== Current Tailwind text size classes in use ==="
grep -oE "text-[a-z0-9-]+" app/page.tsx | grep -E "section-title|body|xl|2xl|3xl|4xl|5xl|6xl|7xl" | sort | uniq -c

echo ""
echo "📋 FOUND CLASSES:"
echo "- text-section-title (used for main headings)"
echo "- text-body (used for subtitle text)"
echo "- text-xl md:text-2xl (used for 'How It Works' in demo video)"
echo ""
echo "✅ Ready to double these sizes!"

