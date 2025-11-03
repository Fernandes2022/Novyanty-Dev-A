#!/bin/bash

echo "🔄 UPDATING CONNECT SECTION..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-connect-$(date +%Y%m%d-%H%M%S)

# Replace the Connect links (lines 1033-1035) with new ones
sed -i '1033,1035c\
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pinterest</a></li>\
                <li><a href="#" className="hover:text-purple-400 transition-colors">Facebook</a></li>\
                <li><a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a></li>\
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>' app/page.tsx

echo "✅ Updated Connect section!"
echo ""
echo "Changes:"
echo "  ❌ Removed: 𝕏 Twitter, 🎵 TikTok, 📸 Instagram (with emojis)"
echo "  ✅ Added: Pinterest, Facebook, LinkedIn, Blog (no icons)"
echo ""

echo "New Connect section:"
sed -n '1031,1037p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add app/page.tsx
        git commit -m "feat: Update Connect section - remove emoji icons, add Pinterest/FB/LinkedIn/Blog

- Removed: Twitter, TikTok, Instagram (with emojis)
- Added: Pinterest, Facebook, LinkedIn, Blog
- Clean text-only links"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED!"
        echo ""
        echo "✅ Connect section now has:"
        echo "   - Pinterest"
        echo "   - Facebook"
        echo "   - LinkedIn"
        echo "   - Blog"
    fi
else
    echo "❌ Build failed"
fi

