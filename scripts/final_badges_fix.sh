#!/bin/bash

echo "🔧 FIXING ALL BADGES PROPERLY..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-finalbadges-$(date +%Y%m%d-%H%M%S)

# Delete the old badges section (lines 987-1001, which is the 15 lines of badges)
sed -i '987,1001d' app/page.tsx

# Create the new badges section
cat > /tmp/new_all_badges.txt << 'BADGES'
              {/* ALL THREE BADGES - BIGGER & ANIMATED */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-green-400 animate-pulse">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-blue-400 animate-pulse">Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-6 h-6 bg-pink-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-semibold text-pink-400 animate-pulse">Loved</span>
              </div>
BADGES

# Insert new badges at line 986 (after the gap-8 div opening)
sed -i '986r /tmp/new_all_badges.txt' app/page.tsx

echo "✅ Badges replaced!"
echo ""

echo "New badges section:"
sed -n '987,1012p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "All badges now:"
    echo "🟢 Secure - w-6 h-6, text-xl, green + glow + pulse"
    echo "🔵 Fast - w-6 h-6, text-xl, blue + glow + pulse"
    echo "💗 Loved - w-6 h-6, text-xl, pink + glow + pulse"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Actually update all badges to bigger animated version

✨ All three badges now properly upgraded:
🟢 Secure - w-6 h-6, text-xl, glowing green, pulsing
🔵 Fast - w-6 h-6, text-xl, glowing blue, pulsing
💗 Loved - w-6 h-6, text-xl, glowing pink, pulsing

All consistent size and animation!"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! All badges are now BIGGER & ANIMATED! ✨"
    fi
else
    echo "❌ Build failed"
fi

