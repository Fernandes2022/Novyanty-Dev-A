#!/bin/bash

echo "🔄 Reverting to commit fc02ced..."

git fetch origin
git reset --hard fc02ced
git push origin main --force

echo "✅ Reverted to working deployment"

