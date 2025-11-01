#!/bin/bash

echo "🚀 Triggering deployment..."

echo "# Trigger deploy" >> README.md

git add .
git commit -m "chore: trigger vercel deployment"
git push origin main

echo "✅ Pushed - Vercel should deploy now"

