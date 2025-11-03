#!/bin/bash

echo "🎬 Setting up different videos for mobile and desktop..."

# Backup
cp app/page.tsx app/page.tsx.backup-final-videos-$(date +%Y%m%d-%H%M%S)

echo "📹 Updating video sources..."

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find the video element and update with correct sources
old_video_pattern = r'<video[^>]*>.*?</video>'

new_video = '''<video autoPlay loop muted playsInline className="w-full h-full object-cover hero-video-background">
                <source src="/VIDEO-2025-10-31-20-16-50.mp4" type="video/mp4" media="(max-width: 768px)" />
                <source src="/videos/x-large-vecteezy_young-girl-which-applying-virtual-reality-headset-during_13279729_x-large.mp4" type="video/mp4" />
              </video>'''

content = re.sub(old_video_pattern, new_video, content, flags=re.DOTALL, count=1)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Video sources updated!")
print("  📱 Mobile (≤768px): VIDEO-2025-10-31-20-16-50.mp4")
print("  ��️  Desktop (>768px): x-large-vecteezy_young-girl-which-applying-virtual-reality-headset-during_13279729_x-large.mp4")

PYTHON_EOF

# Verify the changes
echo ""
echo "📹 New video element:"
grep -A 3 "<video" app/page.tsx | head -6

# Test build
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Use different videos for mobile and desktop

📱 Mobile (max-width: 768px):
   - VIDEO-2025-10-31-20-16-50.mp4
   - Left-aligned, fills viewport

🖥️  Desktop (min-width: 769px):
   - x-large-vecteezy_young-girl-which-applying-virtual-reality-headset-during_13279729_x-large.mp4
   - Standard centered display

Both videos loop continuously with autoplay"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo ""
    echo "📋 Final video setup:"
    echo "  📱 Mobile: VIDEO-2025-10-31-20-16-50.mp4 (left-aligned)"
    echo "  🖥️  Desktop: x-large-vecteezy...mp4 (centered)"
    echo ""
    echo "🌐 Live in 2-3 minutes!"
    echo ""
    echo "🎯 Test it:"
    echo "  1. Desktop view → See VR girl video"
    echo "  2. Mobile view (F12 → Ctrl+Shift+M) → See your uploaded video"
else
    echo "❌ Build failed!"
    cp app/page.tsx.backup-final-videos-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

