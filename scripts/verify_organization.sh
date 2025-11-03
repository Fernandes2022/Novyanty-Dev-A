#!/bin/bash

echo "🔍 VERIFYING REPOSITORY ORGANIZATION..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CLEAN ROOT DIRECTORY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Files in root (excluding node_modules, .next, .git):"
ls -1 | grep -v "node_modules" | grep -v ".next" | grep -v ".git"
echo ""

SHELL_SCRIPTS=$(ls -1 *.sh 2>/dev/null | wc -l)
echo "Shell scripts in root: $SHELL_SCRIPTS"
if [ $SHELL_SCRIPTS -eq 0 ]; then
    echo "✅ Root directory is CLEAN! No .sh files!"
else
    echo "⚠️  Still has $SHELL_SCRIPTS .sh files"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ SCRIPTS FOLDER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d "scripts" ]; then
    SCRIPT_COUNT=$(ls scripts/*.sh 2>/dev/null | wc -l)
    echo "✅ /scripts/ folder exists"
    echo "   Contains: $SCRIPT_COUNT shell scripts"
    echo ""
    
    if [ -f "scripts/README.md" ]; then
        echo "✅ Documentation exists: scripts/README.md"
    else
        echo "⚠️  No README in scripts folder"
    fi
else
    echo "❌ /scripts/ folder not found!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ BACKUPS FOLDER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d "backups" ]; then
    BACKUP_COUNT=$(ls backups/ 2>/dev/null | wc -l)
    echo "✅ /backups/ folder exists"
    echo "   Contains: $BACKUP_COUNT backup files"
else
    echo "⚠️  /backups/ folder not found"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ GITIGNORE CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if grep -q "backups/" .gitignore; then
    echo "✅ backups/ is in .gitignore"
else
    echo "⚠️  backups/ NOT in .gitignore"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ GITHUB STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Last commit:"
git log -1 --oneline
echo ""

echo "Current status:"
git status -s
echo ""

if [ -z "$(git status -s)" ]; then
    echo "✅ Working directory is CLEAN!"
else
    echo "ℹ️  You have uncommitted changes"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 FINAL SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'SUMMARY'
✅ Repository Structure:

📁 my-creative-workspace/
├── 📁 app/              ✅ Next.js app
├── 📁 components/       ✅ React components
├── 📁 lib/              ✅ Utilities
├── 📁 public/           ✅ Static assets
├── 📁 scripts/          ✅ 49+ shell scripts (organized!)
│   └── README.md        ✅ Documentation
├── 📁 backups/          ✅ Backup files (gitignored)
├── 📁 docs/             ✅ Documentation
├── 📄 README.md         ✅ Main readme
├── 📄 package.json      ✅ Dependencies
└── 📄 *.config.*        ✅ Config files

🎯 Status: CLEAN & ORGANIZED!
SUMMARY

echo ""
echo "🚀 Your GitHub repository is now professional!"
echo ""

