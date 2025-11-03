#!/bin/bash

echo "🔍 CHECKING CURRENT CURSOR STYLES..."
echo ""
echo "=========================================="
echo "Current globals.css cursor section:"
echo "=========================================="
echo ""

# Check if custom cursor exists
if grep -q "Creative Custom Cursor" app/globals.css; then
    echo "✅ Custom cursor code found!"
    echo ""
    echo "Current cursor CSS:"
    echo ""
    grep -A 50 "Creative Custom Cursor" app/globals.css
else
    echo "❌ No custom cursor found - using default cursor"
    echo ""
    echo "Default cursor behavior:"
    echo "  - Standard pointer on all elements"
    echo "  - No custom animations"
fi

echo ""
echo "=========================================="
echo "CREATIVE CURSOR OPTIONS:"
echo "=========================================="
echo ""
echo "1. Dot Follower - Small dot follows mouse with delay"
echo "2. Gradient Ring - Animated gradient circle (current)"
echo "3. Trail Effect - Leaves trail of particles"
echo "4. Spotlight - Follows mouse like a spotlight"
echo "5. Magnetic - Elements attract the cursor"
echo "6. Glass Cursor - Glassmorphism effect"
echo "7. Neon Glow - Glowing neon cursor"
echo ""
echo "Which style do you want? (or type 'current' to keep as is)"

