#!/bin/bash

echo "🔧 Adding hover color effects to all pricing buttons..."

# Backup
cp app/page.tsx app/page.tsx.backup-hover-colors-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Add hover effects to Basic button (blue gets lighter)
content = re.sub(
    r'className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"',
    r'className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer"',
    content
)

# Add hover effects to Pro button (purple gets lighter)
content = re.sub(
    r'className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"',
    r'className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer"',
    content
)

# Add hover effects to Premium button (yellow gets lighter)
content = re.sub(
    r'className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"',
    r'className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 py-3 rounded-xl font-semibold hover:scale-105 transition-all cursor-pointer"',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Basic: Blue → Lighter blue on hover")
print("✅ Pro: Purple → Lighter purple on hover")
print("✅ Premium: Yellow → Lighter yellow on hover")
print("✅ All buttons animate and brighten on hover!")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 All pricing buttons now have hover effects:"
    echo "  💙 Basic: Blue → Lighter blue (hover)"
    echo "  💜 Pro: Purple → Lighter purple (hover)"
    echo "  💛 Premium: Yellow → Lighter yellow (hover)"
    echo "  ✅ Scale animation + color change on hover!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-hover-colors-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

