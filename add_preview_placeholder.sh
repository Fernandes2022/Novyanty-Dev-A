#!/bin/bash

echo "🔧 Adding Preview Variants placeholder to right panel..."

FILE_PATH="app/workspace/page.tsx"

# Backup
cp "$FILE_PATH" "${FILE_PATH}.backup-preview-placeholder-$(date +%Y%m%d-%H%M%S)"

python3 << 'PYTHON_EOF'
import re

with open('app/workspace/page.tsx', 'r') as f:
    content = f.read()

# Find the right panel and add placeholder before the previewContent check
# Add it right after samplePreviews section

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
            
            {/* Placeholder when no preview yet */}
            {!previewContent && samplePreviews.length === 0 && (
              <motion.div 
                className="card-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🎨
                  </motion.span>
                  Preview Variants
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Your compositions will appear here once you tap <strong className="text-purple-400">Compose</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="aspect-video rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-white/10 flex items-center justify-center"
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      >
                        <Sparkles className="h-8 w-8 text-purple-400 opacity-50" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {previewContent &&'''

content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)

with open('app/workspace/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added Preview Variants placeholder")
print("✅ Shows teaser when no preview exists")
print("✅ Disappears when user clicks Compose")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Changes:"
    echo "  ✅ Right panel now shows Preview Variants placeholder"
    echo "  ✅ 2 animated boxes with sparkle icons"
    echo "  ✅ Message: 'Compositions will appear here'"
    echo "  ✅ Disappears when user clicks Compose"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready for review!"
else
    echo "❌ Build failed"
    cp "${FILE_PATH}.backup-preview-placeholder-$(date +%Y%m%d-%H%M%S)" "$FILE_PATH"
    exit 1
fi

