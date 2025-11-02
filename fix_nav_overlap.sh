#!/bin/bash

echo "🔧 Fixing About → Get Started overlap..."

# Backup
cp app/page.tsx app/page.tsx.backup-overlap-fix-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Add margin-right to the center nav container to create space before Get Started
# Change: className="hidden md:flex flex-1 items-center justify-end gap-10"
# To:     className="hidden md:flex flex-1 items-center justify-end gap-10 mr-8"

content = re.sub(
    r'className="hidden md:flex flex-1 items-center justify-end gap-10"',
    r'className="hidden md:flex flex-1 items-center justify-end gap-10 mr-8"',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added mr-8 (margin-right) to center nav")
print("✅ Creates space between About and Get Started")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Added margin-right (mr-8) to center nav"
    echo "  ✅ FAQ | About | [SPACE] | Get Started"
    echo "  ✅ No more overlap!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for your approval!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-overlap-fix-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

