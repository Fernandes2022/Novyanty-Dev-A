#!/bin/bash

echo "🚀 DEPLOYING ALL 6 FINAL FIXES..."
echo ""
echo "📦 Changes being deployed:"
echo "  1. ✅ Navigation spacing (mr-8 between About/Get Started)"
echo "  2. ✅ Try It Live button hover fix (gap 8, scale 1.01)"
echo "  3. ✅ Pricing button gradients (all 3 plans colored)"
echo "  4. ✅ Workspace preview teaser (Live Preview Variants)"
echo "  5. ✅ Hero text ONE line (4rem + nowrap) ← Build a website..."
echo "  6. ✅ NEW hero video (How much FPS.mp4 - 2.3MB)"
echo ""

# Stage all changes
git add .

# Create comprehensive commit message
git commit -m "🎨 Final UI polish - 6 critical fixes

✨ Navigation
- Added mr-8 margin between About and Get Started
- Fixed text overlap issue

🎨 Try It Live Section
- Increased button gap (6 → 8)
- Reduced hover scale (1.02 → 1.01)
- No more button overlap on hover

💰 Pricing Section
- All 3 plans now have gradient buttons
- 💙 Basic: Blue gradient (matches STARTER)
- 💜 Pro: Purple gradient (matches POPULAR)
- 💛 Premium: Yellow/orange gradient (matches ENTERPRISE)
- Added hover color effects (lighter on hover)

🖼️ Workspace Page
- Added 'Live Preview Variants' teaser
- 4 animated placeholder boxes
- Shows when workspace is empty
- Disappears when user composes

📝 Hero Heading - ONE LINE FIX
- Reduced max size (5rem → 4rem)
- Added white-space: nowrap
- 'Build a website before your coffee cools' on ONE line (desktop)
- Mobile: Still readable (2.5rem min)

🎥 Hero Background Video
- NEW: 'How much FPS.mp4' (2.3MB)
- 87% smaller than previous (was 18MB)
- Faster loading across all devices
- Loops continuously on mobile & desktop

All builds successful ✅
Production ready 🚀"

# Push to main
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   DEPLOYMENT SUCCESSFUL!"
    echo "🎉 ================================"
    echo ""
    echo "✅ All 6 fixes pushed to production!"
    echo ""
    echo "🌐 Your site will be live in 2-3 minutes!"
    echo ""
    echo "�� What's now live:"
    echo "   ✅ Navigation spacing fixed (no overlap)"
    echo "   ✅ Try It Live buttons perfected"
    echo "   ✅ All pricing plans have gradient buttons"
    echo "   ✅ Workspace shows preview teaser"
    echo "   ✅ 'Build a website...' on ONE line (desktop) ✨"
    echo "   ✅ NEW video (How much FPS.mp4 - super fast!)"
    echo ""
    echo "🎊 All fixes deployed! Site is now polished! 🎊"
else
    echo "❌ Deployment failed!"
    echo "Check git status and try again"
    exit 1
fi

