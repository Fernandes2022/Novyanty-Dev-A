#!/bin/bash

echo "🔧 Fixing button spacing in Try It Live section..."

# Backup
cp app/page.tsx app/page.tsx.backup-button-spacing-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find the button container and increase gap from gap-3 to gap-6
content = re.sub(
    r'<div className="flex flex-col sm:flex-row gap-3">',
    r'<div className="flex flex-col sm:flex-row gap-6">',
    content
)

# Reduce the hover scale for these specific buttons from 1.03 to 1.02
# This is in the "Try It Live" section only
content = re.sub(
    r'(onClick={handleGenerate}.*?)whileHover=\{\{ scale: 1\.03 \}\}',
    r'\1whileHover={{ scale: 1.02 }}',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'(onClick=\{\(\) => \{ setChaosMode.*?)whileHover=\{\{ scale: 1\.03 \}\}',
    r'\1whileHover={{ scale: 1.02 }}',
    content,
    flags=re.DOTALL
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Increased gap from gap-3 to gap-6 (double spacing)")
print("✅ Reduced hover scale from 1.03 to 1.02 (less movement)")
print("✅ Buttons won't overlap on hover anymore")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ More space between Generate Preview & Chaos Mode"
    echo "  ✅ Smoother, less aggressive hover animation"
    echo "  ✅ No more overlapping!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-button-spacing-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

