#!/bin/bash

echo "🔍 Verifying mobile video setup..."

# 1. Check if video file exists
if [ -f "public/VIDEO-2025-10-31-20-16-50.mp4" ]; then
    echo "✅ Video file exists at: public/VIDEO-2025-10-31-20-16-50.mp4"
else
    echo "❌ Video file NOT found!"
    exit 1
fi

# 2. Check video element in page.tsx
echo ""
echo "📹 Checking video element in page.tsx..."
grep -A 5 "<video" app/page.tsx | head -10

echo ""
echo "📹 Checking video source tags..."
grep -A 2 "<source" app/page.tsx | head -10

echo ""
echo "🎨 Checking mobile video CSS..."
grep -A 10 "Mobile Video" app/globals.css

# 3. Let's see what the actual video setup looks like
echo ""
echo "================================"
echo "CURRENT VIDEO SETUP:"
echo "================================"

# Extract the full video element
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find video element
video_match = re.search(r'<video.*?</video>', content, re.DOTALL)
if video_match:
    print("Video element found:")
    print(video_match.group(0)[:500])  # First 500 chars
else:
    print("❌ No video element found!")

# Check for source tags
source_matches = re.findall(r'<source[^>]*>', content)
if source_matches:
    print("\nSource tags found:")
    for src in source_matches:
        print(f"  {src}")
else:
    print("\n⚠️  No source tags found")

PYTHON_EOF

