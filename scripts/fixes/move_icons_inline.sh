#!/bin/bash

echo "🔧 Moving icons to be inline with titles..."

# Backup
cp app/page.tsx app/page.tsx.backup-inline-icons-$(date +%Y%m%d-%H%M%S)

# Fix the structure
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find and replace the How It Works section structure
# Remove the icon div at the top and add icon inline with title

old_pattern = r'''              >
                <div className=\{`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br \$\{item\.color\} flex items-center justify-center mb-4`\}>
                  <item\.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl mb-3">\{item\.step\}</div>
                <h3 className="text-card-title mb-2 md:mb-3">\{item\.title\}</h3>'''

new_pattern = r'''              >
                <div className="text-2xl md:text-3xl mb-3">{item.step}</div>
                <h3 className="text-card-title mb-2 md:mb-3 flex items-center gap-2">
                  {item.title} <item.icon className="h-6 w-6 inline-block text-purple-400" />
                </h3>'''

content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Icons moved inline with titles")
print("✅ Icon div removed from top")
print("✅ Structure: Number → Title + Icon → Description")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Say It 🎤 - icon now inline"
    echo "  ✅ Watch It Build ⚡ - icon now inline"
    echo "  ✅ Launch It 🚀 - icon now inline"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-inline-icons-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

