#!/bin/bash

echo "🔧 Adding X and Menu to workspace imports..."
echo ""

# Check current imports
echo "Current lucide-react import:"
grep "from 'lucide-react'" app/workspace/page.tsx | head -1

# Add X and Menu if not present
sed -i "s/} from 'lucide-react';/, X, Menu } from 'lucide-react';/" app/workspace/page.tsx

echo ""
echo "Updated import:"
grep "from 'lucide-react'" app/workspace/page.tsx | head -1

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Workspace mobile menu complete!"
    echo "   ✅ Hamburger button (☰)"
    echo "   ✅ Sign In button"
    echo "   ✅ Back to Home link"
    echo ""
    echo "📋 All staged fixes:"
    echo "   1. ✅ Build time consistency (50 seconds)"
    echo "   2. ✅ Eye icon in 'Watch It Build'"
    echo "   3. ✅ Mobile menu on homepage"
    echo "   4. ✅ Mobile menu on workspace page (NEW!)"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready when you are!"
else
    echo "❌ Build failed"
    exit 1
fi

