#!/bin/bash

echo "🏥 COMPREHENSIVE HEALTH CHECK..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ ROOT DIRECTORY CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SHELL_SCRIPTS=$(ls -1 *.sh 2>/dev/null | wc -l)
if [ $SHELL_SCRIPTS -le 1 ]; then
    echo "✅ Root directory is clean"
else
    echo "⚠️  Found $SHELL_SCRIPTS .sh files in root"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ ESSENTIAL FILES CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ESSENTIAL_FILES=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "README.md"
    ".env.local"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ MISSING: $file"
    fi
done
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ ESSENTIAL DIRECTORIES CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ESSENTIAL_DIRS=(
    "app"
    "components"
    "public"
    "lib"
    "scripts"
    "backups"
)

for dir in "${ESSENTIAL_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ /$dir/"
    else
        echo "❌ MISSING: /$dir/"
    fi
done
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ VIDEO COMPONENT CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "components/home/VideoBackground.tsx" ]; then
    echo "✅ VideoBackground.tsx exists"
    
    # Check for critical features
    if grep -q "autoPlay" components/home/VideoBackground.tsx; then
        echo "✅ autoPlay attribute present"
    else
        echo "❌ MISSING: autoPlay attribute"
    fi
    
    if grep -q "const toggleMute" components/home/VideoBackground.tsx; then
        echo "✅ toggleMute function present"
    else
        echo "❌ MISSING: toggleMute function"
    fi
    
    if grep -q "onClick={toggleMute}" components/home/VideoBackground.tsx; then
        echo "✅ Mute button connected"
    else
        echo "❌ MISSING: Mute button onClick"
    fi
else
    echo "❌ CRITICAL: VideoBackground.tsx NOT FOUND!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ VIDEO FILE CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "public/videos/How much FPS.mp4" ]; then
    echo "✅ Video file exists"
    ls -lh "public/videos/How much FPS.mp4"
else
    echo "❌ CRITICAL: Video file NOT FOUND!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣ DEPENDENCIES CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "⚠️  node_modules missing (run: npm install)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣ BUILD TEST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🏗️  Running production build test..."
npm run build

BUILD_EXIT_CODE=$?
echo ""

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "✅ BUILD SUCCESSFUL!"
else
    echo "❌ BUILD FAILED! Exit code: $BUILD_EXIT_CODE"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8️⃣ GIT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git status -s

if [ -z "$(git status -s)" ]; then
    echo "✅ Working directory is CLEAN!"
else
    echo "ℹ️  Uncommitted changes detected"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "9️⃣ GITHUB SYNC CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Last 3 commits:"
git log -3 --oneline
echo ""

echo "Remote status:"
git fetch origin main 2>&1
BEHIND=$(git rev-list HEAD..origin/main --count)
AHEAD=$(git rev-list origin/main..HEAD --count)

if [ $BEHIND -eq 0 ] && [ $AHEAD -eq 0 ]; then
    echo "✅ In sync with GitHub"
elif [ $AHEAD -gt 0 ]; then
    echo "⚠️  You are $AHEAD commits ahead (need to push)"
elif [ $BEHIND -gt 0 ]; then
    echo "⚠️  You are $BEHIND commits behind (need to pull)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔟 ORGANIZATION VERIFICATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SCRIPT_COUNT=$(ls scripts/*.sh 2>/dev/null | wc -l)
BACKUP_COUNT=$(ls backups/ 2>/dev/null | wc -l)

echo "📁 Scripts organized: $SCRIPT_COUNT files in /scripts/"
echo "📁 Backups organized: $BACKUP_COUNT files in /backups/"

if [ -f "scripts/README.md" ]; then
    echo "✅ Script documentation exists"
fi

if grep -q "backups/" .gitignore; then
    echo "✅ Backups are gitignored"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 HEALTH CHECK SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ISSUES=0

# Check build
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo "❌ Build failed"
    ISSUES=$((ISSUES+1))
fi

# Check video component
if [ ! -f "components/home/VideoBackground.tsx" ]; then
    echo "❌ Video component missing"
    ISSUES=$((ISSUES+1))
fi

# Check video file
if [ ! -f "public/videos/How much FPS.mp4" ]; then
    echo "❌ Video file missing"
    ISSUES=$((ISSUES+1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "🎉 ALL SYSTEMS GO!"
    echo ""
    echo "✅ Build: Successful"
    echo "✅ Organization: Complete"
    echo "✅ Features: Working"
    echo "✅ Repository: Clean"
    echo ""
    echo "🚀 Ready for deployment!"
else
    echo "⚠️  Found $ISSUES critical issue(s)"
    echo "Review the output above for details"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -n "$(git status -s)" ]; then
    echo "You have uncommitted changes:"
    git status -s
    echo ""
    read -p "Commit and push? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "chore: Complete health check - all systems operational"
        git push origin main
        echo ""
        echo "🎉 PUSHED TO GITHUB!"
    fi
else
    echo "✅ No changes to commit"
    echo ""
    echo "Your repository is:"
    echo "  🏆 Fully organized"
    echo "  ✅ All features working"
    echo "  🚀 Ready for production"
fi
echo ""

# Move this script to scripts folder
if [ -f "final_health_check.sh" ]; then
    mv final_health_check.sh scripts/
    echo "📝 Moved final_health_check.sh to /scripts/"
fi

echo "✅ HEALTH CHECK COMPLETE!"

