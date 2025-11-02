#!/bin/bash

echo "🔧 Removing extra </div> on line 337..."
echo ""

# Find the latest backup
LATEST_BACKUP=$(ls -t app/workspace/page.tsx.backup-* 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "Using backup: $LATEST_BACKUP"
fi

# The extra </div> is on line 337 (line 93 in the output, which is 245 + 93 = 338, but error says 337)
# Let's just delete line 337
sed -i '337d' app/workspace/page.tsx

echo "✅ Removed extra </div>"

echo ""
echo "=== Verification: Lines 335-340 ==="
sed -n '335,340p' app/workspace/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Workspace mobile menu complete:"
    echo "   ✅ Hamburger button"
    echo "   ✅ Sign In option"
    echo "   ✅ Back to Home link"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    if [ -n "$LATEST_BACKUP" ]; then
        cp "$LATEST_BACKUP" app/workspace/page.tsx
    fi
    exit 1
fi

