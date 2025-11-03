#!/bin/bash

echo "🗂️  Organizing new scripts..."
echo ""

# Move all scripts to scripts folder
mv *_loved*.sh scripts/ 2>/dev/null
mv find_footer_section.sh scripts/ 2>/dev/null
mv view_footer_context.sh scripts/ 2>/dev/null

# Move backups to backups folder
mv app/page.tsx.backup-loved-* backups/ 2>/dev/null

echo "✅ Scripts moved to scripts/"
echo "✅ Backups moved to backups/"
echo ""

git add .
git commit -m "chore: Organize scripts and backups from Loved badge work"
git push origin main

echo ""
echo "🎉 ALL CLEAN AND COMMITTED!"

