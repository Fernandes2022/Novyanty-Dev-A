#!/bin/bash

echo "🔍 Showing full nav structure..."
echo ""

echo "=== Lines 245-340 (full navigation) ==="
sed -n '245,340p' app/workspace/page.tsx | cat -n

