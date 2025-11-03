#!/bin/bash

echo "🚀 Triggering Vercel deployment..."

# Make a small change to trigger deployment
echo "" >> README.md

git add .
git commit -m "chore: trigger deployment"
git push origin main

echo "✅ Push complete - Vercel should deploy now"

