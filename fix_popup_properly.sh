#!/bin/bash

echo "🔧 RESTORING AND FIXING PROPERLY..."
echo ""

# Restore from backup
LATEST_BACKUP=$(ls -t app/page.tsx.backup-* | head -1)
if [ ! -z "$LATEST_BACKUP" ]; then
    echo "Restoring from: $LATEST_BACKUP"
    cp "$LATEST_BACKUP" app/page.tsx
    echo "✅ Restored!"
else
    echo "❌ No backup found!"
    exit 1
fi

echo ""
echo "Now let me properly remove just the modal rendering..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-proper-$(date +%Y%m%d-%H%M%S)

# Use Node.js to properly edit the file
node << 'NODEJS_END'
const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');

// Find and comment out the modal section instead of deleting
const newContent = content.replace(
  /\{showDemoVideo && \(/,
  '{false && showDemoVideo && ('
);

fs.writeFileSync('app/page.tsx', newContent);
console.log('✅ Modal disabled by changing condition to false!');
NODEJS_END

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎯 Popup is NOW disabled!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Disable How It Works popup on page load"
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! NO MORE FUCKING POPUP!"
    fi
else
    echo "❌ Build failed, restoring backup..."
    cp "$LATEST_BACKUP" app/page.tsx
fi

