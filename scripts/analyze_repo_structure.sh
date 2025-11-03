#!/bin/bash

echo "📁 ANALYZING REPOSITORY STRUCTURE..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ CURRENT ROOT DIRECTORY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
ls -la | grep -v "node_modules" | grep -v ".git"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ IDENTIFYING CLUTTER (Files that should be grouped)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🔍 Backup files (.backup-*):"
find . -maxdepth 1 -name "*.backup-*" -type f | wc -l
echo ""

echo "🔍 Shell scripts (.sh files):"
ls -1 *.sh 2>/dev/null | wc -l
echo "Files:"
ls -1 *.sh 2>/dev/null || echo "None found"
echo ""

echo "🔍 Log files:"
ls -1 *.log 2>/dev/null | wc -l
echo ""

echo "🔍 Temporary files:"
ls -1 *.tmp 2>/dev/null | wc -l
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ RECOMMENDED FOLDER STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'STRUCTURE'
📁 my-creative-workspace/
├── 📁 .github/              (GitHub workflows, templates)
├── 📁 app/                  (Next.js app directory) ✅
├── 📁 components/           (React components) ✅
├── 📁 lib/                  (Utilities, helpers) ✅
├── 📁 public/               (Static assets) ✅
├── 📁 styles/               (CSS files) ✅
├── 📁 scripts/              ⭐ NEW - Shell scripts, automation
│   ├── check_video_autoplay.sh
│   ├── fix_video_autoplay.sh
│   ├── final_mute_verification.sh
│   └── properly_add_autoplay.sh
├── 📁 backups/              ⭐ NEW - Backup files
│   └── VideoBackground.tsx.backup-*
├── 📁 docs/                 ⭐ NEW - Documentation (optional)
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
STRUCTURE

echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ FILES TO MOVE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "🔧 Shell scripts to move to /scripts/:"
ls -1 *.sh 2>/dev/null | sed 's/^/   - /' || echo "   None"
echo ""

echo "💾 Backup files to move to /backups/:"
find . -maxdepth 1 -name "*.backup-*" -type f | sed 's|^\./|   - |' || echo "   None"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ CHECKING .gitignore"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f .gitignore ]; then
    echo "Current .gitignore patterns:"
    cat .gitignore | grep -v "^#" | grep -v "^$"
    echo ""
    
    echo "Checking if backups are ignored:"
    if grep -q "*.backup-*" .gitignore || grep -q "backups/" .gitignore; then
        echo "   ✅ Backup files are ignored"
    else
        echo "   ⚠️  Backup files NOT ignored (should add to .gitignore)"
    fi
    echo ""
    
    echo "Checking if scripts are tracked:"
    if grep -q "*.sh" .gitignore || grep -q "scripts/" .gitignore; then
        echo "   ⚠️  Scripts are ignored (you might want to track them)"
    else
        echo "   ✅ Scripts will be tracked"
    fi
else
    echo "⚠️  No .gitignore file found!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣ COMPONENT STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d components ]; then
    echo "Current components structure:"
    tree components -L 2 2>/dev/null || find components -type f | head -20
else
    echo "⚠️  Components directory not found"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SCRIPT_COUNT=$(ls -1 *.sh 2>/dev/null | wc -l)
BACKUP_COUNT=$(find . -maxdepth 1 -name "*.backup-*" -type f | wc -l)

echo "Files to organize:"
echo "   📜 Shell scripts: $SCRIPT_COUNT"
echo "   💾 Backup files: $BACKUP_COUNT"
echo ""

if [ $SCRIPT_COUNT -gt 0 ] || [ $BACKUP_COUNT -gt 0 ]; then
    echo "⚠️  You have $((SCRIPT_COUNT + BACKUP_COUNT)) files cluttering the root directory!"
    echo ""
    echo "✨ Recommended actions:"
    echo "   1. Create /scripts/ folder for shell scripts"
    echo "   2. Create /backups/ folder for backup files"
    echo "   3. Update .gitignore to exclude backups"
    echo "   4. Move files to appropriate folders"
    echo "   5. Clean up and commit"
else
    echo "✅ Root directory is clean!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 NEXT STEP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Run: ./organize_repo.sh (I'll create this next!)"
echo ""

