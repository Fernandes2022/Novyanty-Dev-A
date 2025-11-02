#!/bin/bash

echo "🔧 Reverting hero stats back to ⚡ Zap icon..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-revert-zap-$(date +%Y%m%d-%H%M%S)

# Change the hero stats back to Zap (line 373)
sed -i '373s/icon: Eye,/icon: Zap,/' app/page.tsx

echo "✅ Hero stats: Changed back to ⚡ Zap"
echo "✅ How It Works: Keeping 👀 Eye"

echo ""
echo "=== Verification ==="
echo "Line 373 (Hero stats - should be Zap):"
sed -n '373p' app/page.tsx

echo ""
echo "Line 440 (How It Works - should be Eye):"
sed -n '440p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Final icon configuration:"
    echo "   ✅ Hero stats 'Build Time': ⚡ Zap icon"
    echo "   ✅ 'Watch It Build' card: 👀 Eye icon"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for more fixes"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-revert-zap-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

