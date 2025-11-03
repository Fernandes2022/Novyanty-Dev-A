#!/bin/bash

echo "🔍 Checking for the new video 'how much fps'..."
echo ""

echo "=== All videos in public/videos directory ==="
ls -lh public/videos/ 2>/dev/null || echo "No public/videos directory found"

echo ""
echo "=== Searching for 'how much fps' or 'fps' videos ==="
find public -name "*fps*" -o -name "*FPS*" 2>/dev/null

echo ""
echo "=== All video files in public ==="
find public -name "*.mp4" -o -name "*.webm" 2>/dev/null

echo ""
echo "=== Current hero video in page.tsx ==="
grep -n "videos/" app/page.tsx | head -10

echo ""
echo "📋 Looking for:"
echo "  - The new 'how much fps' video file"
echo "  - Current hero video source"
echo "  - File size and format"

