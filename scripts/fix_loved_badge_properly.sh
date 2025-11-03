#!/bin/bash

echo "🔧 Fixing 'Loved' badge properly..."
echo ""

# Restore from backup
cp app/page.tsx.backup-loved-* app/page.tsx 2>/dev/null

# Now do it correctly with a simple replacement
# Find line 997 and replace just that section

# Replace the Loved div (lines 996-998) carefully
cat > /tmp/loved_replacement.txt << 'LOVED'
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse">Loved</span>
              </div>
LOVED

# Use awk to replace lines 996-998
awk 'NR==996,NR==998 {
  if (NR==996) {
    system("cat /tmp/loved_replacement.txt")
  }
  next
}
{print}' app/page.tsx > app/page.tsx.tmp && mv app/page.tsx.tmp app/page.tsx

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
        git add app/page.tsx
        git commit -m "feat: Make 'Loved' bigger, pink, and animated"
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Still broken, let me try manual fix..."
    echo ""
    echo "Showing lines 990-1000:"
    sed -n '990,1000p' app/page.tsx
fi

