#!/bin/bash

echo "🔧 Fixing Eye icon import completely..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-eye-complete-$(date +%Y%m%d-%H%M%S)

# Add Eye to the import line
sed -i 's/import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play, Mic, Keyboard, Palette, Lock, Clock, Heart, Star, Shuffle } from "lucide-react";/import { Sparkles, Zap, Rocket, Shield, Users, ArrowRight, Play, Mic, Keyboard, Palette, Lock, Clock, Heart, Star, Shuffle, Eye } from "lucide-react";/g' app/page.tsx

echo "✅ Added Eye to imports"

echo ""
echo "=== Verification: Import line ==="
grep "from \"lucide-react\"" app/page.tsx | head -1

echo ""
echo "=== All Eye icon usages ==="
grep -n "icon: Eye" app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "   ✅ Eye icon imported from lucide-react"
    echo "   ✅ Hero stats: 👀 icon for 'Build Time'"
    echo "   ✅ Watch It Build card: 👀 icon"
    echo "   ✅ Both places now use Eye instead of Zap"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for more fixes"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-eye-complete-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

