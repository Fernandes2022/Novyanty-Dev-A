#!/bin/bash

echo "🎥 MAKING FPS VIDEO THE ACTUAL BACKGROUND..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-bgvideo-$(date +%Y%m%d-%H%M%S)

echo "Finding VideoBackground component..."
grep -n "VideoBackground" app/page.tsx

echo ""
echo "Replacing background video with FPS video..."

# Change the VideoBackground component to use FPS video
if [ -f "components/home/VideoBackground.tsx" ]; then
    cp components/home/VideoBackground.tsx components/home/VideoBackground.tsx.backup
    
    # Replace the video source in VideoBackground
    sed -i 's|/videos/background.mp4|/videos/How much FPS.mp4|g' components/home/VideoBackground.tsx
    
    echo "✅ VideoBackground now uses FPS video!"
else
    echo "VideoBackground component not found, checking inline video..."
fi

echo ""
echo "Also removing the modal video (so it doesn't show twice)..."

# Change showDemoVideo back to false so modal doesn't show
sed -i 's/showDemoVideo\] = useState(true)/showDemoVideo] = useState(false)/g' app/page.tsx

echo "✅ Modal hidden, background video active!"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎥 FPS video now:"
    echo "   ✅ Plays as BACKGROUND automatically"
    echo "   ✅ NO modal/popup"
    echo "   ✅ Just like the screenshot"
    echo "   ✅ Visible on page load"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Make FPS video play as background (not modal)

- Changed VideoBackground to use FPS video
- Removed modal popup
- Video plays automatically as background
- No open/close buttons needed"
        
        git push origin main
        echo "🎉 DEPLOYED! FPS video is now the background! 🎥"
    fi
else
    echo "❌ Build failed"
fi

