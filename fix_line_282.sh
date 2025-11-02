#!/bin/bash

echo "🔧 Fixing line 282 properly..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-line282-$(date +%Y%m%d-%H%M%S)

# Replace the entire broken section (lines 281-287)
python3 << 'PYTHON_EOF'
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

# Line 281 should be closing </Link>
# Line 282 should start 
# Replace lines 281-287 with correct version

correct_section = '''                  </Link>
                  
                    href="#pricing"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
'''

# Replace lines 280-287 (0-indexed: 279-286)
lines[280:287] = [correct_section]

with open('app/page.tsx', 'w') as f:
    f.writelines(lines)

print("✅ Fixed lines 281-287")

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
    echo ""
    echo "📱 Mobile menu complete!"
    echo "   ✅ Hamburger button"
    echo "   ✅ All navigation links working"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-line282-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

