#!/bin/bash

echo "🔍 Checking if video was deployed..."
echo ""

echo "=== Checking git status ==="
git status

echo ""
echo "=== Checking last commit ==="
git log --oneline -1

echo ""
echo "=== Checking if video change is in last commit ==="
git show HEAD | grep -i "fps\|video" | head -10

echo ""
echo "=== Current video in local code ==="
grep "videos/" app/page.tsx | head -5

echo ""
echo "📋 Analysis:"
echo "  - If video is in commit: Deployment worked, browser cache issue"
echo "  - If video NOT in commit: Need to commit and push again"

