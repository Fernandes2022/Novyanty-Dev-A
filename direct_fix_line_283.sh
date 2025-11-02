#!/bin/bash

echo "🔧 Directly fixing line 283 to add <a tag..."
echo ""

# Directly replace line 283
sed -i '283s/^                  $/                  <a/' app/page.tsx

echo "✅ Line 283 fixed"

echo ""
echo "=== Verification: Lines 280-290 ==="
sed -n '280,290p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "📱 Mobile menu is complete and working!"
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Still failing - let me show the exact issue..."
    sed -n '283p' app/page.tsx | cat -A
    exit 1
fi

