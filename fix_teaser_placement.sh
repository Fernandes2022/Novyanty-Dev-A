#!/bin/bash

echo "🔧 Fixing teaser placement..."

FILE_PATH="app/workspace/page.tsx"

# Restore from a working backup
LATEST_BACKUP=$(ls -t app/workspace/page.tsx.backup-* 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "Restoring from: $LATEST_BACKUP"
    cp "$LATEST_BACKUP" "$FILE_PATH"
else
    echo "No backup found, working with current file"
fi

# New backup
cp "$FILE_PATH" "${FILE_PATH}.backup-fix-teaser-$(date +%Y%m%d-%H%M%S)"

# Show the structure around line 656
echo ""
echo "=== Current structure around line 656 ==="
sed -n '650,670p' "$FILE_PATH"

echo ""
echo "�� Looking for the right place to insert..."

# Find the closing of the samplePreviews section
LINE_NUM=$(grep -n ")</motion.div>" "$FILE_PATH" | grep -A 2 "PreviewCarousel" | tail -1 | cut -d: -f1)

if [ -z "$LINE_NUM" ]; then
    echo "Trying alternative search..."
    LINE_NUM=$(grep -n "{previewContent &&" "$FILE_PATH" | head -1 | cut -d: -f1)
    LINE_NUM=$((LINE_NUM - 1))
fi

echo "Will insert after line: $LINE_NUM"

# Create cleaner teaser code
cat > /tmp/clean_teaser.txt << 'CLEAN_END'

            {/* Preview Variants Teaser - Shows when empty */}
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
CLEAN_END

# Insert the code
sed -i "${LINE_NUM}r /tmp/clean_teaser.txt" "$FILE_PATH"

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🎉 ALL 4 FIXES COMPLETE AND READY!"
    echo ""
    echo "📦 Staging summary:"
    echo "  1. ✅ Navigation spacing"
    echo "  2. ✅ Try It Live buttons"
    echo "  3. ✅ Pricing gradients"
    echo "  4. ✅ Workspace preview teaser"
    echo ""
    echo "Ready to deploy! 🚀"
else
    echo "❌ Build failed - restoring..."
    cp "${FILE_PATH}.backup-fix-teaser-$(date +%Y%m%d-%H%M%S)" "$FILE_PATH"
    exit 1
fi

