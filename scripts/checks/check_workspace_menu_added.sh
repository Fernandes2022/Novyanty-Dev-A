#!/bin/bash

echo "🔍 Checking if workspace mobile menu was added..."
echo ""

echo "=== Checking for mobile menu in workspace ==="
grep -n "mobileMenuOpen\|Mobile Menu" app/workspace/page.tsx

echo ""
echo "=== Showing lines 290-310 ==="
sed -n '290,310p' app/workspace/page.tsx

echo ""
if grep -q "mobileMenuOpen" app/workspace/page.tsx; then
    echo "✅ Mobile menu state exists"
    if grep -q "Mobile Menu Dropdown" app/workspace/page.tsx; then
        echo "✅ Mobile menu dropdown exists"
        echo ""
        echo "Mobile menu is already added!"
    else
        echo "⚠️  State exists but dropdown missing - need to add it"
    fi
else
    echo "⚠️  Mobile menu not added yet"
fi

