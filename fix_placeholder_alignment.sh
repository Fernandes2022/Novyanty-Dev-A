#!/bin/bash

echo "🔧 Fixing placeholder alignment across all forms..."

# Backup
cp app/globals.css app/globals.css.backup-placeholder-$(date +%Y%m%d-%H%M%S)

# Add placeholder alignment CSS
cat >> app/globals.css << 'CSS_EOF'

/* ================================
   PLACEHOLDER ALIGNMENT FIX
   ================================ */

/* All input and textarea placeholders - left aligned */
input::placeholder,
textarea::placeholder {
  text-align: left !important;
  opacity: 0.6;
}

/* Ensure input fields themselves are left-aligned */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="url"],
input[type="password"],
textarea {
  text-align: left !important;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  input::placeholder,
  textarea::placeholder {
    text-align: left !important;
    font-size: 0.9rem;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="url"],
  input[type="password"],
  textarea {
    text-align: left !important;
    width: 100% !important;
  }
}

CSS_EOF

echo "✅ Placeholder alignment CSS added"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🚀 Deploying..."
    
    git add .
    git commit -m "fix: Placeholder alignment in all forms

- Placeholders left-aligned properly
- Consistent on mobile and desktop
- Input fields properly aligned"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED!"
    echo "🌐 Live in 2-3 minutes!"
    echo ""
    echo "✅ Placeholders now properly aligned!"
else
    echo "❌ Build failed"
    cp app/globals.css.backup-placeholder-$(date +%Y%m%d-%H%M%S) app/globals.css
    exit 1
fi

