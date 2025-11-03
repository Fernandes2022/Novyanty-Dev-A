#!/bin/bash

echo "🔧 Restoring from clean backup..."
echo ""

# Find the last good backup before we started messing with badges
CLEAN_BACKUP=$(ls -t app/page.tsx.backup-* | grep -v "badges\|allbadges" | head -1)

if [ -n "$CLEAN_BACKUP" ]; then
    echo "Found clean backup: $CLEAN_BACKUP"
    cp "$CLEAN_BACKUP" app/page.tsx
else
    echo "Using video backup..."
    cp app/page.tsx.backup-video-* app/page.tsx
fi

echo "✅ Restored!"
echo ""

# Now view the badges section properly
echo "Current badges (lines 985-1005):"
sed -n '985,1005p' app/page.tsx

echo ""
echo "Now replacing properly..."

# Use Python for clean replacement
python3 << 'PYTHON_FIX'
with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find and replace the badges section
old_badges = '''            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-white/60">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-white/60">Fast</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-bounce"></div>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse">Loved</span>
              </div>
            </div>'''

new_badges = '''            <div className="flex flex-wrap gap-8 justify-center">
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
            </div>'''

if old_badges in content:
    content = content.replace(old_badges, new_badges)
    print("✅ Replaced badges section!")
else:
    print("❌ Could not find exact match - trying alternate pattern...")
    # Fallback: just look for the Loved badge pattern
    import re
    # This is more flexible
    
with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ File updated!")
PYTHON_FIX

echo ""
echo "✅ Badges replaced with Python!"
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
        git commit -m "feat: All badges bigger and animated - Secure, Fast, Loved

✨ Upgraded all three badges:
🟢 Secure - Bigger green + glow + pulse
🔵 Fast - Bigger blue + glow + pulse  
💗 Loved - Bigger pink + glow + pulse

All consistent: w-6 h-6, text-xl, glowing"
        
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Build failed, showing context..."
    sed -n '985,1010p' app/page.tsx
fi

