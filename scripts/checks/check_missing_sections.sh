#!/bin/bash

echo "=== CHECKING FOR MISSING SECTIONS ==="
echo ""

echo "1. Searching for 'Still scrolling' text:"
grep -n "Still scrolling" app/page.tsx || echo "❌ NOT FOUND"
echo ""

echo "2. Searching for footer:"
grep -n "footer\|Footer\|Creative Workspace" app/page.tsx | tail -10
echo ""

echo "3. Checking last 50 lines of page.tsx:"
tail -n 50 app/page.tsx
echo ""

echo "4. Checking image paths exist:"
ls -la public/images/testimonials/ 2>/dev/null || echo "❌ Testimonials folder not found"
echo ""

echo "5. Checking VideoTestimonials component location:"
grep -n "<VideoTestimonials" app/page.tsx
echo ""

echo "6. Total line count:"
wc -l app/page.tsx
