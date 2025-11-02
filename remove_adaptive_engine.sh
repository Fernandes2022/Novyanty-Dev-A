#!/bin/bash

echo "🔧 Removing Adaptive Engine from navigation..."

# Backup
cp app/page.tsx app/page.tsx.backup-remove-adaptive-$(date +%Y%m%d-%H%M%S)

# Remove the Adaptive Engine navigation item
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Remove the Adaptive Engine div block (lines around 235-242)
# This removes the entire motion.div containing Adaptive Engine
content = re.sub(
    r'<motion\.div\s+className="inline-flex items-center gap-1\.5 px-3 py-1\.5 rounded-full border-2 border-purple-500/70[^"]*"[^>]*>.*?<Sparkles className="h-4 w-4 text-purple-400"\s*/>\s*<span className="text-sm lg:text-base font-bold text-white">Adaptive Engine</span>\s*</motion\.div>',
    '',
    content,
    flags=re.DOTALL
)

# Also reduce the gap between navigation items from gap-4 lg:gap-6 to gap-3
content = re.sub(
    r'(className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-6")',
    r'className="hidden md:flex flex-1 items-center justify-end gap-3"',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Adaptive Engine removed from navigation")
print("✅ Navigation spacing tightened")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Removed: Adaptive Engine"
    echo "  ✅ Tightened spacing between FAQ, About, Get Started"
    echo "  ✅ All links now grouped on right side"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Remove Adaptive Engine from navigation

- Removed Adaptive Engine badge from nav
- FAQ, About, Get Started now grouped closer together
- Aligned all navigation links to the right
- Cleaner, simpler navigation bar"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo "🌐 Live in 2-3 minutes!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-remove-adaptive-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

