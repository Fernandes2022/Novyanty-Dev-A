#!/bin/bash

echo "🔧 RESTORING CLEAN CSS..."
echo ""

# Find the most recent backup before we broke it
BACKUP=$(ls -t app/globals.css.backup-* 2>/dev/null | grep -v "magnetic\|cursor" | head -1)

if [ -n "$BACKUP" ]; then
    echo "Found clean backup: $BACKUP"
    cp "$BACKUP" app/globals.css
    echo "✅ Restored from backup!"
else
    echo "No backup found, using agency standard backup..."
    cp app/globals.css.backup-agency-* app/globals.css 2>/dev/null || echo "❌ No backups available"
fi

echo ""
echo "Testing without magnetic cursor first..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD WORKS!"
    echo ""
    echo "Want to add magnetic cursor properly? (y/n)"
    read answer
    
    if [ "$answer" = "y" ]; then
        echo ""
        echo "Adding simple magnetic cursor..."
        
        # Add simpler version
        cat >> app/globals.css << 'SIMPLE_CURSOR'

/* Simple Magnetic Cursor */
@media (min-width: 768px) {
  body { cursor: none; }
  * { cursor: none; }
}
SIMPLE_CURSOR
        
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Ready to deploy!"
        fi
    fi
else
    echo "❌ Still broken. Let's just use default cursor for now."
    echo "Remove all cursor CSS additions..."
    
    # Use the backup from before agency upgrade
    ls -la app/globals.css.backup-* | head -5
fi

