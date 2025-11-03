#!/bin/bash

echo "📝 Doubling text sizes for all sections..."

# Backup
cp app/page.tsx app/page.tsx.backup-double-text-$(date +%Y%m%d-%H%M%S)

# Replace with doubled sizes
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace text-section-title with much larger size (double)
# From text-3xl/4xl → text-5xl/6xl
content = re.sub(
    r'text-section-title',
    'text-5xl md:text-6xl',
    content
)

# Replace text-body with larger size (double)
# From text-base/lg → text-xl md:text-2xl
content = re.sub(
    r'text-body',
    'text-xl md:text-2xl',
    content
)

# For the "How It Works" video overlay heading (currently text-xl md:text-2xl)
# Double it to text-2xl md:text-4xl
content = re.sub(
    r'<h3 className="text-xl md:text-2xl font-bold text-white">How It Works</h3>',
    '<h3 className="text-2xl md:text-4xl font-bold text-white">How It Works</h3>',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Replaced text-section-title with text-5xl md:text-6xl")
print("✅ Replaced text-body with text-xl md:text-2xl")
print("✅ Updated 'How It Works' heading to text-2xl md:text-4xl")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes Made:"
    echo "  1. How It Works - heading 2x larger"
    echo "  2. Why We're Different - 2x larger"
    echo "  3. Try It Live - 2x larger"
    echo "  4. Trusted by Creators - 2x larger"
    echo "  5. Who It's For - 2x larger"
    echo "  6. Why Choose Creative Workspace - 2x larger"
    echo "  7. Go Live & Unlock Premium - 2x larger"
    echo ""
    echo "  ALL subtitles also 2x larger"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for your review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-double-text-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

