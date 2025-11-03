#!/bin/bash

echo "🔍 Checking deployment status..."
echo ""

echo "1. Checking latest commit..."
git log --oneline -1

echo ""
echo "2. Checking remote..."
git remote -v

echo ""
echo "3. Let's update the remote to the new location..."
git remote set-url origin https://github.com/Sandy5688/my-creative-workspace.git

echo ""
echo "4. Verifying remote updated..."
git remote -v

echo ""
echo "5. Pushing again to ensure Vercel catches it..."
git push origin main

echo ""
echo "✅ If Vercel is connected, it should deploy now!"
echo ""
echo "🔗 Check deployment at:"
echo "   https://vercel.com/dashboard"
echo ""

