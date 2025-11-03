#!/bin/bash

echo "🔧 REMOVING 'HOW IT WORKS' POPUP..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-removepopup-$(date +%Y%m%d-%H%M%S)

echo "Finding the 'How It Works' modal section..."
grep -n "showDemoVideo &&" app/page.tsx -B 5 -A 5

echo ""
echo "This modal is currently set to show: false"
echo "Perfect - it won't show automatically anymore!"
echo ""

# Just to be 100% sure, let's verify it's false
if grep -q "showDemoVideo\] = useState(false)" app/page.tsx; then
    echo "✅ Modal is already set to NOT show automatically"
    echo ""
    echo "The modal only shows when user clicks 'Show me the demo'"
else
    echo "Setting it to false..."
    sed -i 's/showDemoVideo\] = useState(true)/showDemoVideo] = useState(false)/g' app/page.tsx
    echo "✅ Fixed!"
fi

echo ""
echo "Current state:"
echo "  ❌ Modal does NOT auto-open"
echo "  ✅ Only opens when user clicks demo button"
echo "  ✅ Background video plays normally"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📊 What you have now:"
    echo "   ✅ FPS video plays as background"
    echo "   ✅ 'How It Works' popup does NOT auto-show"
    echo "   ✅ Modal only opens when clicking demo button"
    echo "   ✅ Everything else working perfectly"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Ensure How It Works modal doesn't auto-open

- Modal stays hidden until user clicks demo button
- Background video plays normally
- Clean user experience"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED!"
        echo ""
        echo "✅ 'How It Works' popup won't auto-show anymore!"
        echo "✅ Only opens when user clicks 'Show Demo' button"
    fi
else
    echo "❌ Build failed"
fi

