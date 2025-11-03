#!/bin/bash

echo "📦 COMMITTING ALL REMAINING FILES..."
echo ""

echo "=== Checking what's not committed ==="
git status

echo ""
echo "=== Staging ALL files ==="
git add .

echo ""
echo "=== Creating comprehensive commit ==="
git commit -m "chore: Add all development scripts and backups

📝 Development Scripts Added:
- Responsive checking scripts
- Video debugging tools
- Cursor enhancement scripts
- Deployment automation scripts
- Backup files for safety

🔧 Backup Files:
- Multiple timestamped backups of page.tsx
- VideoBackground.tsx backups
- globals.css backups

🛠️ Utility Scripts:
- check_responsiveness.sh
- debug_video_issue.sh
- fix_all_responsive_issues.sh
- deploy scripts for all features

These files document the development process and provide
rollback points if needed in the future."

echo ""
echo "=== Pushing to GitHub ==="
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉   ALL FILES COMMITTED!"
    echo "🎉 ================================"
    echo ""
    echo "✅ Everything is now synced to GitHub"
    echo "✅ All scripts and backups saved"
    echo "✅ Clean working directory"
    echo ""
    echo "🧹 Optional: Clean up script files?"
    echo "   (Backups are safe in git history)"
else
    echo "❌ Push failed!"
    exit 1
fi

