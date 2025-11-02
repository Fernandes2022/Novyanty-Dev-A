#!/bin/bash

echo "🔧 Making Basic & Premium buttons match Pro style..."

# Backup
cp app/page.tsx app/page.tsx.backup-pricing-cta-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Replace Basic button with gradient style (blue)
content = re.sub(
    r'<button onClick=\{\(\) => handlePayment\("basic"\)\} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">',
    r'<button onClick={() => handlePayment("basic")} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">',
    content
)

# Replace Premium button with gradient style (yellow/orange)
content = re.sub(
    r'<button onClick=\{\(\) => handlePayment\("premium"\)\} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">',
    r'<button onClick={() => handlePayment("premium")} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Basic: Blue gradient button (like Pro style)")
print("✅ Pro: Purple gradient button (unchanged)")
print("✅ Premium: Yellow/orange gradient button (like Pro style)")
print("✅ All buttons now have same style, different colors!")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 All pricing buttons now styled like Pro:"
    echo "  💙 Basic: Blue gradient (from-blue-500 to-cyan-500)"
    echo "  💜 Pro: Purple gradient (from-purple-500 to-pink-500)"
    echo "  💛 Premium: Yellow gradient (from-yellow-500 to-orange-500)"
    echo "  ✅ Same hover animation on all!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-pricing-cta-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

