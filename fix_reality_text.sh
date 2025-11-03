#!/bin/bash

echo "🔧 Fixing 'reality' text wrapping..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-textfix-$(date +%Y%m%d-%H%M%S)

echo "Fixing line 950..."

# Fix: Change max-w-2xl to max-w-3xl for wider container
sed -i '949,951s/text-xl md:text-2xl max-w-2xl/text-lg md:text-xl lg:text-2xl max-w-3xl/' app/page.tsx

echo "✅ Fixed!"
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "   'reality' will now stay on same line ✨"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add app/page.tsx
        git commit -m "fix: Prevent 'reality' text wrapping on CTA section"
        git push origin main
        echo ""
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Build failed"
    exit 1
fi

