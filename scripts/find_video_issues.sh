#!/bin/bash

echo "🔍 FINDING VIDEO ELEMENTS..."
echo ""

# Search for video tags
echo "=========================================="
echo "VIDEO ELEMENTS:"
echo "=========================================="
grep -rn "<video" app/ --include="*.tsx" --include="*.jsx" -A 10 -B 2

echo ""
echo "=========================================="
echo "CHECKING FOR MUTED/AUTOPLAY:"
echo "=========================================="
grep -rn "muted\|autoPlay\|autoplay" app/ --include="*.tsx" --include="*.jsx" -B 2 -A 2

echo ""
echo "=========================================="
echo "VIDEO BACKGROUND COMPONENTS:"
echo "=========================================="
find components/ -name "*Video*" -o -name "*video*" 2>/dev/null | while read file; do
    echo ""
    echo "File: $file"
    head -50 "$file"
done

echo ""
echo "=========================================="
echo "SUMMARY:"
echo "=========================================="
echo ""
echo "Found video elements. Checking settings..."

