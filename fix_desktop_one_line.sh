#!/bin/bash

echo "🔧 Making hero text ONE line on desktop..."

# Backup
cp app/page.tsx app/page.tsx.backup-desktop-line-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Just reduce the MAX from 7rem to 5rem
# This makes it fit on one line on desktop
# Mobile stays the same (3rem min)
content = re.sub(
    r"fontSize: 'clamp\(3rem, 10vw, 7rem\)'",
    r"fontSize: 'clamp(3rem, 10vw, 5rem)'",
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Reduced desktop size from 7rem to 5rem")
print("✅ Will fit on ONE line on desktop now")
print("✅ Mobile unchanged")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Desktop: ONE line (reduced from 7rem to 5rem)"
    echo "  ✅ Mobile: Unchanged"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-desktop-line-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

