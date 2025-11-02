#!/bin/bash

echo "🔧 Updating build time from '3 minutes' to '50 seconds'..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-buildtime-$(date +%Y%m%d-%H%M%S)

# Replace "3 minutes" with "50 seconds" in the comparison table
sed -i 's/"3 minutes"/"50 seconds"/g' app/page.tsx

echo "✅ Changed: '3 minutes' → '50 seconds'"

echo ""
echo "=== Verification: Checking the change ==="
grep -B 2 -A 2 "50 seconds" app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Build time now consistent:"
    echo "   ✅ Hero section: 'Build in ~50 seconds'"
    echo "   ✅ Comparison table: '50 seconds'"
    echo "   ✅ Both match now!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for more fixes"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-buildtime-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

