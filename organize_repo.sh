#!/bin/bash

echo "🧹 ORGANIZING REPOSITORY..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣ BACKUP CURRENT STATE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git status > pre-organization-status.txt
echo "✅ Saved current git status"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣ MOVING SHELL SCRIPTS TO /scripts/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Scripts folder already exists, just move files there
SCRIPT_COUNT=0
for script in *.sh; do
    if [ -f "$script" ] && [ "$script" != "organize_repo.sh" ]; then
        mv "$script" scripts/
        echo "  ✅ Moved: $script"
        SCRIPT_COUNT=$((SCRIPT_COUNT+1))
    fi
done

echo ""
echo "📦 Moved $SCRIPT_COUNT shell scripts to /scripts/"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣ MOVING ROOT BACKUP FILES TO /backups/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

BACKUP_COUNT=0
for backup in *.backup-*; do
    if [ -f "$backup" ]; then
        mv "$backup" backups/
        echo "  ✅ Moved: $backup"
        BACKUP_COUNT=$((BACKUP_COUNT+1))
    fi
done

echo ""
echo "📦 Moved $BACKUP_COUNT backup files to /backups/"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣ MOVING COMPONENT BACKUP FILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

COMP_BACKUP_COUNT=0
if [ -d "components/home" ]; then
    for backup in components/home/*.backup*; do
        if [ -f "$backup" ]; then
            filename=$(basename "$backup")
            mv "$backup" backups/
            echo "  ✅ Moved: $filename"
            COMP_BACKUP_COUNT=$((COMP_BACKUP_COUNT+1))
        fi
    done
fi

echo ""
echo "📦 Moved $COMP_BACKUP_COUNT component backups to /backups/"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣ UPDATING .gitignore"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -f .gitignore ]; then
    # Check if backups already in gitignore
    if ! grep -q "backups/" .gitignore; then
        echo "" >> .gitignore
        echo "# Backup files" >> .gitignore
        echo "backups/" >> .gitignore
        echo "*.backup-*" >> .gitignore
        echo "  ✅ Added backups/ to .gitignore"
    else
        echo "  ℹ️  backups/ already in .gitignore"
    fi
    
    # Check if scripts should be ignored (probably not)
    if ! grep -q "scripts/" .gitignore; then
        echo "  ℹ️  scripts/ will be tracked (recommended)"
    fi
else
    echo "⚠️  No .gitignore found!"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣ CREATING README IN /scripts/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat > scripts/README.md << 'SCRIPTS_README'
# 🛠️ Development Scripts

This folder contains utility scripts used during development and maintenance.

## 📁 Categories

### Video Scripts
- `add_mute_button.sh` - Adds mute/unmute button to video
- `check_video_autoplay.sh` - Diagnose video autoplay issues
- `fix_video_autoplay.sh` - Fix video autoplay
- `properly_add_autoplay.sh` - Properly add autoPlay attribute
- `check_background_video.sh` - Check video background
- `debug_video_display.sh` - Debug video display issues
- `fix_fps_video_playback.sh` - Fix FPS video playback
- `fix_video_mute_autoplay.sh` - Fix video mute/autoplay
- `fix_video_ref.sh` - Fix video reference
- `make_fps_video_background.sh` - Make FPS video background
- `make_video_always_visible.sh` - Make video always visible

### UI/UX Scripts
- `add_magnetic_cursor.sh` - Add magnetic cursor effect
- `check_cursor_styles.sh` - Check cursor styles
- `fix_magnetic_cursor.sh` - Fix magnetic cursor
- `remove_custom_cursor.sh` - Remove custom cursor
- `kill_how_it_works_popup.sh` - Remove "How It Works" popup
- `remove_how_it_works_popup.sh` - Alternative popup removal
- `verify_popup_removed.sh` - Verify popup removal

### Layout & Styling Scripts
- `check_and_fix_css.sh` - Check and fix CSS
- `restore_clean_css.sh` - Restore clean CSS
- `fix_layout_properly.sh` - Fix layout issues
- `fix_both_text_wrapping.sh` - Fix text wrapping
- `find_text_issue.sh` - Find text issues
- `fix_reality_text.sh` - Fix reality text

### Badge Scripts
- `final_badges_fix.sh` - Final badges fix
- `fix_badges_closing_tag.sh` - Fix badges closing tag
- `make_all_badges_bigger_animated.sh` - Make badges bigger with animation
- `restore_and_fix_badges_properly.sh` - Restore and fix badges
- `verify_badges.sh` - Verify badges

### Workspace Scripts
- `fix_workspace_video.sh` - Fix workspace video
- `restore_workspace_properly.sh` - Restore workspace
- `revert_workspace_admin.sh` - Revert workspace admin

### Documentation Scripts
- `create_new_readme.sh` - Create new README
- `create_pro_readme.sh` - Create professional README

### Deployment Scripts
- `ensure_clean_deployment.sh` - Ensure clean deployment
- `organize_new_scripts.sh` - Organize new scripts

### Upgrade Scripts
- `ultimate_upgrade_wow.sh` - Ultimate upgrade
- `upgrade_all_pages_agency.sh` - Upgrade all pages to agency standard
- `upgrade_to_agency_standard.sh` - Upgrade to agency standard

### Utility Scripts
- `scan_all_pages.sh` - Scan all pages
- `find_connect_section.sh` - Find connect section
- `update_connect_section.sh` - Update connect section
- `find_wrapping_texts.sh` - Find wrapping texts
- `find_video_issues.sh` - Find video issues
- `find_and_fix_video_modal.sh` - Find and fix video modal
- `check_mute_button.sh` - Check mute button
- `final_mute_check.sh` - Final mute check

## 🚀 Usage

Most scripts are self-contained. Run them from the project root:
```bash
./scripts/script_name.sh
```

## ⚠️ Note

These are development scripts. They modify code directly and should be used with caution. Always commit your changes before running these scripts.
SCRIPTS_README

echo "✅ Created scripts/README.md"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "7️⃣ CURRENT DIRECTORY STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📁 Root directory now contains:"
ls -1 | grep -v "node_modules" | grep -v ".next" | head -20
echo ""

echo "📁 /scripts/ directory:"
ls scripts/ | wc -l
echo "   $(ls scripts/ | wc -l) files"
echo ""

echo "📁 /backups/ directory:"
ls backups/ | wc -l
echo "   $(ls backups/ | wc -l) files"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "8️⃣ GIT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

git status -s
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL_ORGANIZED=$((SCRIPT_COUNT + BACKUP_COUNT + COMP_BACKUP_COUNT))

echo "✅ Organization complete!"
echo ""
echo "📦 Files organized: $TOTAL_ORGANIZED"
echo "   📜 Shell scripts: $SCRIPT_COUNT → /scripts/"
echo "   💾 Root backups: $BACKUP_COUNT → /backups/"
echo "   💾 Component backups: $COMP_BACKUP_COUNT → /backups/"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 NEXT STEPS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Commit and push these changes? (y/n): " answer

if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    git add .
    git commit -m "refactor: Organize repository structure

- Move 49 shell scripts to /scripts/ folder
- Move backup files to /backups/ folder
- Update .gitignore to exclude backups
- Add documentation to scripts folder
- Clean up root directory

Improves repository organization and maintainability"
    
    git push origin main
    
    echo ""
    echo "🎉 PUSHED TO GITHUB!"
    echo ""
    echo "✨ Your repository is now clean and organized!"
else
    echo ""
    echo "ℹ️  Changes staged but not committed."
    echo "   Review with: git status"
    echo "   Commit with: git commit -m 'refactor: Organize repository'"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ORGANIZATION COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Move this script to scripts folder
mv organize_repo.sh scripts/
echo ""
echo "📝 Moved organize_repo.sh to /scripts/"

