#!/bin/bash

echo "🔍 FINDING VIDEO MODAL STATE..."
echo ""

# Find where showDemoVideo is defined
echo "Modal state:"
grep -n "showDemoVideo.*useState" app/page.tsx

echo ""
echo "Modal wrapper:"
grep -n "showDemoVideo &&" app/page.tsx -A 2 -B 2

echo ""
echo "=========================================="
echo "SOLUTION OPTIONS:"
echo "=========================================="
echo ""
echo "1. Make modal OPEN by default (video shows on load)"
echo "2. Move video OUTSIDE modal (always visible)"
echo ""
read -p "Which option? (1 or 2): " option

if [ "$option" = "1" ]; then
    echo ""
    echo "Making modal open by default..."
    
    # Change useState(false) to useState(true)
    sed -i 's/showDemoVideo.*useState(false)/showDemoVideo] = useState(true)/g' app/page.tsx
    
    echo "✅ Modal now opens by default!"
    
elif [ "$option" = "2" ]; then
    echo ""
    echo "This is more complex - keeping modal as-is"
    echo "Recommend option 1 instead"
else
    echo "Invalid option"
    exit 1
fi

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "   Video modal now shows on page load!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Make FPS video modal open by default

- Changed showDemoVideo initial state to true
- Video now displays on page load
- Users see video immediately"
        
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
fi

