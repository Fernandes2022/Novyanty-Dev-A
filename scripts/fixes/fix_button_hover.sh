#!/bin/bash

echo "🔧 Fixing button hover animations..."

# Backup
cp app/page.tsx app/page.tsx.backup-button-hover-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Increase gap from gap-6 to gap-8
content = re.sub(
    r'<div className="flex flex-col sm:flex-row gap-6">',
    r'<div className="flex flex-col sm:flex-row gap-8">',
    content
)

# 2. In Try It Live section only, reduce hover scale from 1.02 to 1.01
# Find the section and replace the scale values
# This is around line 539-560

# Find the Generate Preview button hover
lines = content.split('\n')
for i, line in enumerate(lines):
    # Look for the Try It Live buttons specifically
    if 'handleGenerate' in line:
        # Check next few lines for whileHover
        for j in range(i, min(i+5, len(lines))):
            if 'whileHover={{ scale: 1.02 }}' in lines[j]:
                lines[j] = lines[j].replace('whileHover={{ scale: 1.02 }}', 'whileHover={{ scale: 1.01 }}')
                break
    
    # Find Chaos Mode button
    if 'setChaosMode' in line:
        for j in range(i, min(i+5, len(lines))):
            if 'whileHover={{ scale: 1.02 }}' in lines[j]:
                lines[j] = lines[j].replace('whileHover={{ scale: 1.02 }}', 'whileHover={{ scale: 1.01 }}')
                break

content = '\n'.join(lines)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Increased gap: 6 → 8")
print("✅ Reduced hover scale: 1.02 → 1.01")
print("✅ Buttons won't animate close to each other")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Gap increased (gap-6 → gap-8)"
    echo "  ✅ Hover scale reduced (1.02 → 1.01)"
    echo "  ✅ More space, less movement"
    echo "  ✅ Buttons stay separate on hover"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-button-hover-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

