#!/bin/bash

echo "=== FULL STRUCTURE ANALYSIS ==="
echo ""

echo "1. TAG COUNTS:"
echo "   <main>: $(grep -o '<main' app/page.tsx | wc -l)"
echo "   </main>: $(grep -o '</main>' app/page.tsx | wc -l)"
echo "   <div>: $(grep -o '<div' app/page.tsx | wc -l)"
echo "   </div>: $(grep -o '</div>' app/page.tsx | wc -l)"
echo "   <section>: $(grep -o '<section' app/page.tsx | wc -l)"
echo "   </section>: $(grep -o '</section>' app/page.tsx | wc -l)"
echo ""

echo "2. RETURN STATEMENT STRUCTURE (lines 75-85):"
sed -n '75,85p' app/page.tsx
echo ""

echo "3. AFTER MAIN OPENS (lines 200-210):"
sed -n '200,210p' app/page.tsx
echo ""

echo "4. BEFORE LAST SECTION (lines 515-530):"
sed -n '515,530p' app/page.tsx
echo ""

echo "5. FILE ENDING (last 15 lines):"
tail -n 15 app/page.tsx
echo ""

echo "6. SEARCHING FOR WRAPPER DIV AFTER MAIN:"
sed -n '78,210p' app/page.tsx | grep -n "^[[:space:]]*<div"
