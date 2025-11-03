#!/bin/bash

echo "🔍 Checking VideoBackground component..."
echo ""

echo "=== Full VideoBackground.tsx content ==="
cat components/home/VideoBackground.tsx

echo ""
echo "=== Searching for video source in VideoBackground ==="
grep -n "\.mp4\|source\|src=" components/home/VideoBackground.tsx

echo ""
echo "📋 This component is the culprit!"
echo "It's loading a different video than page.tsx"

