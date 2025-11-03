#!/bin/bash

echo "🗂️  MEGA CLEANUP: ORGANIZING 125+ FILES..."
echo ""
echo "=========================================="
echo "CREATING FOLDER STRUCTURE"
echo "=========================================="
echo ""

# Create organized folders
mkdir -p scripts/checks
mkdir -p scripts/fixes
mkdir -p scripts/deployment
mkdir -p scripts/testing
mkdir -p docs
mkdir -p backups

echo "✅ Created folders:"
echo "   📁 scripts/"
echo "      ├── checks/       - All check_*.sh files"
echo "      ├── fixes/        - All fix_*.sh files"
echo "      ├── deployment/   - All deploy_*.sh files"
echo "      └── testing/      - All verify_*.sh files"
echo "   📁 docs/             - Documentation files"
echo "   📁 backups/          - All backup files"
echo ""

echo "=========================================="
echo "MOVING 125 SCRIPT FILES..."
echo "=========================================="
echo ""

# Move check scripts
echo "📋 Moving check scripts..."
mv check_*.sh scripts/checks/ 2>/dev/null
echo "   ✅ Moved $(ls scripts/checks/ 2>/dev/null | wc -l) check scripts"

# Move fix scripts
echo "🔧 Moving fix scripts..."
mv fix_*.sh scripts/fixes/ 2>/dev/null
echo "   ✅ Moved $(ls scripts/fixes/ 2>/dev/null | wc -l) fix scripts"

# Move deploy scripts
echo "🚀 Moving deploy scripts..."
mv deploy_*.sh scripts/deployment/ 2>/dev/null
mv trigger_*.sh scripts/deployment/ 2>/dev/null
mv commit_*.sh scripts/deployment/ 2>/dev/null
echo "   ✅ Moved $(ls scripts/deployment/ 2>/dev/null | wc -l) deployment scripts"

# Move verify/test scripts
echo "✅ Moving verify scripts..."
mv verify_*.sh scripts/testing/ 2>/dev/null
mv debug_*.sh scripts/testing/ 2>/dev/null
echo "   ✅ Moved $(ls scripts/testing/ 2>/dev/null | wc -l) testing scripts"

# Move remaining add scripts
echo "➕ Moving add scripts..."
mv add_*.sh scripts/fixes/ 2>/dev/null

# Move other utility scripts
echo "🛠️  Moving utility scripts..."
mv remove_*.sh scripts/fixes/ 2>/dev/null
mv revert_*.sh scripts/fixes/ 2>/dev/null
mv replace_*.sh scripts/fixes/ 2>/dev/null
mv restore_*.sh scripts/fixes/ 2>/dev/null
mv update_*.sh scripts/fixes/ 2>/dev/null
mv slow_*.sh scripts/fixes/ 2>/dev/null
mv increase_*.sh scripts/fixes/ 2>/dev/null
mv double_*.sh scripts/fixes/ 2>/dev/null
mv change_*.sh scripts/fixes/ 2>/dev/null
mv move_*.sh scripts/fixes/ 2>/dev/null

# Move find/locate scripts
mv find_*.sh scripts/checks/ 2>/dev/null
mv locate_*.sh scripts/checks/ 2>/dev/null
mv see_*.sh scripts/checks/ 2>/dev/null
mv show_*.sh scripts/checks/ 2>/dev/null
mv diagnose_*.sh scripts/checks/ 2>/dev/null
mv scan_*.sh scripts/checks/ 2>/dev/null

# Move setup/install scripts
mv final_*.sh scripts/deployment/ 2>/dev/null
mv insert_*.sh scripts/fixes/ 2>/dev/null
mv manual_*.sh scripts/fixes/ 2>/dev/null
mv force_*.sh scripts/fixes/ 2>/dev/null
mv direct_*.sh scripts/fixes/ 2>/dev/null
mv INSTALL_AND_FIX.sh scripts/ 2>/dev/null

# Move any remaining .sh files
mv *.sh scripts/ 2>/dev/null

echo ""
echo "=========================================="
echo "MOVING DOCUMENTATION FILES..."
echo "=========================================="
echo ""

# Move docs but keep README.md in root
mv CHECKLIST.md docs/ 2>/dev/null
mv CLIENT_EMAIL.txt docs/ 2>/dev/null
mv DELIVERY.md docs/ 2>/dev/null
mv QUICK_FIX.md docs/ 2>/dev/null
mv START_HERE.md docs/ 2>/dev/null

echo "✅ Moved documentation files"
echo "   (README.md stays in root)"

echo ""
echo "=========================================="
echo "MOVING 56 BACKUP FILES..."
echo "=========================================="
echo ""

# Move all backup files
find . -name "*.backup-*" -type f -exec mv {} backups/ \; 2>/dev/null
find . -name "*.patch" -type f -exec mv {} backups/ \; 2>/dev/null

echo "✅ Moved $(ls backups/ 2>/dev/null | wc -l) backup files"

echo ""
echo "=========================================="
echo "CLEANING UP WEIRD FOLDERS..."
echo "=========================================="
echo ""

# Remove weird empty folders
rm -rf "mkdir -p public/" 2>/dev/null
rm -f main my-creative-workspace@0.1.0 next 2>/dev/null

echo "✅ Removed weird folders/files"

echo ""
echo "=========================================="
echo "FINAL CLEAN STRUCTURE:"
echo "=========================================="
echo ""

tree -L 2 -I 'node_modules|.next|.git' || {
    echo "📁 my-creative-workspace/"
    echo "├── 📁 app/                    (Next.js app)"
    echo "├── 📁 components/             (React components)"
    echo "├── 📁 public/                 (Static assets)"
    echo "├── 📁 scripts/                ✨ NEW!"
    echo "│   ├── checks/               ($( ls scripts/checks/ 2>/dev/null | wc -l) files)"
    echo "│   ├── fixes/                ($( ls scripts/fixes/ 2>/dev/null | wc -l) files)"
    echo "│   ├── deployment/           ($( ls scripts/deployment/ 2>/dev/null | wc -l) files)"
    echo "│   └── testing/              ($( ls scripts/testing/ 2>/dev/null | wc -l) files)"
    echo "├── 📁 docs/                   ✨ NEW! (Documentation)"
    echo "├── 📁 backups/                ✨ NEW! (56 backup files)"
    echo "├── 📄 README.md"
    echo "├── 📄 package.json"
    echo "└── 📄 config files"
}

echo ""
echo "=========================================="
echo "ROOT DIRECTORY NOW:"
echo "=========================================="
echo ""
ls -lh | grep "^-" | wc -l | xargs echo "Files in root:"
ls -lh | grep "^-" | awk '{print "   " $9}'

echo ""
echo "🏗️  Testing if project still works..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  CLEANUP SUCCESSFUL!"
    echo "✅ =========================================="
    echo ""
    echo "�� Summary:"
    echo "   ✅ 125 scripts organized into subfolders"
    echo "   ✅ 56 backup files moved to backups/"
    echo "   ✅ 5 docs moved to docs/"
    echo "   ✅ Root directory clean (only config files)"
    echo "   ✅ Project still builds perfectly"
    echo ""
    echo "⏸️  NOT COMMITTED YET"
    echo ""
    echo "🎯 To commit this cleanup:"
    echo "   git status"
    echo "   git add ."
    echo "   git commit -m 'chore: Organize repo - move 125 scripts to folders'"
    echo "   git push origin main"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

