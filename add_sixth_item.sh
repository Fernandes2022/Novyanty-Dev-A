#!/bin/bash

echo "🔧 Adding 6th item to 'Who It's For' section..."

# Backup
cp app/page.tsx app/page.tsx.backup-sixth-item-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find the array and add a 6th item before the closing bracket
old_pattern = r'''              \{
                icon: "🎯",
                title: "Agencies",
                description: "Deliver client projects faster and increase your profit margins"
              \}
            \]\.map\(\(useCase, index\) =>'''

new_pattern = r'''              {
                icon: "🎯",
                title: "Agencies",
                description: "Deliver client projects faster and increase your profit margins"
              },
              {
                icon: "✍️",
                title: "Bloggers & Writers",
                description: "Create your personal blog or publication without technical headaches"
              }
            ].map((useCase, index) =>'''

content = re.sub(old_pattern, new_pattern, content)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added 6th item: Bloggers & Writers ✍️")
print("✅ Now showing 6 items in 'Who It's For' section")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 New 6th item added:"
    echo "  ✍️ Bloggers & Writers"
    echo "  Description: Create your personal blog or publication without technical headaches"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-sixth-item-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

