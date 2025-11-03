#!/bin/bash

echo "🔍 Checking div structure around the error..."
echo ""

echo "=== Lines 330-345 ==="
sed -n '330,345p' app/workspace/page.tsx

echo ""
echo "=== Counting divs in mobile menu section ==="
echo "Opening divs in mobile menu:"
sed -n '299,337p' app/workspace/page.tsx | grep -c "<div"

echo "Closing divs in mobile menu:"
sed -n '299,337p' app/workspace/page.tsx | grep -c "</div>"

