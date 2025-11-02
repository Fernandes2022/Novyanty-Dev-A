#!/bin/bash

echo "🖱️  Making cursor larger on desktop..."

# Backup
cp app/globals.css app/globals.css.backup-cursor-$(date +%Y%m%d-%H%M%S)

# Add cursor styles at the end of globals.css
cat >> app/globals.css << 'CSS_END'

/* Custom Larger Cursor for Desktop */
@media (min-width: 768px) {
  * {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" stroke="black" stroke-width="1" d="M5 3l14 8.5-6 1.5-1.5 6z"/></svg>') 4 4, auto !important;
  }
  
  a, button, [role="button"] {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path fill="white" stroke="black" stroke-width="1.5" d="M6 4l16 10-7 2-2 7z"/></svg>') 6 6, pointer !important;
  }
  
  input, textarea {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28"><rect x="8" y="2" width="4" height="24" fill="white" stroke="black" stroke-width="1"/></svg>') 10 14, text !important;
  }
}
CSS_END

echo "✅ Added larger cursor styles"
echo ""
echo "📋 Cursor sizes:"
echo "  - Normal cursor: 24x24px (instead of default ~16px)"
echo "  - Hover cursor: 28x28px (on buttons/links)"
echo "  - Text cursor: Custom I-beam (20x28px)"
echo ""

echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🖱️  Cursor changes:"
    echo "   ✅ All cursors 50% larger on desktop"
    echo "   ✅ White with black outline (visible on any bg)"
    echo "   ✅ Only affects desktop (min-width: 768px)"
    echo "   ✅ Mobile unchanged"
    echo ""
    echo "🚀 Ready to deploy!"
else
    echo "❌ Build failed"
    cp app/globals.css.backup-cursor-$(date +%Y%m%d-%H%M%S) app/globals.css
    exit 1
fi

