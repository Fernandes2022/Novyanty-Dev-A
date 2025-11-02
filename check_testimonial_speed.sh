#!/bin/bash

echo "🔍 Checking testimonial carousel speed..."
echo ""

echo "=== Finding testimonial section ==="
grep -n "testimonial\|Testimonial" app/page.tsx | head -10

echo ""
echo "=== Looking for ScrollingTestimonials component ==="
LINE_NUM=$(grep -n "ScrollingTestimonials\|testimonials={" app/page.tsx | head -1 | cut -d: -f1)
echo "Found around line: $LINE_NUM"

echo ""
echo "=== Current testimonial rendering ==="
sed -n "$((LINE_NUM - 5)),$((LINE_NUM + 15))p" app/page.tsx

echo ""
echo "=== Checking for animation duration in testimonials ==="
grep -A 30 "function ScrollingTestimonials" app/page.tsx | grep -E "duration|transition|animate"

echo ""
echo "=== Searching in components folder ==="
if [ -d "components" ]; then
    find components -name "*testimonial*" -o -name "*Testimonial*" 2>/dev/null
    echo ""
    echo "=== If testimonial component exists ==="
    grep -r "duration\|transition" components/*testimonial* 2>/dev/null | head -10
fi

echo ""
echo "📋 Looking for:"
echo "  - Animation duration value"
echo "  - Transition speed"
echo "  - Loop/repeat settings"

