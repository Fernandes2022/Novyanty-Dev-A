#!/bin/bash

echo "🔍 FINAL MUTE/UNMUTE VERIFICATION CHECK..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CHECKING VideoBackground COMPONENT CODE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "✅ VideoBackground.tsx exists"
    echo ""
    
    echo "📋 Checking for mute state management:"
    if grep -q "isMuted" components/home/VideoBackground.tsx; then
        echo "  ✅ isMuted state found"
        grep "isMuted" components/home/VideoBackground.tsx
    else
        echo "  ❌ NO isMuted state!"
    fi
    echo ""
    
    echo "📋 Checking for toggle function:"
    if grep -q "toggleMute" components/home/VideoBackground.tsx; then
        echo "  ✅ toggleMute function found"
        grep -A 8 "toggleMute" components/home/VideoBackground.tsx
    else
        echo "  ❌ NO toggleMute function!"
    fi
    echo ""
    
    echo "📋 Checking for mute button in JSX:"
    if grep -q "onClick={toggleMute}" components/home/VideoBackground.tsx; then
        echo "  ✅ Mute button with onClick found"
        grep -B 2 -A 5 "onClick={toggleMute}" components/home/VideoBackground.tsx
    else
        echo "  ❌ NO clickable mute button!"
    fi
    echo ""
    
    echo "📋 Checking for icons:"
    if grep -q "VolumeX\|Volume2" components/home/VideoBackground.tsx; then
        echo "  ✅ Volume icons imported"
        grep "import.*Volume" components/home/VideoBackground.tsx
    else
        echo "  ❌ NO volume icons!"
    fi
    echo ""
else
    echo "❌ VideoBackground.tsx NOT FOUND!"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ CHECKING VIDEO ELEMENT SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Video element attributes:"
grep -A 10 "<video" components/home/VideoBackground.tsx | head -15

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ CHECKING FOR POINTER EVENTS ISSUES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if grep -q "pointer-events-auto" components/home/VideoBackground.tsx; then
    echo "✅ Button has pointer-events-auto"
    grep "pointer-events" components/home/VideoBackground.tsx
else
    echo "⚠️  Check pointer events setup"
    grep "pointer-events" components/home/VideoBackground.tsx
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ TESTING BUILD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run build > /tmp/build_output.txt 2>&1

if [ $? -eq 0 ]; then
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    tail -20 /tmp/build_output.txt
else
    echo "❌ BUILD FAILED!"
    cat /tmp/build_output.txt
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ FINAL VERIFICATION CHECKLIST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ISSUES=0

# Check 1: isMuted state
if grep -q "const \[isMuted, setIsMuted\] = useState" components/home/VideoBackground.tsx; then
    echo "✅ isMuted state properly declared"
else
    echo "❌ isMuted state NOT found"
    ISSUES=$((ISSUES+1))
fi

# Check 2: toggleMute function
if grep -q "const toggleMute = () =>" components/home/VideoBackground.tsx; then
    echo "✅ toggleMute function exists"
else
    echo "❌ toggleMute function NOT found"
    ISSUES=$((ISSUES+1))
fi

# Check 3: video.muted toggle
if grep -q "video.muted = !video.muted" components/home/VideoBackground.tsx; then
    echo "✅ video.muted is being toggled"
else
    echo "❌ video.muted NOT being toggled"
    ISSUES=$((ISSUES+1))
fi

# Check 4: setIsMuted update
if grep -q "setIsMuted(video.muted)" components/home/VideoBackground.tsx; then
    echo "✅ State is updated after toggle"
else
    echo "❌ State NOT updated after toggle"
    ISSUES=$((ISSUES+1))
fi

# Check 5: Button with onClick
if grep -q 'onClick={toggleMute}' components/home/VideoBackground.tsx; then
    echo "✅ Button has onClick handler"
else
    echo "❌ Button has NO onClick handler"
    ISSUES=$((ISSUES+1))
fi

# Check 6: Icons conditional rendering
if grep -q '{isMuted ?' components/home/VideoBackground.tsx; then
    echo "✅ Icons switch based on muted state"
else
    echo "❌ Icons NOT switching"
    ISSUES=$((ISSUES+1))
fi

# Check 7: Button is clickable
if grep -q 'pointer-events-auto' components/home/VideoBackground.tsx; then
    echo "✅ Button is clickable (pointer-events-auto)"
else
    echo "❌ Button might not be clickable"
    ISSUES=$((ISSUES+1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 FINAL REPORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ISSUES -eq 0 ]; then
    echo "🎉 ALL CHECKS PASSED! ✅"
    echo ""
    echo "Mute/Unmute button should be working perfectly:"
    echo "  ✅ State management in place"
    echo "  ✅ Toggle function working"
    echo "  ✅ Video muted property updates"
    echo "  ✅ Button is clickable"
    echo "  ✅ Icons change based on state"
    echo ""
    echo "🧪 TO TEST:"
    echo "  1. Run: npm run dev"
    echo "  2. Open: http://localhost:3000"
    echo "  3. Look for button in bottom-right corner"
    echo "  4. Click it - should toggle sound"
    echo "  5. Icon should change between VolumeX and Volume2"
else
    echo "⚠️  FOUND $ISSUES ISSUE(S)!"
    echo ""
    echo "Let me show you the full component:"
    echo ""
    cat components/home/VideoBackground.tsx
fi

