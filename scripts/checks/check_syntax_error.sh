#!/bin/bash

echo "🔍 Checking the syntax error around line 285..."
echo ""

echo "=== Lines 280-290 ==="
sed -n '280,290p' app/page.tsx

echo ""
echo "=== The problem is likely with the anchor tag ==="
echo "Let me check the full mobile menu section..."

sed -n '270,300p' app/page.tsx

