#!/bin/bash

echo "🗂️  ORGANIZING GITHUB REPOSITORY..."
echo ""
echo "Current mess: 125+ .sh files in root"
echo "Target: Clean professional structure"
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
mkdir -p scripts/utils
mkdir -p docs
mkdir -p backups

echo "✅ Folders created"
echo ""
echo "=========================================="
echo "MOVING FILES BY CATEGORY"
echo "=========================================="
echo ""

# 1. CHECK SCRIPTS (all check_*.sh)
echo "📋 Moving check scripts..."
mv check_*.sh scripts/checks/ 2>/dev/null
mv find_*.sh scripts/checks/ 2>/dev/null
mv locate_*.sh scripts/checks/ 2>/dev/null
mv see_*.sh scripts/checks/ 2>/dev/null
mv show_*.sh scripts/checks/ 2>/dev/null
mv diagnose_*.sh scripts/checks/ 2>/dev/null
mv scan_*.sh scripts/checks/ 2>/dev/null
CHECK_COUNT=$(ls scripts/checks/ 2>/dev/null | wc -l)
echo "   ✅ $CHECK_COUNT check scripts moved"

# 2. FIX SCRIPTS (all fix_*.sh)
echo "🔧 Moving fix scripts..."
mv fix_*.sh scripts/fixes/ 2>/dev/null
mv add_*.sh scripts/fixes/ 2>/dev/null
mv remove_*.sh scripts/fixes/ 2>/dev/null
mv replace_*.sh scripts/fixes/ 2>/dev/null
mv restore_*.sh scripts/fixes/ 2>/dev/null
mv manual_*.sh scripts/fixes/ 2>/dev/null
mv force_*.sh scripts/fixes/ 2>/dev/null
mv direct_*.sh scripts/fixes/ 2>/dev/null
mv insert_*.sh scripts/fixes/ 2>/dev/null
FIX_COUNT=$(ls scripts/fixes/ 2>/dev/null | wc -l)
echo "   ✅ $FIX_COUNT fix scripts moved"

# 3. DEPLOYMENT SCRIPTS
echo "🚀 Moving deployment scripts..."
mv deploy_*.sh scripts/deployment/ 2>/dev/null
mv trigger_*.sh scripts/deployment/ 2>/dev/null
mv commit_*.sh scripts/deployment/ 2>/dev/null
mv final_*.sh scripts/deployment/ 2>/dev/null
DEPLOY_COUNT=$(ls scripts/deployment/ 2>/dev/null | wc -l)
echo "   ✅ $DEPLOY_COUNT deployment scripts moved"

# 4. TESTING/VERIFICATION SCRIPTS
echo "✅ Moving testing scripts..."
mv verify_*.sh scripts/testing/ 2>/dev/null
mv debug_*.sh scripts/testing/ 2>/dev/null
TEST_COUNT=$(ls scripts/testing/ 2>/dev/null | wc -l)
echo "   ✅ $TEST_COUNT testing scripts moved"

# 5. UTILITY SCRIPTS
echo "🛠️  Moving utility scripts..."
mv update_*.sh scripts/utils/ 2>/dev/null
mv change_*.sh scripts/utils/ 2>/dev/null
mv increase_*.sh scripts/utils/ 2>/dev/null
mv double_*.sh scripts/utils/ 2>/dev/null
mv slow_*.sh scripts/utils/ 2>/dev/null
mv move_*.sh scripts/utils/ 2>/dev/null
mv revert_*.sh scripts/utils/ 2>/dev/null
mv INSTALL_AND_FIX.sh scripts/ 2>/dev/null
UTIL_COUNT=$(ls scripts/utils/ 2>/dev/null | wc -l)
echo "   ✅ $UTIL_COUNT utility scripts moved"

# 6. DOCUMENTATION FILES
echo "📄 Moving documentation..."
mv CHECKLIST.md docs/ 2>/dev/null
mv CLIENT_EMAIL.txt docs/ 2>/dev/null
mv DELIVERY.md docs/ 2>/dev/null
mv QUICK_FIX.md docs/ 2>/dev/null
mv START_HERE.md docs/ 2>/dev/null
DOC_COUNT=$(ls docs/ 2>/dev/null | wc -l)
echo "   ✅ $DOC_COUNT docs moved (README.md stays in root)"

