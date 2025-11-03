#!/bin/bash

echo "🔍 SCANNING REPOSITORY STRUCTURE..."
echo ""
echo "=========================================="
echo "FILES IN ROOT DIRECTORY (not in folders):"
echo "=========================================="
echo ""

# List all files in root (not folders)
echo "📄 All files in root:"
ls -lh | grep "^-" | awk '{print $9, "(" $5 ")"}'

echo ""
echo "=========================================="
echo "BREAKDOWN BY TYPE:"
echo "=========================================="
echo ""

echo "🔧 SCRIPT FILES (.sh):"
find . -maxdepth 1 -name "*.sh" -type f | wc -l | xargs echo "   Total:"
find . -maxdepth 1 -name "*.sh" -type f

echo ""
echo "📝 MARKDOWN FILES (.md):"
find . -maxdepth 1 -name "*.md" -type f | wc -l | xargs echo "   Total:"
find . -maxdepth 1 -name "*.md" -type f

echo ""
echo "📋 TEXT FILES (.txt):"
find . -maxdepth 1 -name "*.txt" -type f | wc -l | xargs echo "   Total:"
find . -maxdepth 1 -name "*.txt" -type f

echo ""
echo "💾 BACKUP FILES:"
find . -name "*.backup-*" -type f | wc -l | xargs echo "   Total:"
find . -name "*.backup-*" -type f | head -5
[ $(find . -name "*.backup-*" -type f | wc -l) -gt 5 ] && echo "   ... and more"

echo ""
echo "=========================================="
echo "EXISTING FOLDERS:"
echo "=========================================="
echo ""
ls -d */ 2>/dev/null | grep -v node_modules | grep -v .next

echo ""
echo "=========================================="
echo "FULL ROOT DIRECTORY LISTING:"
echo "=========================================="
echo ""
ls -lAh --group-directories-first | grep -v node_modules | head -40

echo ""
echo "=========================================="
echo "RECOMMENDATIONS:"
echo "=========================================="
echo ""

SCRIPT_COUNT=$(find . -maxdepth 1 -name "*.sh" -type f | wc -l)
MD_COUNT=$(find . -maxdepth 1 -name "*.md" -type f | wc -l)
BACKUP_COUNT=$(find . -name "*.backup-*" -type f | wc -l)

echo "Should create:"
[ $SCRIPT_COUNT -gt 0 ] && echo "   📁 scripts/ folder for $SCRIPT_COUNT .sh files"
[ $MD_COUNT -gt 1 ] && echo "   📁 docs/ folder for $(($MD_COUNT - 1)) .md files (keep README.md in root)"
[ $BACKUP_COUNT -gt 0 ] && echo "   📁 backup/ folder for $BACKUP_COUNT backup files"

echo ""

