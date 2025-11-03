#!/bin/bash

echo "🔧 Adding Preview Variants teaser (simpler method)..."

FILE_PATH="app/workspace/page.tsx"

# Backup
cp "$FILE_PATH" "${FILE_PATH}.backup-teaser-simple-$(date +%Y%m%d-%H%M%S)"

# Find the line with {previewContent &&
LINE_NUM=$(grep -n "{previewContent &&" "$FILE_PATH" | head -1 | cut -d: -f1)
echo "Found {previewContent && at line: $LINE_NUM"

# Create the teaser code
cat > /tmp/teaser_code.txt << 'TEASER_END'

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
TEASER_END

# Insert before the {previewContent && line
sed -i "${LINE_NUM}r /tmp/teaser_code.txt" "$FILE_PATH"

echo "✅ Inserted teaser code before line $LINE_NUM"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Final changes:"
    echo "  ✅ 'Live Preview Variants' teaser added to right panel"
    echo "  ✅ 4 animated placeholder boxes"
    echo "  ✅ Shows when workspace is empty"
    echo "  ✅ Disappears when user Composes"
    echo ""
    echo "🎉 ALL 4 FIXES READY TO DEPLOY!"
    echo ""
    echo "📦 Complete staging list:"
    echo "  1. Navigation spacing fix"
    echo "  2. Try It Live button hover fix"
    echo "  3. Pricing button gradients"
    echo "  4. Workspace preview teaser (NEW!)"
    echo ""
    echo "⏸️  Say 'deploy' to push everything live!"
else
    echo "❌ Build failed"
    cp "${FILE_PATH}.backup-teaser-simple-$(date +%Y%m%d-%H%M%S)" "$FILE_PATH"
    exit 1
fi

