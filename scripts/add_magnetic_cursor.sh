#!/bin/bash

echo "🧲 ADDING MAGNETIC CURSOR..."
echo ""

# Backup
cp app/globals.css app/globals.css.backup-magnetic-$(date +%Y%m%d-%H%M%S)

# Add magnetic cursor CSS and JavaScript
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
    transition: transform 0.15s ease, width 0.15s ease, height 0.15s ease;
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
    transition: transform 0.3s ease, width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
    opacity: 0.6;
  }

  .cursor-hover {
    transform: scale(1.5);
    background: linear-gradient(135deg, #ec4899, #a855f7);
  }

  .cursor-follower-hover {
    width: 60px;
    height: 60px;
    border-color: #ec4899;
    opacity: 1;
  }
}
CSS_EOF

echo "✅ CSS added!"
echo ""

# Now create a cursor component
mkdir -p components

cat > components/MagneticCursor.tsx << 'CURSOR_COMPONENT'
'use client';

import { useEffect, useState } from 'react';

export function MagneticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only on desktop
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.closest('button') || 
                           target.closest('a') ||
                           target.style.cursor === 'pointer';

      // Magnetic effect - pull cursor toward interactive elements
      if (isInteractive) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate magnetic pull
        const deltaX = (centerX - mouseX) * 0.15;
        const deltaY = (centerY - mouseY) * 0.15;
        
        cursor.style.transform = `translate(${mouseX + deltaX - 10}px, ${mouseY + deltaY - 10}px)`;
        cursor.classList.add('cursor-hover');
        follower.classList.add('cursor-follower-hover');
        setIsHovering(true);
      } else {
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('cursor-follower-hover');
        setIsHovering(false);
      }
    };

    const animateFollower = () => {
      // Smooth follow with delay
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      
      requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', moveCursor);
    animateFollower();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cursor.remove();
      follower.remove();
    };
  }, []);

  return null;
}
CURSOR_COMPONENT

echo "✅ Magnetic cursor component created!"
echo ""

# Add cursor to root layout
echo "Adding to layout..."

# Check if layout already has cursor
if ! grep -q "MagneticCursor" app/layout.tsx; then
  # Add import
  sed -i '/^import/a import { MagneticCursor } from "../components/MagneticCursor";' app/layout.tsx
  
  # Add component before closing body tag
  sed -i 's/<\/body>/<MagneticCursor \/>\n        <\/body>/' app/layout.tsx
  
  echo "✅ Added to layout!"
else
  echo "✅ Already in layout!"
fi

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =========================================="
    echo "✅  MAGNETIC CURSOR INSTALLED!"
    echo "✅ =========================================="
    echo ""
    echo "🧲 Features:"
    echo "   ✅ Cursor gets pulled toward buttons/links"
    echo "   ✅ Smooth gradient animations"
    echo "   ✅ Interactive and engaging"
    echo "   ✅ Desktop only (mobile keeps default)"
    echo "   ✅ Super creative - client will love it! 🔥"
    echo ""
    read -p "Deploy now? (y/n): " answer
    
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        git add .
        git commit -m "feat: Add magnetic cursor - creative interactive design

✨ Features:
- Magnetic effect pulls cursor toward interactive elements
- Smooth gradient animations
- Engaging and creative user experience
- Desktop only, mobile friendly

🎨 Perfect for creative workspace!"
        
        git push origin main
        
        echo ""
        echo "🎉 DEPLOYED! Client will love this! 🧲⚡"
    fi
else
    echo "❌ Build failed"
    exit 1
fi

