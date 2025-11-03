#!/bin/bash

echo "=== TESTIMONIAL ANALYSIS ==="
echo ""

echo "1. COMPONENT IMPORTS:"
grep -n "Testimonial" app/page.tsx
echo ""

echo "2. COMPONENT USAGE (where it's rendered):"
grep -n "<VideoTestimonials" app/page.tsx
grep -n "<Testimonial" app/page.tsx
echo ""

echo "3. TESTIMONIAL SECTIONS (search for 'testimonial' text):"
grep -in "testimonial" app/page.tsx
echo ""

echo "4. ALL SECTION TITLES (to identify duplicate sections):"
grep -n "text-section-title\|<h2" app/page.tsx | head -20
echo ""

echo "5. CHECKING FOR DUPLICATE CONTENT BLOCKS:"
echo "   Searching for 'Ready to Get Started' sections..."
grep -n "Ready to Get Started" app/page.tsx
echo ""

echo "6. FULL SECTION STRUCTURE:"
grep -n "<section" app/page.tsx
