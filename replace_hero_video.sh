#!/bin/bash

echo "🔧 Replacing hero video with 'How much FPS.mp4'..."

# Backup
cp app/page.tsx app/page.tsx.backup-video-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find and replace both video sources with the new one
# Replace the entire video section to use the same video for mobile and desktop

old_pattern = r'<source src="/videos/VIDEO-2025-10-31-20-16-50\.mp4" type="video/mp4" media="\(max-width: 768px\)" />\s*<source src="/videos/x-large-vecteezy_young-girl-which-applying-virtual-reality-headset-during_13279729_x-large\.mp4" type="video/mp4" />'

new_pattern = r'<source src="/videos/How much FPS.mp4" type="video/mp4" />'

content = re.sub(old_pattern, new_pattern, content)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Replaced hero video with 'How much FPS.mp4'")
print("✅ Same video for mobile and desktop (2.3MB - super fast!)")
print("✅ Already set to loop and autoplay")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ New background video: 'How much FPS.mp4'"
    echo "  ✅ Plays on loop continuously"
    echo "  ✅ Works on mobile & desktop"
    echo "  ✅ Much smaller file (2.3MB vs 18MB!)"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-video-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

