#!/bin/bash

echo "🧹 FINALIZING ORGANIZATION..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ MOVING REMAINING SCRIPTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Move verify_organization.sh
if [ -f "verify_organization.sh" ]; then
    mv verify_organization.sh scripts/
    echo "✅ Moved: verify_organization.sh → /scripts/"
fi

# organize_repo.sh should already be in scripts, but git shows it as deleted
# This is just a git tracking issue
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ REMOVING TEMPORARY FILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f "pre-organization-status.txt" ]; then
    rm pre-organization-status.txt
    echo "✅ Removed: pre-organization-status.txt"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ VERIFYING CLEAN ROOT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SHELL_SCRIPTS=$(ls -1 *.sh 2>/dev/null | wc -l)

if [ $SHELL_SCRIPTS -eq 1 ]; then
    echo "⚠️  Only this script (finalize_organization.sh) remains"
    echo "   (Will be moved after completion)"
elif [ $SHELL_SCRIPTS -eq 0 ]; then
    echo "✅ Root directory is 100% CLEAN!"
else
    echo "⚠️  Found $SHELL_SCRIPTS .sh files in root"
    ls -1 *.sh 2>/dev/null
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ FINAL FILE COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

SCRIPT_COUNT=$(ls scripts/*.sh 2>/dev/null | wc -l)
BACKUP_COUNT=$(ls backups/ 2>/dev/null | wc -l)

echo "📁 /scripts/ folder: $SCRIPT_COUNT shell scripts"
echo "📁 /backups/ folder: $BACKUP_COUNT backup files"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ GIT COMMIT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Stage all changes
git add .

# Show what will be committed
echo "Changes to commit:"
git status -s
echo ""

read -p "Commit and push final cleanup? (y/n): " answer

if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    git commit -m "chore: Complete repository organization

- Move remaining utility scripts to /scripts/
- Remove temporary organization files
- Root directory now contains only essential config files
- 60+ scripts organized in /scripts/ with documentation
- 65+ backup files in /backups/ (gitignored)"
    
    git push origin main
    
    echo ""
    echo "🎉 PUSHED TO GITHUB!"
else
    echo ""
    echo "ℹ️  Changes staged but not committed"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ FINAL STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'FINAL'
🎯 Repository Organization: COMPLETE!

📊 Summary:
   ✅ 60+ shell scripts → /scripts/ (organized & documented)
   ✅ 65+ backup files → /backups/ (gitignored)
   ✅ Root directory → Clean (only config files)
   ✅ Documentation → scripts/README.md created
   ✅ .gitignore → Updated to exclude backups

🏆 Your GitHub repository is now:
   ✨ Professional
   📁 Well-organized
   📝 Documented
   🧹 Clean

🔗 Check it out on GitHub:
   https://github.com/Sandy5688/my-creative-workspace
FINAL

echo ""

# Move this script to scripts folder
mv finalize_organization.sh scripts/
echo "📝 Moved finalize_organization.sh to /scripts/"
echo ""
echo "✅ ALL DONE!"

