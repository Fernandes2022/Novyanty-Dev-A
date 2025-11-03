#!/bin/bash

echo "🔍 INVESTIGATING WHY VIDEO ISN'T AUTOPLAYING..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CHECKING VIDEO FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "public/videos/How much FPS.mp4" ]; then
    echo "✅ Video file exists"
    ls -lh "public/videos/How much FPS.mp4"
else
    echo "❌ VIDEO FILE NOT FOUND!"
    echo "Checking what's in public/videos/:"
    ls -la public/videos/ 2>/dev/null || echo "videos folder doesn't exist!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ CHECKING VideoBackground COMPONENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Video element setup:"
grep -A 15 "<video" components/home/VideoBackground.tsx
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ CHECKING AUTOPLAY LOGIC"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "useEffect for video playback:"
grep -A 30 "useEffect" components/home/VideoBackground.tsx | grep -A 30 "video.play"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ CHECKING IF VIDEO IS BEING RENDERED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Checking for prefersReducedMotion early return:"
if grep -q "if (prefersReducedMotion) return null" components/home/VideoBackground.tsx; then
    echo "⚠️  Video won't show if user has reduced motion enabled!"
    grep "prefersReducedMotion" components/home/VideoBackground.tsx
else
    echo "✅ No reduced motion blocking"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ CHECKING WHERE VideoBackground IS USED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Looking in app/page.tsx:"
if grep -q "VideoBackground" app/page.tsx; then
    echo "✅ VideoBackground is imported in page.tsx"
    grep -n "VideoBackground" app/page.tsx
else
    echo "❌ VideoBackground NOT found in page.tsx!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣ CHECKING VIDEO ATTRIBUTES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Critical attributes for autoplay:"
echo ""
echo "Has 'autoPlay' attribute?"
if grep -q "autoPlay" components/home/VideoBackground.tsx; then
    echo "  ✅ autoPlay found"
    grep "autoPlay" components/home/VideoBackground.tsx
else
    echo "  ❌ NO autoPlay attribute! This is the problem!"
fi
echo ""

echo "Has 'muted' attribute?"
if grep -q "muted" components/home/VideoBackground.tsx; then
    echo "  ✅ muted found (required for autoplay)"
    grep "muted" components/home/VideoBackground.tsx | head -3
else
    echo "  ❌ NO muted attribute!"
fi
echo ""

echo "Has 'playsInline' attribute?"
if grep -q "playsInline" components/home/VideoBackground.tsx; then
    echo "  ✅ playsInline found"
else
    echo "  ❌ NO playsInline attribute!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣ FULL VIDEO ELEMENT CODE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Complete video element:"
grep -A 20 "<video" components/home/VideoBackground.tsx
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8️⃣ CHECKING CONSOLE/BROWSER LOGS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Video play attempts in code:"
grep -n "video.play()" components/home/VideoBackground.tsx
echo ""

echo "Error handling:"
grep -A 5 "catch" components/home/VideoBackground.tsx | grep -A 5 "play"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 DIAGNOSIS SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ISSUES=0

# Check if autoPlay attribute exists
if ! grep -q "autoPlay" components/home/VideoBackground.tsx; then
    echo "❌ MISSING: autoPlay attribute on <video> element"
    ISSUES=$((ISSUES+1))
fi

# Check if muted attribute exists
if ! grep -q "muted" components/home/VideoBackground.tsx; then
    echo "❌ MISSING: muted attribute (required for autoplay)"
    ISSUES=$((ISSUES+1))
fi

# Check if video file exists
if [ ! -f "public/videos/How much FPS.mp4" ]; then
    echo "❌ MISSING: Video file not found!"
    ISSUES=$((ISSUES+1))
fi

# Check if VideoBackground is used
if ! grep -q "VideoBackground" app/page.tsx; then
    echo "❌ MISSING: VideoBackground not rendered in page.tsx"
    ISSUES=$((ISSUES+1))
fi

echo ""
if [ $ISSUES -eq 0 ]; then
    echo "🤔 All basic checks passed, but video still not playing?"
    echo ""
    echo "Possible causes:"
    echo "  1. Browser autoplay policy blocking it"
    echo "  2. Video.play() not being called"
    echo "  3. Video element not being rendered"
    echo "  4. useEffect not running"
    echo "  5. Video ref not connecting properly"
else
    echo "🔥 FOUND $ISSUES CRITICAL ISSUE(S) ABOVE!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Open browser console (F12)"
echo "4. Look for any red errors"
echo "5. Check if you see: 'Video autoplay prevented' message"
echo ""

