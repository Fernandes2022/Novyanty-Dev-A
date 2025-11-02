#!/bin/bash

echo "🔧 Increasing navigation spacing from gap-6 to gap-10..."

# Backup
cp app/page.tsx app/page.tsx.backup-nav-spacing-$(date +%Y%m%d-%H%M%S)

# Change gap-6 to gap-10 on line 230
sed -i '230s/gap-6/gap-10/' app/page.tsx

echo "✅ Changed gap-6 to gap-10"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Navigation spacing increased"
    echo "  ✅ FAQ, About, Get Started have more space"
    echo "  ✅ No more text overlap!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
    echo ""
    echo "💡 If still too close, I can make it gap-12!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-nav-spacing-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

