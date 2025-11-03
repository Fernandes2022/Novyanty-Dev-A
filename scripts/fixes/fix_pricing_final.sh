#!/bin/bash

echo "💳 Fixing pricing buttons (final)..."

# Backup
cp app/page.tsx app/page.tsx.backup-pricing-final-$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"

# Use Python for precise replacement
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Make sure Basic has Get Started with Stripe payment
# Find Basic button and ensure it calls handlePayment("basic")
basic_pattern = r'(<h3 className="text-2xl font-bold mb-2">Basic</h3>.*?)<button[^>]*>\s*(Get Started|Contact Sales)\s*</button>'
basic_replacement = r'\1<button onClick={() => handlePayment("basic")} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">\n                Get Started\n              </button>'
content = re.sub(basic_pattern, basic_replacement, content, flags=re.DOTALL)

# Make sure Pro has Get Started with Stripe payment (should already be correct)
pro_pattern = r'(<h3 className="text-2xl font-bold mb-2">Pro</h3>.*?)<button[^>]*>\s*Get Started\s*</button>'
if not re.search(r'handlePayment\("pro"\)', content):
    pro_replacement = r'\1<button onClick={() => handlePayment("pro")} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">\n                Get Started\n              </button>'
    content = re.sub(pro_pattern, pro_replacement, content, flags=re.DOTALL)

# Make sure Premium has Contact Sales
premium_pattern = r'(<h3 className="text-2xl font-bold mb-2">Premium</h3>.*?)<button[^>]*>\s*(Get Started|Contact Sales)\s*</button>'
premium_replacement = r'\1<button onClick={handleContactSales} className="w-full glass-button py-3 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer">\n                Contact Sales\n              </button>'
content = re.sub(premium_pattern, premium_replacement, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ All pricing buttons updated")
print("  ✅ Basic → Get Started (Stripe)")
print("  ✅ Pro → Get Started (Stripe)")
print("  ✅ Premium → Contact Sales")
PYTHON_EOF

echo ""
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 PERFECT! Ready to deploy!"
    echo ""
    echo "📋 Final pricing setup:"
    echo "  💳 Basic ($9.99) → Get Started → Stripe payment"
    echo "  💳 Pro ($24.99) POPULAR → Get Started → Stripe payment"
    echo "  📞 Premium ($49.99) → Contact Sales → /contact-sales page"
    echo ""
    echo "🚀 Let's deploy!"
else
    echo "❌ Build failed! Restoring backup..."
    cp app/page.tsx.backup-pricing-final-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

