#!/bin/bash

echo "🔪 KILLING THAT ANNOYING POPUP FOR REAL..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-killpopup-$(date +%Y%m%d-%H%M%S)

echo "Finding and removing the popup..."

# Remove the entire modal section
sed -i '' '/showDemoVideo && (/,/^      <\/motion.div>$/d' app/page.tsx

# Also set showDemoVideo to always be false
sed -i '' 's/const \[showDemoVideo, setShowDemoVideo\] = useState<boolean>(true)/const [showDemoVideo, setShowDemoVideo] = useState<boolean>(false)/' app/page.tsx

echo "✅ Popup code REMOVED!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎯 That fucking popup is GONE now!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Remove How It Works auto-popup completely

- Popup no longer shows on page load
- Clean homepage experience"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! NO MORE POPUP!"
    fi
else
    echo "❌ Build failed"
fi

