#!/bin/bash

echo "🔧 Removing extra </div> on line 309..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-extra-div-$(date +%Y%m%d-%H%M%S)

# Delete line 309 (extra </div>)
sed -i '309d' app/page.tsx

echo "✅ Removed extra </div>"

echo ""
echo "=== Verification: Lines 305-315 ==="
sed -n '305,315p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   BUILD SUCCESSFUL!"
    echo "🎉 ================================"
    echo ""
    echo "📱 Mobile menu is complete!"
    echo ""
    echo "📋 All staged fixes ready:"
    echo "   1. ✅ Build time consistency (50 seconds)"
    echo "   2. ✅ Eye icon in 'Watch It Build'"
    echo "   3. ✅ Mobile menu with hamburger"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready when you are!"
else
    echo "❌ Build failed"
    exit 1
fi