# 7. BACKUP FILES
echo "💾 Moving backup files..."
find app -name "*.backup-*" -type f -exec mv {} backups/ \; 2>/dev/null
find components -name "*.backup-*" -type f -exec mv {} backups/ \; 2>/dev/null
mv *.patch backups/ 2>/dev/null
BACKUP_COUNT=$(ls backups/ 2>/dev/null | wc -l)
echo "   ✅ $BACKUP_COUNT backup files moved"

# 8. CLEAN UP WEIRD FILES
echo "🧹 Cleaning up..."
rm -f main next my-creative-workspace@0.1.0 2>/dev/null
rm -rf "mkdir -p public/" 2>/dev/null
echo "   ✅ Removed weird files"

# 9. MOVE ZIP FILE
mv creative-workspace-delivery.zip backups/ 2>/dev/null

echo ""
echo "=========================================="
echo "FINAL CLEAN STRUCTURE"
echo "=========================================="
echo ""
echo "my-creative-workspace/"
echo "├── 📁 app/              (Next.js app)"
echo "├── 📁 components/       (React components)"
echo "├── 📁 public/           (Static assets)"
echo "├── 📁 scripts/          ✨ NEW!"
echo "│   ├── checks/         ($CHECK_COUNT files)"
echo "│   ├── fixes/          ($FIX_COUNT files)"
echo "│   ├── deployment/     ($DEPLOY_COUNT files)"
echo "│   ├── testing/        ($TEST_COUNT files)"
echo "│   └── utils/          ($UTIL_COUNT files)"
echo "├── 📁 docs/             ✨ NEW! ($DOC_COUNT files)"
echo "├── 📁 backups/          ✨ NEW! ($BACKUP_COUNT files)"
echo "├── 📄 README.md"
echo "├── 📄 package.json"
echo "└── ⚙️  config files"
echo ""

echo "=========================================="
echo "VERIFYING CLEAN ROOT"
echo "=========================================="
echo ""
ROOT_FILES=$(ls -1 | grep -v "^[a-z]*/" | grep -E "\.sh$|\.md$|\.txt$" | wc -l)
echo "Remaining .sh/.md/.txt files in root: $ROOT_FILES"

if [ $ROOT_FILES -eq 1 ]; then
    echo "✅ Perfect! Only README.md remains"
else
    echo "📋 Remaining files:"
    ls -1 | grep -v "^[a-z]*/" | grep -E "\.sh$|\.md$|\.txt$"
fi

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  ORGANIZATION COMPLETE!"
    echo "✅ =========================================="
    echo ""
    echo "📊 Summary:"
    echo "   ✅ $CHECK_COUNT check scripts → scripts/checks/"
    echo "   ✅ $FIX_COUNT fix scripts → scripts/fixes/"
    echo "   ✅ $DEPLOY_COUNT deployment scripts → scripts/deployment/"
    echo "   ✅ $TEST_COUNT testing scripts → scripts/testing/"
    echo "   ✅ $UTIL_COUNT utility scripts → scripts/utils/"
    echo "   ✅ $DOC_COUNT docs → docs/"
    echo "   ✅ $BACKUP_COUNT backups → backups/"
    echo "   ✅ Root directory: CLEAN ✨"
    echo ""
    echo "🎯 Ready to commit!"
    echo ""
    read -p "Commit and push now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        echo ""
        echo "Committing changes..."
        git add .
        git commit -m "chore: Organize repository into professional folder structure

✨ Organization:
- Moved 125+ scripts into categorized folders
- Created scripts/ with subfolders: checks, fixes, deployment, testing, utils
- Moved documentation to docs/
- Moved backups to backups/
- Cleaned root directory (only essential files remain)

📁 New Structure:
- scripts/checks/ - All diagnostic scripts
- scripts/fixes/ - All fix/add/modify scripts  
- scripts/deployment/ - All deploy/commit/trigger scripts
- scripts/testing/ - All verify/debug scripts
- scripts/utils/ - All utility scripts
- docs/ - All documentation
- backups/ - All backup files

🎯 Result: Clean, professional, maintainable repository"
        
        echo ""
        echo "Pushing to GitHub..."
        git push origin main
        
        echo ""
        echo "🎉 =========================================="
        echo "🎉  DEPLOYED TO GITHUB!"
        echo "🎉 =========================================="
        echo ""
        echo "✅ Your repo now looks professional!"
        echo "🔗 Check it out on GitHub!"
    else
        echo ""
        echo "No problem! When ready, run:"
        echo "  git add ."
        echo "  git commit -m 'chore: Organize repository structure'"
        echo "  git push origin main"
    fi
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

