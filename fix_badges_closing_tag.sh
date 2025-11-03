#!/bin/bash

echo "🔧 Fixing missing closing tag..."
echo ""

# Check lines around the error
echo "Lines 1010-1020:"
sed -n '1010,1020p' app/page.tsx

echo ""
echo "Adding missing closing tag..."

# Add the missing </motion.div> before </section>
sed -i '1016a\          </motion.div>' app/page.tsx

echo "✅ Fixed!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "feat: Make all badges bigger and animated - Secure, Fast, Loved

✨ All three badges now match:
- Bigger circles (w-6 h-6)
- Glowing effect
- Pulsing animations
- Larger text (text-xl)

🟢 Secure - Green + glow + pulse
🔵 Fast - Blue + glow + pulse
💗 Loved - Pink + glow + pulse"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! All badges are WOW! ✨"
    fi
else
    echo "❌ Still broken, checking structure..."
    sed -n '1010,1025p' app/page.tsx
fi

