#!/bin/bash

echo "🚀 Triggering deployment..."

echo "" >> README.md

git add .
git commit -m "chore: trigger deployment"
git push origin main

echo "✅ Pushed!"

