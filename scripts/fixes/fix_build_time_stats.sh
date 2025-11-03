#!/bin/bash

echo "⏱️  Fixing Average Build Time in stats section..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-stats-$(date +%Y%m%d-%H%M%S)

echo "Changing '3 minutes' → '50 seconds' in stats..."

# Fix the stats section
sed -i "s/3 minutes/50 seconds/g" app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📊 Stats section updated:"
    echo "   ✅ Average Build Time: 50 seconds"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready when you are!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-stats-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

