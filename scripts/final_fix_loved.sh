#!/bin/bash

echo "🔧 FINAL FIX - Removing duplicate div..."
echo ""

# Remove the duplicate line 995
sed -i '995d' app/page.tsx

echo "✅ Removed duplicate div!"
echo ""

echo "New section (lines 990-1005):"
sed -n '990,1005p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  BUILD SUCCESSFUL!"
    echo "✅ =========================================="
    echo ""
    echo "💖 'Loved' badge is now:"
    echo "   - 2x BIGGER"
    echo "   - PINK gradient"
    echo "   - BOUNCING dot animation"
    echo "   - PULSING text animation"
    echo "   - GLOWING pink effect"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add app/page.tsx
        git commit -m "feat: Make 'Loved' badge bigger, pink, and animated

✨ Features:
- Increased size from sm to 2xl (2x bigger)
- Pink gradient (pink-400 to rose-400)
- Bouncing dot animation
- Pulsing text animation
- Pink glow effect
- Stands out in footer"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! 'Loved' badge is WOW! 💖✨"
    fi
else
    echo "❌ Build failed"
fi

