#!/bin/bash

echo "↩️  REVERTING WORKSPACE & ADMIN..."
echo ""
echo "Keeping: ✨ Sparkle cursor"
echo "Reverting: Workspace & Admin pages"
echo ""

# Restore from backups
echo "Restoring workspace..."
cp app/workspace/page.tsx.backup-ultimate-20251103-081956 app/workspace/page.tsx

echo "Restoring admin..."
cp app/admin/page.tsx.backup-ultimate-20251103-081956 app/admin/page.tsx

echo "✅ Restored!"
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📊 Current State:"
    echo "   ✅ Sparkle cursor - ACTIVE"
    echo "   ✅ Workspace - Original version"
    echo "   ✅ Admin - Original version"
    echo "   ✅ All other pages - Agency standard"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "revert: Restore original workspace and admin pages

- Keep sparkle cursor (client loves it)
- Revert workspace to original functional version
- Revert admin to original version
- All pages still agency standard"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED!"
        echo "   ✨ Sparkle cursor stays"
        echo "   ↩️  Workspace & Admin back to original"
    fi
else
    echo "❌ Build failed"
fi

