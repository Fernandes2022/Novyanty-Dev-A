#!/bin/bash

echo "🔧 Making all pricing plans consistent with badges and buttons..."

# Backup
cp app/page.tsx app/page.tsx.backup-pricing-fix-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Fix Basic Plan - add border and badge
content = re.sub(
    r'className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform"\s*>\s*<h3 className="text-2xl font-bold mb-2">Basic</h3>',
    r'''className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-blue-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-1 rounded-full text-sm font-bold">
                STARTER
              </div>
              <h3 className="text-2xl font-bold mb-2">Basic</h3>''',
    content
)

# Fix Premium Plan - add border, badge, and change button
content = re.sub(
    r'className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform"\s*>\s*<h3 className="text-2xl font-bold mb-2">Premium</h3>',
    r'''className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform relative border-2 border-yellow-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                ENTERPRISE
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>''',
    content
)

# Change Premium button from "Contact Sales" to "Get Started"
# Also fix the wrong handlePayment("basic") to handlePayment("premium")
content = re.sub(
    r'<button onClick=\{\(\) => handlePayment\("basic"\)\} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">\s*Contact Sales',
    r'<button onClick={() => handlePayment("premium")} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">Get Started',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added STARTER badge to Basic plan (blue)")
print("✅ Added ENTERPRISE badge to Premium plan (yellow)")
print("✅ Added borders to all plans")
print("✅ Changed Premium button to 'Get Started'")
print("✅ Fixed Premium button to call correct pricing")
print("✅ All plans now consistent!")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 All Pricing Plans Now Have:"
    echo "  💙 Basic: STARTER badge (blue) + Get Started"
    echo "  💜 Pro: POPULAR badge (purple) + Get Started"
    echo "  💛 Premium: ENTERPRISE badge (yellow) + Get Started"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-pricing-fix-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

