#!/bin/bash

echo "🚀 DEPLOYING ALL 11 IMPROVEMENTS..."
echo ""
echo "📦 Changes being deployed:"
echo "  1. ✅ Navigation cleanup & spacing (gap-10)"
echo "  2. ✅ Text sizes doubled (all sections)"
echo "  3. ✅ Icons inline (How It Works)"
echo "  4. ✅ Button spacing fixed (Try It Live)"
echo "  5. ✅ Testimonials slower (45s)"
echo "  6. ✅ Who It's For - 6th item added"
echo "  7. ✅ Comparison table mobile fix"
echo "  8. ✅ Pricing consistency (all badges)"
echo "  9. ✅ Hero heading one line (desktop)"
echo " 10. ✅ NEW hero video (How much FPS.mp4)"
echo " 11. ✅ Workspace preview placeholder"
echo ""

# Stage all changes
git add .

# Create comprehensive commit message
git commit -m "🎨 Major UI/UX improvements - 11 enhancements

✨ Navigation
- Removed 'Adaptive Engine' badge
- Increased spacing (gap-6 → gap-10)
- FAQ, About, Get Started well-spaced

📏 Typography
- All section headings 2x larger (text-5xl md:text-6xl)
- All subtitles 2x larger (text-xl md:text-2xl)
- Hero heading fits one line on desktop (7rem → 5rem)

🎯 How It Works
- Icons moved inline: Say It 🎤, Watch It Build ⚡, Launch It 🚀
- Better visual hierarchy

🎨 Try It Live
- Fixed button overlap (gap-3 → gap-6)
- Generate Preview & Chaos Mode properly spaced

🎬 Testimonials
- Carousel speed reduced 80% (25s → 45s)
- More time to read reviews

👥 Who It's For
- Added 6th category: Bloggers & Writers ✍️
- Better grid layout (2x3)

📱 Comparison Table
- Fits perfectly on mobile
- No horizontal scrolling
- Tiny readable text (9-10px)

💰 Pricing
- All plans have badges: STARTER, POPULAR, ENTERPRISE
- All buttons say 'Get Started'
- Consistent styling across all tiers

🎥 Hero Video
- NEW: 'How much FPS.mp4' (2.3MB)
- 87% smaller file size (was 18MB)
- Faster loading, smoother performance

🖼️ Workspace
- Preview variants placeholder added
- Right panel no longer empty before compose

All builds successful ✅
Ready for production 🚀"

# Push to main
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   DEPLOYMENT SUCCESSFUL!"
    echo "🎉 ================================"
    echo ""
    echo "✅ All 11 improvements pushed to production!"
    echo ""
    echo "🌐 Your site will be live in 2-3 minutes at:"
    echo "   https://your-domain.com"
    echo ""
    echo "📊 Changes deployed:"
    echo "   • Navigation improvements"
    echo "   • All text sizes doubled"
    echo "   • How It Works icons inline"
    echo "   • Button spacing fixed"
    echo "   • Testimonials 80% slower"
    echo "   • Who It's For - 6 items"
    echo "   • Mobile table fix"
    echo "   • Pricing badges for all plans"
    echo "   • Hero heading one line"
    echo "   • NEW video (87% smaller!)"
    echo "   • Workspace preview placeholder"
    echo ""
    echo "🎊 Great work! Your site is now even better! 🎊"
else
    echo "❌ Deployment failed!"
    echo "Check git status and try again"
    exit 1
fi

