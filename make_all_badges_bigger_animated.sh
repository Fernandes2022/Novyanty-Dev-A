#!/bin/bash

echo "✨ MAKING ALL BADGES BIGGER & ANIMATED..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-allbadges-$(date +%Y%m%d-%H%M%S)

# Find the badges section (around lines 988-1003)
echo "Current badges section:"
sed -n '988,1003p' app/page.tsx

echo ""
echo "Replacing ALL badges with bigger animated versions..."

# Replace all three badges
cat > /tmp/all_badges.txt << 'BADGES'
            <div className="flex flex-wrap gap-8 justify-center">
              {/* SECURE - Green */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-green-400 animate-pulse">Secure</span>
              </div>
              
              {/* FAST - Blue */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-blue-400 animate-pulse">Fast</span>
              </div>
              
              {/* LOVED - Pink */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-pink-400 animate-pulse">Loved</span>
              </div>
            </div>
BADGES

# Delete old badges section (lines 988-1003)
sed -i '988,1003d' app/page.tsx

# Insert new badges at line 988
sed -i '987r /tmp/all_badges.txt' app/page.tsx

echo "✅ All badges updated!"
echo ""

echo "New badges section:"
sed -n '988,1020p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  ALL BADGES UPGRADED!"
    echo "✅ =========================================="
    echo ""
    echo "Now ALL three badges are:"
    echo "   🟢 Secure - BIGGER green circle + glow + pulse"
    echo "   🔵 Fast - BIGGER blue circle + glow + pulse"
    echo "   💗 Loved - BIGGER pink circle + glow + pulse"
    echo ""
    echo "All badges now:"
    echo "   ✅ Same size (w-6 h-6)"
    echo "   ✅ Glowing effect (blur-md)"
    echo "   ✅ Pulsing animation"
    echo "   ✅ Bigger text (text-xl)"
    echo "   ✅ Consistent design"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add app/page.tsx
        git commit -m "feat: Make all badges (Secure, Fast, Loved) bigger and animated

✨ All three badges now have:
- Bigger circles (w-6 h-6)
- Glowing effect with blur
- Pulsing animations
- Larger text (text-xl)
- Consistent design across all three

🟢 Secure - Green with glow
🔵 Fast - Blue with glow
💗 Loved - Pink with glow"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! All badges are now WOW! ✨🟢🔵💗"
    fi
else
    echo "❌ Build failed"
fi

