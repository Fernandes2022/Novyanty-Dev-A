#!/bin/bash

echo "🔍 VERIFYING BADGES..."
echo ""

echo "Current badges section:"
sed -n '987,1003p' app/page.tsx

echo ""
echo "=========================================="
echo ""

# Check if all three are the same size
if grep -q "w-6 h-6 bg-green-500" app/page.tsx && \
   grep -q "w-6 h-6 bg-blue-500" app/page.tsx && \
   grep -q "w-6 h-6 bg-pink-500" app/page.tsx; then
    echo "✅ ALL BADGES ARE BIGGER AND MATCHING!"
    echo ""
    echo "🟢 Secure - w-6 h-6, text-xl, glowing"
    echo "🔵 Fast - w-6 h-6, text-xl, glowing"
    echo "💗 Loved - w-6 h-6, text-xl, glowing"
else
    echo "❌ BADGES NOT UPDATED YET!"
    echo ""
    echo "Current state:"
    grep -A 2 "Secure\|Fast\|Loved" app/page.tsx | grep -E "w-[0-9]|text-"
    echo ""
    echo "Need to fix this..."
fi

