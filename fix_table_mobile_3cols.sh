#!/bin/bash

echo "📱 Fixing comparison table - 3 columns for mobile..."

# Backup
cp app/page.tsx app/page.tsx.backup-table-3cols-$(date +%Y%m%d-%H%M%S)
echo "✅ Backup created"

# Use Python to update the comparison table
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find and replace the comparison table with mobile-optimized 3-column version
# Look for the comparison section
comparison_start = content.find('{/* Comparison Table */')
if comparison_start == -1:
    print("❌ Could not find Comparison Table comment")
    exit(1)

# Find the end of this section (next GradientDivider or Pricing section)
comparison_end = content.find('<GradientDivider />', comparison_start + 100)
if comparison_end == -1:
    comparison_end = content.find('{/* Pricing Section */', comparison_start)

if comparison_end == -1:
    print("❌ Could not find end of comparison section")
    exit(1)

# New mobile-friendly comparison table
new_comparison = '''      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-4">Why Choose Creative Workspace?</h2>
            <p className="text-body max-w-2xl mx-auto">
              See how we compare to traditional development approaches
            </p>
          </motion.div>

          <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden overflow-x-auto">
            {/* Header Row */}
            <div className="grid grid-cols-3 divide-x divide-white/10 min-w-[600px] md:min-w-0">
              <div className="p-3 md:p-8 text-center bg-white/5">
                <h3 className="text-xs md:text-xl font-bold">Metric</h3>
              </div>
              <div className="p-3 md:p-8 text-center">
                <h3 className="text-xs md:text-xl font-bold text-red-400">Traditional</h3>
              </div>
              <div className="p-3 md:p-8 text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <h3 className="text-xs md:text-xl font-bold gradient-text">Creative Workspace</h3>
              </div>
            </div>

            {/* Data Rows */}
            {[
              { metric: "Time to Launch", traditional: "4-8 weeks", workspace: "3 minutes" },
              { metric: "Cost", traditional: "$5,000 - $50,000", workspace: "$9.99/month" },
              { metric: "Technical Skills", traditional: "HTML, CSS, JS required", workspace: "Just speak your vision" },
              { metric: "Revisions", traditional: "Slow & costly", workspace: "Instant & unlimited" },
              { metric: "Maintenance", traditional: "Ongoing dev costs", workspace: "Handled automatically" }
            ].map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 min-w-[600px] md:min-w-0"
              >
                <div className="p-3 md:p-6 font-semibold text-xs md:text-base">{row.metric}</div>
                <div className="p-3 md:p-6 text-white/60 text-xs md:text-base">{row.traditional}</div>
                <div className="p-3 md:p-6 text-green-400 font-semibold text-xs md:text-base">{row.workspace}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile scroll hint */}
          <p className="text-center text-xs text-white/40 mt-4 md:hidden">
            ← Swipe to see full table →
          </p>
        </div>
      </section>

'''

# Replace the old comparison section
content = content[:comparison_start] + new_comparison + content[comparison_end:]

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Comparison table updated with mobile-friendly 3-column layout")

PYTHON_EOF

echo ""
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "�� SUCCESS! Table is now mobile-friendly!"
    echo ""
    echo "📋 Changes made:"
    echo "  ✅ All 3 columns show on mobile"
    echo "  ✅ Smaller text on mobile (text-xs)"
    echo "  ✅ Reduced padding on mobile (p-3)"
    echo "  ✅ Horizontal scroll enabled if needed"
    echo "  ✅ Swipe hint for mobile users"
    echo "  ✅ Full size on desktop/tablet"
    echo ""
    echo "🚀 Deploying now..."
    
    git add .
    git commit -m "fix: Make comparison table fit mobile with 3 columns

- Keeps 3-column layout on all devices
- Smaller text and padding on mobile
- Horizontal scroll enabled for small screens
- Added swipe hint for mobile users
- Fully responsive and no overlap"
    
    git push origin main
    
    echo ""
    echo "✅ DEPLOYED! Table will show 3 columns on all devices!"
    echo "📱 On mobile, users can swipe left/right if needed"
else
    echo ""
    echo "❌ Build failed! Restoring backup..."
    cp app/page.tsx.backup-table-3cols-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

