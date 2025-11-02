#!/bin/bash

echo "🔧 Changing ⚡ Zap icon to 👀 Eye icon in 'Watch It Build'..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-watch-emoji-$(date +%Y%m%d-%H%M%S)

# Need to import Eye icon from lucide-react first
echo "=== Checking if Eye is imported ==="
grep "import.*Eye.*from.*lucide-react" app/page.tsx

if [ $? -ne 0 ]; then
    echo "Adding Eye to imports..."
    # Find the lucide-react import line and add Eye
    sed -i "s/import { Mic, Zap, Rocket/import { Mic, Zap, Rocket, Eye/g" app/page.tsx
    echo "✅ Added Eye to imports"
fi

# Change Zap to Eye in the Watch It Build section
sed -i 's/icon: Zap, color: "from-blue-500 to-cyan-500"/icon: Eye, color: "from-blue-500 to-cyan-500"/g' app/page.tsx

echo "✅ Changed: icon: Zap → icon: Eye"

echo ""
echo "=== Verification ==="
grep -A 1 "Watch It Build" app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "   ✅ 'Watch It Build' now uses 👀 Eye icon"
    echo "   ✅ Replaced ⚡ Zap icon"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for more fixes"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-watch-emoji-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

