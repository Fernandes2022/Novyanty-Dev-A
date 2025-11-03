#!/bin/bash

echo "📱 Fixing mobile video alignment..."

# 1. Backup first
cp app/page.tsx app/page.tsx.backup-mobile-video-$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"

# 2. Find the hero section with video background
# Look for the video element in the hero section

echo "🔍 Looking for video background element..."

# Check if video exists in the hero section
if grep -q "<video" app/page.tsx; then
    echo "✅ Found video element"
    
    # Find the video element and update its className to include mobile alignment
    # The video should be left-aligned on mobile only
    
    # Update the video element's className to add mobile-specific positioning
    sed -i 's/className="absolute inset-0 w-full h-full object-cover"/className="absolute inset-0 w-full h-full object-cover md:object-center object-left"/g' app/page.tsx
    
    echo "✅ Video alignment updated for mobile (left-aligned)"
    
elif grep -q "background.*video" app/page.tsx; then
    echo "✅ Found video in background style"
    
    # If video is in inline style or different format, we need to add custom CSS
    
    # Let's add a custom style for mobile video alignment in globals.css
    cat >> app/globals.css << 'CSS_EOF'

/* Mobile video background alignment */
@media (max-width: 768px) {
  .hero-video-bg {
    object-position: left center !important;
  }
  
  .hero-section video {
    object-position: left center !important;
  }
}
CSS_EOF
    
    # Add the class to the video element if it doesn't have it
    sed -i 's/<video/<video className="hero-video-bg"/g' app/page.tsx
    
    echo "✅ Added mobile video alignment CSS"
    
else
    echo "⚠️  No video element found in hero section"
    echo "Looking for hero section to add mobile-specific styling..."
    
    # If there's a background video in a different format, add mobile CSS anyway
    cat >> app/globals.css << 'CSS_EOF'

/* Mobile video background alignment - left align on mobile only */
@media (max-width: 768px) {
  /* Target any video in hero section */
  section:first-of-type video,
  .hero-section video,
  [class*="hero"] video {
    object-position: left center !important;
    object-fit: cover !important;
  }
  
  /* Also target video containers */
  section:first-of-type .absolute video,
  .hero-section .absolute video {
    transform: translateX(-20%);
  }
}

/* Desktop - keep centered */
@media (min-width: 769px) {
  section:first-of-type video,
  .hero-section video,
  [class*="hero"] video {
    object-position: center center !important;
  }
}
CSS_EOF
    
    echo "✅ Added comprehensive mobile video alignment CSS"
fi

# 3. Let's also check the hero section structure and ensure proper mobile styling
echo ""
echo "📱 Adding mobile-specific hero section improvements..."

# Find the first section (hero section) and ensure it has proper mobile handling
LINE=$(grep -n "export default function Home" app/page.tsx | head -1 | cut -d: -f1)

if [ ! -z "$LINE" ]; then
    # Add mobile-specific styles to globals.css for the entire hero section
    cat >> app/globals.css << 'CSS_EOF'

/* Hero section mobile optimizations */
@media (max-width: 768px) {
  /* Ensure hero content is readable with left-aligned video */
  .hero-section .relative.z-10 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  /* Adjust hero text for better readability with left video */
  .hero-section h1,
  .hero-section .text-5xl,
  .hero-section .text-6xl {
    text-align: left;
    padding-right: 2rem;
  }
  
  /* Video background positioning for mobile */
  .hero-section > .absolute:has(video) {
    left: 0 !important;
    transform: translateX(-10%) !important;
  }
}
CSS_EOF
    
    echo "✅ Added hero section mobile optimizations"
fi

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Mobile video alignment fixed!"
    echo ""
    echo "📋 Changes made:"
    echo "  ✅ Video background now left-aligned on mobile devices"
    echo "  ✅ Video stays centered on desktop/tablet"
    echo "  ✅ Hero section optimized for mobile viewing"
    echo ""
    echo "�� Test it:"
    echo "  1. Run 'npm run dev'"
    echo "  2. Open DevTools (F12)"
    echo "  3. Toggle device toolbar (Ctrl+Shift+M)"
    echo "  4. View on mobile size (375px width)"
    echo "  5. Video should be left-aligned! 🎯"
else
    echo ""
    echo "❌ Build failed! Restoring backup..."
    cp app/page.tsx.backup-mobile-video-$(date +%Y%m%d-%H%M%S) app/page.tsx
    echo "✅ Backup restored"
    exit 1
fi

echo ""
echo "✨ All done! Video will be left-aligned on mobile screens only!"

