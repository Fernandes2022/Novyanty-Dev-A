#!/bin/bash

echo "🔧 Fixing magnetic cursor errors..."
echo ""

# 1. Fix CSS - check and close any unclosed blocks
echo "1️⃣  Fixing CSS syntax..."

# Restore backup and re-add cursor properly
cp app/globals.css.backup-magnetic-* app/globals.css 2>/dev/null || echo "Using current CSS"

# Add magnetic cursor CSS properly with all closing braces
cat >> app/globals.css << 'CSS_EOF'

/* Magnetic Creative Cursor - Desktop Only */
@media (min-width: 768px) {
  body {
    cursor: none !important;
  }
  
  * {
    cursor: none !important;
  }

  .cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a855f7, #ec4899);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
  }

  .cursor-follower {
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid #a855f7;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.3s ease;
    opacity: 0.6;
  }

  .cursor-hover {
    transform: scale(1.5);
  }

  .cursor-follower-hover {
    width: 60px;
    height: 60px;
    border-color: #ec4899;
    opacity: 1;
  }
}
CSS_EOF

echo "✅ CSS fixed!"
echo ""

# 2. Fix layout.tsx - remove duplicates
echo "2️⃣  Fixing layout imports..."

# Remove all MagneticCursor imports
grep -v "MagneticCursor" app/layout.tsx > app/layout.tsx.tmp
mv app/layout.tsx.tmp app/layout.tsx

# Add import once after SuppressHydration
sed -i '/SuppressHydrationWarning/a import { MagneticCursor } from "../components/MagneticCursor";' app/layout.tsx

# Add component in body once
sed -i '/<\/body>/i \        <MagneticCursor />' app/layout.tsx

echo "✅ Layout fixed!"
echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    read -p "Deploy? (y/n): " answer
    
    if [ "$answer" = "y" ]; then
        git add .
        git commit -m "fix: Magnetic cursor implementation"
        git push origin main
        echo "🎉 DEPLOYED!"
    fi
else
    echo "❌ Build failed"
fi

