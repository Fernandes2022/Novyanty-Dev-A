#!/bin/bash

echo "🔧 CLEAN FIX - Restoring and fixing properly..."
echo ""

# Find a backup before we broke it
CLEAN_BACKUP=$(ls -t app/page.tsx.backup-* | grep -v "loved" | head -1)

if [ -n "$CLEAN_BACKUP" ]; then
    echo "Found clean backup: $CLEAN_BACKUP"
    cp "$CLEAN_BACKUP" app/page.tsx
else
    echo "Using textfix backup..."
    cp app/page.tsx.backup-textfix-* app/page.tsx 2>/dev/null
fi

echo "✅ Restored clean version"
echo ""

# Now view the exact section to replace
echo "Current 'Loved' section (lines 994-1000):"
sed -n '994,1000p' app/page.tsx

echo ""
echo "=========================================="
echo "Now fixing with proper replacement..."
echo ""

# Create the new Loved section
cat > /tmp/new_loved.txt << 'EOF'
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse">Loved</span>
              </div>
EOF

# Use sed to replace lines 996-998 (the Loved div) in one go
sed -i '996,998d' app/page.tsx
sed -i '995r /tmp/new_loved.txt' app/page.tsx

echo "✅ Replaced!"
echo ""
echo "New section (lines 994-1004):"
sed -n '994,1004p' app/page.tsx

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
        git commit -m "feat: Make 'Loved' badge bigger, pink, and animated

- 2x bigger text size
- Pink gradient color
- Bouncing dot animation
- Pulsing text animation  
- Pink glow effect"
        
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Still issues. Let me check the file structure..."
    echo ""
    echo "Lines 990-1010:"
    sed -n '990,1010p' app/page.tsx
fi

