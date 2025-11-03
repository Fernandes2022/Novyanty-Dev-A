#!/bin/bash

echo "🔍 Finding the stats section..."
echo ""

# Search for the exact text
grep -n "3 Min" app/page.tsx

echo ""
echo "Found it! Let's check what we're dealing with..."
echo ""

# Show the context around "Average Build Time"
grep -A 2 -B 2 "Average Build Time" app/page.tsx

echo ""
echo "=========================================="
echo "Fixing the stats section properly..."
echo "=========================================="
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-stats-fix-$(date +%Y%m%d-%H%M%S)

# Replace "3 Min" with "50s" (more concise for stats)
sed -i 's/3 Min/50s/g' app/page.tsx

# Also try variations
sed -i 's/3 minutes/50 seconds/g' app/page.tsx
sed -i 's/3min/50s/g' app/page.tsx

echo "✅ Replaced all instances"
echo ""

# Verify the change
echo "Checking if it worked..."
grep -n "Average Build Time" app/page.tsx -A 5

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📊 Stats updated to: 50s"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    exit 1
fi

