#!/bin/bash

echo "🔧 Fixing Eye icon import..."
echo ""

# Find the latest backup
LATEST_BACKUP=$(ls -t app/page.tsx.backup-* 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "Restoring from: $LATEST_BACKUP"
    cp "$LATEST_BACKUP" app/page.tsx
fi

# New backup
cp app/page.tsx app/page.tsx.backup-eye-fix-$(date +%Y%m%d-%H%M%S)

echo "=== Current lucide-react import ==="
grep "from 'lucide-react'" app/page.tsx | head -1

echo ""
echo "=== Fixing the import ==="

# Find and replace the import line properly
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find the lucide-react import and add Eye
content = re.sub(
    r"import \{ ([^}]*Mic[^}]*Zap[^}]*Rocket[^}]*) \} from 'lucide-react'",
    r"import { \1, Eye } from 'lucide-react'",
    content
)

# Also try alternative pattern
if 'Eye' not in content.split('\n')[0:20]:
    content = re.sub(
        r"(import \{[^}]*)(Rocket)([^}]*\} from 'lucide-react')",
        r"\1\2, Eye\3",
        content
    )

# Change Zap to Eye
content = re.sub(
    r'icon: Zap,',
    r'icon: Eye,',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Fixed Eye import and usage")

PYTHON_EOF

echo ""
echo "=== Verification ==="
echo "Import line:"
grep "from 'lucide-react'" app/page.tsx | head -1
echo ""
echo "Watch It Build section:"
grep -A 1 "Watch It Build" app/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "   ✅ Eye icon imported from lucide-react"
    echo "   ✅ 'Watch It Build' now uses 👀 Eye icon"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for more fixes"
else
    echo "❌ Build still failed - checking import"
    grep "lucide-react" app/page.tsx | head -3
    exit 1
fi

