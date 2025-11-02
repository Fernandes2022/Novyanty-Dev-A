#!/bin/bash

echo "🔧 Fixing the anchor tag properly..."
echo ""

echo "=== Lines 280-290 ==="
sed -n '280,290p' app/page.tsx

echo ""
echo "Fixing the malformed anchor tag..."

# Replace lines 282-287 with correct anchor
python3 << 'PYTHON_EOF'
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

# Check line 282 (index 281)
print(f"Line 282: {lines[281].strip()}")

# If it doesn't start with <a, fix it
if not lines[281].strip().startswith('<a'):
    # Replace the malformed section
    # Lines 282-287 should be:
    correct_anchor = '''                  
                    href="#pricing"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
'''
    
    # Find where the anchor section starts and ends
    start = 281  # Line 282 (0-indexed)
    end = 287    # Line 288 (0-indexed)
    
    # Delete the malformed lines
    del lines[start:end]
    
    # Insert correct anchor
    lines.insert(start, correct_anchor)
    
    with open('app/page.tsx', 'w') as f:
        f.writelines(lines)
    
    print("✅ Fixed anchor tag")
else:
    print("✅ Anchor tag looks correct")

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
    echo "📱 Mobile menu complete!"
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    echo "Showing problematic lines:"
    sed -n '280,290p' app/page.tsx
    exit 1
fi

