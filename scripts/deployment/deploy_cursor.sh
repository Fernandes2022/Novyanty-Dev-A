#!/bin/bash

echo "🚀 Deploying larger cursor..."
echo ""

# Stage changes
git add app/globals.css

# Commit
git commit -m "feat: Add larger cursor for desktop

- Increased cursor size: 16px → 24px (normal)
- Hover cursor: 28px (on buttons/links)
- Custom text cursor: 20x28px I-beam
- White with black outline (visible on any background)
- Desktop only (min-width: 768px)
- Mobile cursors unchanged"

# Push
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   CURSOR UPDATE DEPLOYED!"
    echo "🎉 ================================"
    echo ""
    echo "✅ Larger cursor is now live!"
    echo ""
    echo "🖱️  What changed:"
    echo "   ✅ Normal cursor: 50% larger (24px)"
    echo "   ✅ Hover cursor: 28px (buttons/links)"
    echo "   ✅ Text cursor: Custom I-beam"
    echo "   ✅ Desktop only, mobile unchanged"
    echo ""
    echo "⏱️  Live in 2-3 minutes!"
    echo ""
    echo "🔄 Hard refresh after deployment to see changes"
else
    echo "❌ Deployment failed!"
    exit 1
fi

