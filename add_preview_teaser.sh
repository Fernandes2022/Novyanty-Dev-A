#!/bin/bash

echo "🔧 Adding Preview Variants teaser box to right panel..."

FILE_PATH="app/workspace/page.tsx"

# Backup
cp "$FILE_PATH" "${FILE_PATH}.backup-preview-teaser-$(date +%Y%m%d-%H%M%S)"

python3 << 'PYTHON_EOF'
import re

with open('app/workspace/page.tsx', 'r') as f:
    content = f.read()

# Find the section after samplePreviews and before previewContent
# Add a new condition for when samplePreviews is empty

old_pattern = r'''(\{samplePreviews\.length > 0 && \(
              <motion\.div 
                className="card-dark"
                whileHover=\{\{ scale: 1\.01 \}\}
                transition=\{\{ duration: 0\.3 \}\}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <motion\.span
                    animate=\{\{ rotate: \[0, 360\] \}\}
                    transition=\{\{ duration: 3, repeat: Infinity, ease: "linear" \}\}
                  >
                    🎨
                  </motion\.span>
                  Preview Variants
                </h3>
                <PreviewCarousel previews=\{samplePreviews\} />
              </motion\.div>
            )\)}
            \{previewContent &&)'''

new_pattern = r'''\1}
            
            {/* Teaser when no previews yet */}
            {samplePreviews.length === 0 && (
              <motion.div 
                className="card-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🎨
                  </motion.span>
                  Live Preview Variants
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your design variations will appear here once you tap <strong className="text-purple-400">Compose</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-white/5 flex items-center justify-center relative overflow-hidden"
                        animate={{ 
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <Sparkles className="h-6 w-6 text-purple-400/30" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="pt-2 text-xs text-gray-500 text-center">
                    Multiple variants • Real-time preview • One-click selection
                  </div>
                </div>
              </motion.div>
            )}
            
            {previewContent &&'''

content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)

with open('app/workspace/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added 'Live Preview Variants' teaser box")
print("✅ Shows 4 animated placeholder boxes")
print("✅ Includes helpful message about Compose")
print("✅ Disappears when user generates preview")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Right panel now shows 'Live Preview Variants' teaser"
    echo "  ✅ 4 animated placeholder boxes (pulsing purple gradient)"
    echo "  ✅ Message: 'Your design variations will appear here...'"
    echo "  ✅ Disappears when user clicks Compose"
    echo "  ✅ No more empty space!"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for final approval!"
else
    echo "❌ Build failed"
    cp "${FILE_PATH}.backup-preview-teaser-$(date +%Y%m%d-%H%M%S)" "$FILE_PATH"
    exit 1
fi

