#!/bin/bash

echo "📱 Fixing background video for MOBILE VIEW ONLY..."

# Backup
cp app/globals.css app/globals.css.backup-mobile-only-$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"

# Remove all previous video CSS
echo "🧹 Cleaning up old video CSS..."
sed -i '/\/\* Background Video - Precise Alignment \*\//,/^$/d' app/globals.css
sed -i '/\/\* Mobile video background alignment \*\//,/^$/d' app/globals.css
sed -i '/\/\* Hero section mobile optimizations \*\//,/^$/d' app/globals.css
sed -i '/\.hero-video-background/,/^}/d' app/globals.css

# Add MOBILE ONLY video CSS
echo "📱 Adding mobile-only video alignment..."

cat >> app/globals.css << 'CSS_EOF'

/* Background Video - MOBILE ONLY */
@media (max-width: 768px) {
  .hero-video-background,
  section:first-of-type video {
    /* Fill viewport height */
    height: 100vh !important;
    width: auto !important;
    min-width: 100% !important;
    
    /* Lock aspect ratio */
    object-fit: cover !important;
    
    /* Left align - video starts from left side of screen */
    object-position: left center !important;
    
    /* Position from left */
    left: 0 !important;
    right: auto !important;
    transform: none !important;
  }
  
  /* Ensure video container doesn't interfere */
  section:first-of-type > .absolute:has(video) {
    left: 0 !important;
    transform: none !important;
  }
}
CSS_EOF

echo "✅ Mobile-only CSS added"

# Test build
echo ""
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Mobile video alignment fixed!"
    echo ""
    echo "📋 Applied ONLY on mobile (max-width: 768px):"
    echo "  ✅ Height: Fills viewport (100vh)"
    echo "  ✅ Aspect ratio: Locked"
    echo "  ✅ Alignment: Left-aligned"
    echo ""
    echo "🚀 Deploying now..."
    
    # Deploy
    git add .
    git commit -m "fix: Left-align background video on mobile only

- Video fills viewport height on mobile
- Aspect ratio locked with object-fit: cover
- Left-aligned (starts from left edge)
- Only applies to mobile devices (max-width: 768px)
- Desktop/tablet remain unchanged"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED! Check Vercel in 2-3 minutes!"
    echo "📱 Test on mobile view (DevTools > Toggle device toolbar)"
    
else
    echo ""
    echo "❌ Build failed! Restoring backup..."
    cp app/globals.css.backup-mobile-only-$(date +%Y%m%d-%H%M%S) app/globals.css
    exit 1
fi

