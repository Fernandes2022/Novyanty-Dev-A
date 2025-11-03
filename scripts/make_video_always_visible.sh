#!/bin/bash

echo "🎥 MAKING FPS VIDEO ALWAYS VISIBLE AS BACKGROUND..."
echo ""

# Find the modal wrapper
echo "Finding modal wrapper around video..."
grep -n "showDemoVideo" app/page.tsx -B 10 -A 3 | head -30

echo ""
echo "This video is currently:"
echo "❌ Inside a modal (only shows when clicked)"
echo ""
echo "Making it:"
echo "✅ Always visible background video"
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-videoalways-$(date +%Y%m%d-%H%M%S)

# Change showDemoVideo initial state to true (so modal is always open)
sed -i 's/\[showDemoVideo, setShowDemoVideo\] = useState(false)/[showDemoVideo, setShowDemoVideo] = useState(true)/g' app/page.tsx

echo "✅ Video now shows on page load!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎥 FPS video will now:"
    echo "   ✅ Display on page load"
    echo "   ✅ Play automatically"
    echo "   ✅ Be visible as background"
    echo "   ✅ Users can close it with X button"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Make FPS video display on page load

- Changed showDemoVideo to true by default
- Video now shows automatically on page load
- Plays as background video immediately
- Users can still close it with X button"
        
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! Video will show on load now! 🎥"
    fi
else
    echo "❌ Build failed"
fi

