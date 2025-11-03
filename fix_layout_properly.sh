#!/bin/bash

echo "🔧 Fixing layout.tsx..."
echo ""

# Backup layout
cp app/layout.tsx app/layout.tsx.backup-fix-$(date +%Y%m%d-%H%M%S)

# Remove the MagneticCursor completely for now
sed -i '/MagneticCursor/d' app/layout.tsx

echo "✅ Cleaned layout.tsx"
echo ""

# Also remove the component file
rm -f components/MagneticCursor.tsx

echo "✅ Removed magnetic cursor component"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  BUILD SUCCESSFUL!"
    echo "✅ =========================================="
    echo ""
    echo "Site is back to working with DEFAULT cursor"
    echo ""
    echo "Want to deploy now? (y/n)"
    read answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "fix: Remove broken magnetic cursor, back to default

- Removed corrupted cursor implementation
- Site working with default cursor
- All pages still agency standard"
        git push origin main
        echo ""
        echo "🎉 DEPLOYED! Site is working!"
        echo ""
        echo "Note: Using default cursor for now."
        echo "We can add a simpler cursor later if needed."
    fi
else
    echo "❌ Still broken, checking layout..."
    head -30 app/layout.tsx
fi

