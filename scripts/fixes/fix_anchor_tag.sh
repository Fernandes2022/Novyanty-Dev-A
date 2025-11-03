#!/bin/bash

echo "🔧 Fixing missing <a tag..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-anchor-fix-$(date +%Y%m%d-%H%M%S)

# Fix line 282: add <a before href
sed -i '282s/^                  $/                  <a/' app/page.tsx

echo "✅ Added missing <a tag"

echo ""
echo "=== Verification: Lines 280-290 ==="
sed -n '280,290p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Mobile menu is now complete:"
    echo "   ✅ Hamburger button (☰)"
    echo "   ✅ About link"
    echo "   ✅ Pricing link (fixed!)"
    echo "   ✅ FAQ link"
    echo "   ✅ Get Started button"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval"
else
    echo "❌ Build still failed - checking line 282"
    sed -n '282p' app/page.tsx
    exit 1
fi

