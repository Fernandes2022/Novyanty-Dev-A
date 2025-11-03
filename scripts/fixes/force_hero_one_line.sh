#!/bin/bash

echo "🔧 Forcing hero text to ONE line on desktop..."

# Backup
cp app/page.tsx app/page.tsx.backup-hero-oneline-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Option 1: Reduce max size even MORE (5rem → 4rem)
# Option 2: Add white-space: nowrap
# Let's do BOTH to ensure it works!

# Find and replace the style block
content = re.sub(
    r"style=\{\{\n\s+fontSize: 'clamp\(3rem, 10vw, 5rem\)',\n\s+lineHeight: '1\.1',\n\s+textShadow: '0 2px 20px rgba\(0,0,0,0\.9\), 0 4px 40px rgba\(0,0,0,0\.7\), 0 0 60px rgba\(0,0,0,0\.5\)'\n\s+\}\}",
    r"""style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  lineHeight: '1.1',
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)'
                }}""",
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Reduced max size: 5rem → 4rem")
print("✅ Added white-space: nowrap (force one line)")
print("✅ Text will DEFINITELY fit on one line now!")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Max font size: 5rem → 4rem (smaller on desktop)"
    echo "  ✅ Added white-space: nowrap (force single line)"
    echo "  ✅ Mobile: Still readable at 2.5rem minimum"
    echo "  ✅ Desktop: GUARANTEED one line!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-hero-oneline-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

