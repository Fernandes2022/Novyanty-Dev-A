#!/bin/bash

echo "💖 UPGRADING 'LOVED' BADGE..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-loved-$(date +%Y%m%d-%H%M%S)

# Replace the Loved section with bigger, pink, animated version
sed -i '996,998s/.*/              <div className="flex items-center gap-3">\
                <div className="relative">\
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-50 animate-pulse"><\/div>\
                  <div className="relative w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"><\/div>\
                <\/div>\
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse">Loved<\/span>\
              <\/div>/' app/page.tsx

echo "✅ Updated 'Loved' badge!"
echo ""
echo "Changes:"
echo "  ✅ Bigger text (text-2xl, was text-sm)"
echo "  ✅ Pink gradient (pink-400 to rose-400)"
echo "  ✅ Larger dot (w-5 h-5, was w-3 h-3)"
echo "  ✅ Glowing effect (blur-lg with pink glow)"
echo "  ✅ Bounce animation on dot"
echo "  ✅ Pulse animation on text"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "💖 'Loved' is now:"
    echo "   - BIGGER (2x larger)"
    echo "   - PINK (gradient pink to rose)"
    echo "   - ANIMATED (bouncing dot + pulsing text)"
    echo "   - GLOWING (pink blur effect)"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add app/page.tsx
        git commit -m "feat: Make 'Loved' badge bigger, pink, and animated

- Increased text size from sm to 2xl
- Changed color to pink gradient
- Added bouncing animation to dot
- Added pulsing animation to text
- Added glowing pink blur effect
- Makes it stand out in footer"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! 'Loved' badge is now WOW! 💖✨"
    fi
else
    echo "❌ Build failed"
fi

