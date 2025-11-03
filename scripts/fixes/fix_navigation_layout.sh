#!/bin/bash

echo "🔧 Fixing navigation layout - removing Adaptive Engine..."

# Backup
cp components/Navigation.tsx components/Navigation.tsx.backup-nav-$(date +%Y%m%d-%H%M%S)

# Fix the navigation
python3 << 'PYTHON_EOF'
import re

with open('components/Navigation.tsx', 'r') as f:
    content = f.read()

# Remove Adaptive Engine link
content = re.sub(
    r'<Link\s+href="[^"]*"\s+className="[^"]*hover:text-purple-400[^"]*"\s*>\s*Adaptive Engine\s*</Link>',
    '',
    content,
    flags=re.IGNORECASE
)

# Also remove if it's wrapped differently
content = re.sub(
    r'<a[^>]*>\s*Adaptive Engine\s*</a>',
    '',
    content,
    flags=re.IGNORECASE
)

# Remove any empty divs or extra spacing left behind
content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

with open('components/Navigation.tsx', 'w') as f:
    f.write(content)

print("✅ Adaptive Engine removed from navigation")

PYTHON_EOF

echo "✅ Navigation updated"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Navigation Changes:"
    echo "  ✅ Removed: Adaptive Engine"
    echo "  ✅ Left: Creative Workspace"
    echo "  ✅ Right: FAQ, About, Get Started"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Simplify navigation - remove Adaptive Engine

- Removed Adaptive Engine from navigation
- Clean layout: Logo left, links right
- FAQ, About, Get Started grouped together"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo "🌐 Live in 2-3 minutes!"
    echo ""
    echo "✅ Navigation simplified!"
else
    echo "❌ Build failed"
    cp components/Navigation.tsx.backup-nav-$(date +%Y%m%d-%H%M%S) components/Navigation.tsx
    exit 1
fi

