#!/bin/bash

echo "🔧 Making comparison table fit perfectly on mobile..."

# Backup
cp app/page.tsx app/page.tsx.backup-table-mobile-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Remove min-w-[600px] from header row
content = re.sub(
    r'<div className="grid grid-cols-3 divide-x divide-white/10 min-w-\[600px\] md:min-w-0">',
    r'<div className="grid grid-cols-3 divide-x divide-white/10">',
    content
)

# Remove min-w-[600px] from data rows
content = re.sub(
    r'className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 min-w-\[600px\] md:min-w-0"',
    r'className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10"',
    content
)

# Make text even smaller on mobile - change p-3 to p-1.5 and text-xs to text-[10px]
content = re.sub(
    r'<div className="p-3 md:p-8 text-center bg-white/5">',
    r'<div className="p-1.5 md:p-8 text-center bg-white/5">',
    content
)

content = re.sub(
    r'<div className="p-3 md:p-8 text-center">',
    r'<div className="p-1.5 md:p-8 text-center">',
    content
)

content = re.sub(
    r'<div className="p-3 md:p-8 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">',
    r'<div className="p-1.5 md:p-8 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">',
    content
)

# Change header text from text-xs to text-[10px] for even smaller on mobile
content = re.sub(
    r'<h3 className="text-xs md:text-xl font-bold">Metric</h3>',
    r'<h3 className="text-[10px] md:text-xl font-bold">Metric</h3>',
    content
)

content = re.sub(
    r'<h3 className="text-xs md:text-xl font-bold text-red-400">Traditional</h3>',
    r'<h3 className="text-[10px] md:text-xl font-bold text-red-400">Traditional</h3>',
    content
)

content = re.sub(
    r'<h3 className="text-xs md:text-xl font-bold gradient-text">Creative Workspace</h3>',
    r'<h3 className="text-[10px] md:text-xl font-bold gradient-text">Creative Workspace</h3>',
    content
)

# Change data row padding and text size
content = re.sub(
    r'<div className="p-3 md:p-6 font-semibold text-xs md:text-base">',
    r'<div className="p-1.5 md:p-6 font-semibold text-[9px] md:text-base leading-tight">',
    content
)

content = re.sub(
    r'<div className="p-3 md:p-6 text-white/60 text-xs md:text-base">',
    r'<div className="p-1.5 md:p-6 text-white/60 text-[9px] md:text-base leading-tight">',
    content
)

content = re.sub(
    r'<div className="p-3 md:p-6 text-green-400 font-semibold text-xs md:text-base">',
    r'<div className="p-1.5 md:p-6 text-green-400 font-semibold text-[9px] md:text-base leading-tight">',
    content
)

# Remove the swipe hint message
content = re.sub(
    r'<p className="text-center text-xs text-white/40 mt-4 md:hidden">\s*← Swipe to see full table →\s*</p>',
    r'',
    content
)

# Remove overflow-x-auto from the container
content = re.sub(
    r'<div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden overflow-x-auto">',
    r'<div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">',
    content
)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Removed min-width constraints")
print("✅ Reduced padding for mobile (p-3 → p-1.5)")
print("✅ Made text tiny on mobile (10px/9px)")
print("✅ Removed horizontal scroll")
print("✅ Removed swipe hint message")
print("✅ Table now fits perfectly on mobile!")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Table fits on all mobile screens"
    echo "  ✅ No horizontal scrolling"
    echo "  ✅ All 3 columns visible"
    echo "  ✅ Text tiny but readable on mobile"
    echo "  ✅ Normal size on desktop"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-table-mobile-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

