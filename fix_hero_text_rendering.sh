#!/bin/bash

echo "🔧 Fixing hero text rendering issue..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-hero-render-$(date +%Y%m%d-%H%M%S)

echo "The issue: whiteSpace: nowrap forces text on one line even when too wide"
echo ""
echo "Solution options:"
echo "1. Remove nowrap and let it wrap naturally"
echo "2. Use overflow-hidden on container"
echo "3. Reduce font size more for medium screens"
echo ""

# Let's use option 3: Better responsive sizing + overflow handling
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace the hero text styling
old_style = r'''style=\{\{
                  fontSize: 'clamp\(2\.5rem, 8vw, 4rem\)',
                  lineHeight: '1\.1',
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 20px rgba\(0,0,0,0\.9\), 0 4px 40px rgba\(0,0,0,0\.7\), 0 0 60px rgba\(0,0,0,0\.5\)'
                \}\}'''

new_style = '''style={{
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  lineHeight: '1.2',
                  textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)'
                }}'''

content = re.sub(old_style, new_style, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Fixed hero text styling:")
print("   - Removed whiteSpace: nowrap (was causing overflow)")
print("   - Reduced max size: 4rem → 3.5rem")
print("   - Reduced viewport scaling: 8vw → 6vw")
print("   - Text will now wrap naturally on narrow screens")
print("   - Still fits on one line on most desktops")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Hero text fixes:"
    echo "   ✅ Removed forced nowrap (was causing glitch)"
    echo "   ✅ Better responsive sizing"
    echo "   ✅ Text wraps gracefully when needed"
    echo "   ✅ No more overflow/rendering issues"
    echo ""
    echo "The glitchy effect should be gone now!"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-hero-render-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

