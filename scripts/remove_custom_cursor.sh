#!/bin/bash

echo "🔧 Removing custom cursor..."
echo ""

# Backup
cp app/globals.css app/globals.css.backup-cursor-$(date +%Y%m%d-%H%M%S)

# Remove the custom cursor section from globals.css
# This removes everything from "/* Creative Custom Cursor" to the end of the @keyframes section

# Find and remove the custom cursor CSS block
sed -i '/\/\* Creative Custom Cursor - Desktop Only \*\//,/@keyframes cursorPulse {/d' app/globals.css
sed -i '/^[[:space:]]*0%, 100% {$/,/^[[:space:]]*}$/d' app/globals.css
sed -i '/^[[:space:]]*50% {$/,/^[[:space:]]*}$/d' app/globals.css
sed -i '/^[[:space:]]*}$/d' app/globals.css

# Clean way: just remove the entire section
awk '
  /\/\* Creative Custom Cursor/ {skip=1}
  skip && /^}$/ && prev ~ /^[[:space:]]*}$/ {skip=0; next}
  !skip {print}
  {prev=$0}
' app/globals.css > app/globals.css.tmp && mv app/globals.css.tmp app/globals.css

echo "✅ Custom cursor removed - back to default!"
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "   Default cursor restored ✨"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add app/globals.css
        git commit -m "revert: Remove custom cursor, back to default"
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! Default cursor is back!"
    fi
else
    echo "❌ Build failed"
    exit 1
fi

