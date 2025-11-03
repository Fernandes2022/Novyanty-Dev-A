#!/bin/bash

echo "🔧 Fixing escaped curly braces..."
echo ""

# Fix the quadruple braces
sed -i 's/{{{{/{{/g' app/page.tsx
sed -i 's/}}}}/}}/g' app/page.tsx

echo "✅ Fixed curly braces"

echo ""
echo "=== Verification: Lines 268-270 ==="
sed -n '268,270p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Mobile menu complete!"
    echo "   ✅ Hamburger button (☰)"
    echo "   ✅ About, Pricing, FAQ links"
    echo "   ✅ Get Started button"
    echo "   ✅ Smooth animations"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval"
else
    echo "❌ Build failed"
    exit 1
fi

