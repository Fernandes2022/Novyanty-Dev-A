#!/bin/bash

echo "🔧 Manually fixing mobile menu with direct file editing..."
echo ""

# Restore from the good backup again
GOOD_BACKUP=$(ls -t app/page.tsx.backup-revert-zap-* 2>/dev/null | head -1)
cp "$GOOD_BACKUP" app/page.tsx

# Backup
cp app/page.tsx app/page.tsx.backup-manual-menu-$(date +%Y%m%d-%H%M%S)

# 1. Add state
sed -i '/const \[isVoicePlaying, setIsVoicePlaying\] = useState(false);/a\  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);' app/page.tsx

# 2. Add icons
sed -i 's/, Eye } from "lucide-react";/, Eye, Menu, X } from "lucide-react";/' app/page.tsx

# 3. Get the exact line numbers
START_LINE=$(grep -n '<div className="md:hidden flex items-center gap-2">' app/page.tsx | head -1 | cut -d: -f1)
echo "Mobile section starts at line: $START_LINE"

# Show what we're replacing
echo ""
echo "=== Current mobile section (will be replaced) ==="
sed -n "${START_LINE},$((START_LINE + 10))p" app/page.tsx

# 4. Delete the old mobile section (6 lines) and insert new one
python3 << 'PYTHON_EOF'
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

# Find the mobile section
start_idx = None
for i, line in enumerate(lines):
    if 'className="md:hidden flex items-center gap-2"' in line:
        start_idx = i
        break

if start_idx is None:
    print("❌ Could not find mobile section")
    exit(1)

# Find the closing </div> for this section (should be 6 lines down)
# Delete from start_idx to the </Link></div> section

# New mobile menu
new_mobile = '''              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-white hover:text-purple-400 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <motion.div
                initial={{{{ opacity: 0, height: 0 }}}}
                animate={{{{ opacity: 1, height: "auto" }}}}
                exit={{{{ opacity: 0, height: 0 }}}}
                className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
              >
                <div className="px-4 py-6 space-y-4">
                  <Link
                    href="/about"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  
                    href="#pricing"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <Link
                    href="/faq"
                    className="block text-white hover:text-purple-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <div className="pt-4 border-t border-white/10">
                    <Link href="/workspace">
                      <motion.button 
                        whileTap={{{{ scale: 0.95 }}}} 
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-white shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
'''

# Delete 6 lines (the old mobile menu section)
del lines[start_idx:start_idx + 6]

# Insert new mobile menu
lines.insert(start_idx, new_mobile)

with open('app/page.tsx', 'w') as f:
    f.writelines(lines)

print(f"✅ Replaced mobile menu at line {start_idx + 1}")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo "📱 Mobile menu is complete!"
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    exit 1
fi

