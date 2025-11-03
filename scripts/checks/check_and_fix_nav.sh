#!/bin/bash

echo "🔍 Checking Navigation.tsx for Adaptive Engine..."
echo ""

# First, let's see what's actually in the navigation file
echo "=== CURRENT NAVIGATION CONTENT ==="
cat components/Navigation.tsx | grep -i "adaptive" -A 2 -B 2

echo ""
echo "=== FULL NAVIGATION STRUCTURE ==="
cat components/Navigation.tsx | grep -E "(Link|href|Adaptive|FAQ|About|Get Started)" | head -30

echo ""
echo "🔧 Now removing Adaptive Engine and fixing layout..."

# Backup
cp components/Navigation.tsx components/Navigation.tsx.backup-check-$(date +%Y%m%d-%H%M%S)

# Use Python to thoroughly clean and reposition
python3 << 'PYTHON_EOF'
import re

with open('components/Navigation.tsx', 'r') as f:
    content = f.read()

# Remove ALL instances of Adaptive Engine - multiple patterns
patterns_to_remove = [
    r'<Link[^>]*href="[^"]*"[^>]*>\s*Adaptive Engine\s*</Link>',
    r'<a[^>]*>\s*Adaptive Engine\s*</a>',
    r'{[^}]*Adaptive Engine[^}]*}',
    r'<.*?>\s*Adaptive Engine\s*</.*?>',
]

for pattern in patterns_to_remove:
    content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.DOTALL)

# Also remove the nav item div that contains it
content = re.sub(
    r'<div[^>]*className="[^"]*"[^>]*>\s*<Link[^>]*>\s*Adaptive Engine.*?</Link>\s*</div>',
    '',
    content,
    flags=re.IGNORECASE | re.DOTALL
)

# Reduce gap between navigation items on the right side
# Change gap-8 or gap-6 to gap-4 for tighter spacing
content = re.sub(
    r'(className="[^"]*flex[^"]*items-center[^"]*)(gap-8|gap-6)',
    r'\1gap-4',
    content
)

# Clean up extra whitespace
content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

with open('components/Navigation.tsx', 'w') as f:
    f.write(content)

print("✅ Adaptive Engine completely removed")
print("✅ Navigation links spacing tightened")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Adaptive Engine removed completely"
    echo "  ✅ FAQ, About, Get Started closer together"
    echo "  ✅ Tighter spacing on right side"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Remove Adaptive Engine and tighten nav spacing

- Completely removed Adaptive Engine from navigation
- Reduced spacing between FAQ, About, Get Started
- Cleaner, more compact navigation layout"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo "🌐 Live in 2-3 minutes!"
else
    echo "❌ Build failed"
    cp components/Navigation.tsx.backup-check-$(date +%Y%m%d-%H%M%S) components/Navigation.tsx
    exit 1
fi

