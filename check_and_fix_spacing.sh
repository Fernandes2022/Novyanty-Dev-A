#!/bin/bash

echo "🔍 Checking current navigation structure..."
echo ""
echo "=== CURRENT NAVIGATION (lines 230-260) ==="
sed -n '230,260p' app/page.tsx | grep -E "(FAQ|About|Get Started|Link href|className)" | head -20

echo ""
echo "🔧 Adding proper spacing between navigation items..."

# Backup
cp app/page.tsx app/page.tsx.backup-spacing-$(date +%Y%m%d-%H%M%S)

# Fix spacing between nav items
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find the navigation section and add proper spacing
# Change gap-3 to gap-6 for better spacing between links
content = re.sub(
    r'className="hidden md:flex flex-1 items-center justify-end gap-3"',
    r'className="hidden md:flex flex-1 items-center justify-end gap-6"',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Spacing increased between navigation items")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Increased spacing between FAQ, About, Get Started"
    echo "  ✅ Navigation items now have breathing room"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Add proper spacing between navigation links

- Increased gap between FAQ, About, and Get Started
- Better visual separation
- Improved navigation readability"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo "🌐 Live in 2-3 minutes!"
    echo ""
    echo "✅ Navigation now properly spaced!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-spacing-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

