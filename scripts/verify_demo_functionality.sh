#!/bin/bash

echo "🔍 DEMO FUNCTIONALITY VERIFICATION..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CHECKING VIDEO COMPONENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "✅ VideoBackground.tsx exists"
    echo ""
    echo "🔍 Checking critical attributes..."
    
    # Check autoPlay
    if grep -q "autoPlay" components/home/VideoBackground.tsx; then
        echo "✅ autoPlay attribute present"
    else
        echo "❌ MISSING: autoPlay attribute"
    fi
    
    # Check muted
    if grep -q "muted" components/home/VideoBackground.tsx; then
        echo "✅ muted attribute present"
    else
        echo "❌ MISSING: muted attribute"
    fi
    
    # Check playsInline
    if grep -q "playsInline" components/home/VideoBackground.tsx; then
        echo "✅ playsInline attribute present"
    else
        echo "❌ MISSING: playsInline attribute"
    fi
    
    # Check loop
    if grep -q "loop" components/home/VideoBackground.tsx; then
        echo "✅ loop attribute present"
    else
        echo "❌ MISSING: loop attribute"
    fi
    
    # Check mute button
    if grep -q "toggleMute" components/home/VideoBackground.tsx; then
        echo "✅ toggleMute function present"
    else
        echo "❌ MISSING: toggleMute function"
    fi
    
    echo ""
    echo "📄 Current video element:"
    grep -A 10 "<video" components/home/VideoBackground.tsx | head -15
    
else
    echo "❌ CRITICAL: VideoBackground.tsx NOT FOUND!"
    exit 1
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ CHECKING VIDEO FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

VIDEO_PATH="public/videos/How much FPS.mp4"

if [ -f "$VIDEO_PATH" ]; then
    echo "✅ Video file exists"
    echo "📊 File info:"
    ls -lh "$VIDEO_PATH"
    
    # Check file size (should be > 1MB)
    FILE_SIZE=$(stat -f%z "$VIDEO_PATH" 2>/dev/null || stat -c%s "$VIDEO_PATH" 2>/dev/null)
    if [ $FILE_SIZE -gt 1000000 ]; then
        echo "✅ Video file size OK ($(($FILE_SIZE / 1024 / 1024))MB)"
    else
        echo "⚠️  Video file seems small ($(($FILE_SIZE / 1024))KB)"
    fi
else
    echo "❌ CRITICAL: Video file NOT FOUND!"
    echo "   Expected: $VIDEO_PATH"
    exit 1
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ CHECKING HOME PAGE INTEGRATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

HOME_PAGE="app/page.tsx"

if [ -f "$HOME_PAGE" ]; then
    echo "✅ Home page exists"
    
    if grep -q "VideoBackground" "$HOME_PAGE"; then
        echo "✅ VideoBackground component imported/used"
    else
        echo "⚠️  VideoBackground not found in home page"
    fi
else
    echo "⚠️  Home page not found at: $HOME_PAGE"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ TESTING LOCAL SERVER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🌐 Checking if dev server is running..."

if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Dev server is running on port 3000"
    echo ""
    echo "🔗 Test URL: http://localhost:3000"
    echo ""
    echo "📋 Things to check in browser:"
    echo "   1. Video should start playing automatically"
    echo "   2. Mute/unmute button should be visible"
    echo "   3. Click button - icon should change (🔊/🔇)"
    echo "   4. Click button - audio should toggle"
    echo "   5. Open DevTools Console - check for errors"
else
    echo "⚠️  Dev server is NOT running"
    echo ""
    echo "To start the server:"
    echo "   npm run dev"
    echo ""
    echo "Then test at: http://localhost:3000"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ CHECKING BUILD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d ".next" ]; then
    echo "✅ Build directory exists"
    
    # Check if build is recent (within last hour)
    if [ -n "$(find .next -mmin -60 2>/dev/null)" ]; then
        echo "✅ Build is recent (< 1 hour old)"
    else
        echo "⚠️  Build might be outdated"
        echo "   Run: npm run build"
    fi
else
    echo "⚠️  No build found"
    echo "   Run: npm run build"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣ FULL COMPONENT CODE REVIEW"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📄 VideoBackground.tsx content:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat components/home/VideoBackground.tsx
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣ WHAT SHOULD BE WORKING"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'EXPECTED'
✅ Expected Behavior:

1. VIDEO AUTOPLAY:
   - Video starts playing automatically on page load
   - Video is muted by default (required for autoplay)
   - Video loops continuously
   - Video plays inline on mobile (no fullscreen)

2. MUTE BUTTON:
   - Button is visible (fixed position)
   - Shows 🔇 icon when muted (default)
   - Shows 🔊 icon when unmuted
   - Click toggles mute/unmute
   - Click changes icon immediately

3. VIDEO ELEMENT ATTRIBUTES REQUIRED:
   <video
     autoPlay          ← Makes video start automatically
     muted             ← Required for autoplay to work
     loop              ← Video repeats
     playsInline       ← Plays inline on mobile
   >

4. COMMON ISSUES:
   ❌ Video not playing → Missing autoPlay or muted
   ❌ Fullscreen on mobile → Missing playsInline
   ❌ Button not working → toggleMute not connected
   ❌ Icon not changing → State not updating
EXPECTED

echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 TESTING INSTRUCTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'TESTING'
📋 Manual Testing Steps:

1. START DEV SERVER (if not running):
   npm run dev

2. OPEN BROWSER:
   http://localhost:3000

3. TEST VIDEO AUTOPLAY:
   ✓ Video should start playing immediately
   ✓ Video should be muted (no sound)
   ✓ Video should loop continuously

4. TEST MUTE BUTTON:
   ✓ Find mute button (usually bottom-right)
   ✓ Should show 🔇 icon (muted)
   ✓ Click button
   ✓ Icon should change to 🔊
   ✓ Audio should play
   ✓ Click again - should mute

5. CHECK CONSOLE:
   ✓ Press F12 (DevTools)
   ✓ Go to Console tab
   ✓ Should have no errors
   ✓ Look for video-related warnings

6. TEST ON MOBILE (if possible):
   ✓ Video plays inline (not fullscreen)
   ✓ Autoplay works
   ✓ Button is accessible
TESTING

echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Count issues
ISSUES=0

if ! grep -q "autoPlay" components/home/VideoBackground.tsx; then
    ISSUES=$((ISSUES+1))
fi

if ! grep -q "muted" components/home/VideoBackground.tsx; then
    ISSUES=$((ISSUES+1))
fi

if ! grep -q "toggleMute" components/home/VideoBackground.tsx; then
    ISSUES=$((ISSUES+1))
fi

if [ ! -f "$VIDEO_PATH" ]; then
    ISSUES=$((ISSUES+1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "🎉 ALL CHECKS PASSED!"
    echo ""
    echo "✅ Video component configured correctly"
    echo "✅ Video file present"
    echo "✅ Mute button implemented"
    echo "✅ All attributes in place"
    echo ""
    echo "🚀 Demo should be functioning!"
    echo ""
    echo "👉 Start server: npm run dev"
    echo "👉 Test at: http://localhost:3000"
else
    echo "⚠️  Found $ISSUES issue(s)"
    echo ""
    echo "Review the output above for details"
fi
echo ""

