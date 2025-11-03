#!/bin/bash

echo "🔧 Slowing down testimonial carousel..."

# Backup
cp components/home/VideoTestimonials.tsx components/home/VideoTestimonials.tsx.backup-speed-$(date +%Y%m%d-%H%M%S)

# Change duration from 25 to 45 (almost 2x slower)
python3 << 'PYTHON_EOF'
import re

with open('components/home/VideoTestimonials.tsx', 'r') as f:
    content = f.read()

# Replace duration: 25 with duration: 45
content = re.sub(
    r'duration: 25,',
    r'duration: 45,',
    content
)

with open('components/home/VideoTestimonials.tsx', 'w') as f:
    f.write(content)

print("✅ Changed duration from 25 to 45 seconds")
print("✅ Testimonials now scroll ~80% slower")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Testimonial speed reduced from 25s to 45s"
    echo "  ✅ Much smoother and easier to read"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
    echo ""
    echo "💡 If still too fast, I can make it even slower (60s or more)"
else
    echo "❌ Build failed"
    cp components/home/VideoTestimonials.tsx.backup-speed-$(date +%Y%m%d-%H%M%S) components/home/VideoTestimonials.tsx
    exit 1
fi

