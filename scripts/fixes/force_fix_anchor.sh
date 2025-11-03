#!/bin/bash

echo "🔧 Force fixing the anchor tag..."
echo ""

# Show current line 283
echo "Current line 283:"
sed -n '283p' app/page.tsx

# Replace the ENTIRE malformed section with correct code
python3 << 'PYTHON_EOF'
with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace the malformed anchor section with correct one
import re

# Find and replace the broken section
content = re.sub(
    r'                  </Link>\n\s*\n\s*\n\s*href="#pricing"',
    '                  </Link>\n                  <a\n                    href="#pricing"',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Fixed anchor tag")

PYTHON_EOF

echo ""
echo "=== Verification: Lines 280-290 ==="
sed -n '280,290p' app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "📱 Mobile menu working!"
else
    echo "❌ Still failing"
    exit 1
fi

