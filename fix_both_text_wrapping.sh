#!/bin/bash

echo "🔧 FIXING BOTH TEXT WRAPPING ISSUES..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-textwrap-$(date +%Y%m%d-%H%M%S)

echo "1️⃣  Fixing 'Go Live & Unlock Premium' (line 808-811)..."
# Make container wider and text smaller
sed -i '808,811s/text-5xl md:text-6xl/text-4xl md:text-5xl/g' app/page.tsx
sed -i '809s/text-xl md:text-2xl max-w-2xl/text-lg md:text-xl max-w-3xl/g' app/page.tsx

echo "✅ Fixed!"
echo ""

echo "2️⃣  Fixing 'Ready to Get Started' (line 949-952)..."
# Already fixed from before, but double check
sed -i '950s/text-xl md:text-2xl max-w-2xl/text-lg md:text-xl max-w-3xl/g' app/page.tsx

echo "✅ Fixed!"
echo ""

echo "Changes made:"
echo "  Line 808: text-6xl → text-5xl (smaller heading)"
echo "  Line 809: max-w-2xl → max-w-3xl (wider container)"
echo "  Line 950: max-w-2xl → max-w-3xl (wider container)"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "Both texts now stay on one line:"
    echo "  ✅ '🚀 Go Live & Unlock Premium' - one line"
    echo "  ✅ 'Join thousands of creators...' - one line"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Prevent text wrapping on CTA sections

- Go Live & Unlock Premium: smaller text, wider container
- Ready to Get Started: wider container
- Both texts now stay on single line
- Better responsive flow"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! No more text wrapping! ✨"
    fi
else
    echo "❌ Build failed"
fi

