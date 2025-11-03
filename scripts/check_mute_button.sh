#!/bin/bash

echo "🔍 INVESTIGATING MUTE/UNMUTE BUTTON..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CHECKING VideoBackground COMPONENT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "✅ Found VideoBackground.tsx"
    echo ""
    echo "📹 Video element:"
    grep -A 5 "<video" components/home/VideoBackground.tsx
    echo ""
    echo "🔇 Mute button section:"
    grep -B 3 -A 10 "muted\|volume\|sound\|audio" components/home/VideoBackground.tsx | head -30
else
    echo "❌ VideoBackground.tsx not found!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ CHECKING IF THERE ARE MULTIPLE VIDEO REFS..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Searching for video refs in page.tsx:"
grep -n "videoRef\|videoFpsRef" app/page.tsx

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ CHECKING MUTE STATE MANAGEMENT..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Looking for muted state in VideoBackground:"
if [ -f "components/home/VideoBackground.tsx" ]; then
    grep -n "useState.*muted\|isMuted\|setMuted" components/home/VideoBackground.tsx
else
    echo "File not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ CHECKING THE ACTUAL MUTE TOGGLE FUNCTION..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "Mute toggle function:"
    grep -A 10 "toggleMute\|handleMute" components/home/VideoBackground.tsx
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ FULL VideoBackground.tsx CONTENT:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "components/home/VideoBackground.tsx" ]; then
    cat components/home/VideoBackground.tsx
else
    echo "❌ File not found!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Possible issues to look for:"
echo "  1. Video ref not properly connected to mute button"
echo "  2. Multiple video elements fighting each other"
echo "  3. Muted state not updating the actual video"
echo "  4. Video autoplay policy blocking unmute"
echo ""
echo "Let's see what we find! 🔍"

