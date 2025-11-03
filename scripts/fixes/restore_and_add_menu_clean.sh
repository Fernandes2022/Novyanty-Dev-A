#!/bin/bash

echo "🔧 Restoring from good backup and adding mobile menu cleanly..."
echo ""

# Find a backup before we started adding mobile menu
GOOD_BACKUP=$(ls -t app/page.tsx.backup-revert-zap-* 2>/dev/null | head -1)

if [ -n "$GOOD_BACKUP" ]; then
    echo "Restoring from clean backup: $GOOD_BACKUP"
    cp "$GOOD_BACKUP" app/page.tsx
else
    echo "Using any recent backup..."
    GOOD_BACKUP=$(ls -t app/page.tsx.backup-* 2>/dev/null | head -5 | tail -1)
    cp "$GOOD_BACKUP" app/page.tsx
fi

# New backup
cp app/page.tsx app/page.tsx.backup-clean-menu-$(date +%Y%m%d-%H%M%S)

echo ""
echo "=== Adding mobile menu components step by step ==="

# 1. Add state
echo "1. Adding mobileMenuOpen state..."
sed -i '/const \[isVoicePlaying, setIsVoicePlaying\] = useState(false);/a\  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);' app/page.tsx

# 2. Add icons to import
echo "2. Adding Menu and X icons to imports..."
sed -i 's/, Eye } from "lucide-react";/, Eye, Menu, X } from "lucide-react";/' app/page.tsx

# 3. Find and show current mobile section
LINE_NUM=$(grep -n 'className="md:hidden flex items-center gap-2"' app/page.tsx | head -1 | cut -d: -f1)
echo "3. Found mobile section at line: $LINE_NUM"

# 4. Replace just the mobile button section
python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Find and replace the mobile menu section
old_pattern = r'<div className="md:hidden flex items-center gap-2">\s*<Link href="/workspace">\s*<motion\.button[^>]*>.*?Get Started.*?</motion\.button>\s*</Link>\s*</div>'

new_pattern = '''<div className="md:hidden flex items-center gap-2">
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
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
                        whileTap={{ scale: 0.95 }} 
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
          </div>
        </motion.nav>'''

content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Mobile menu added cleanly")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Mobile menu complete!"
else
    echo "❌ Build failed - checking issue..."
    grep -n "md:hidden" app/page.tsx | head -5
    exit 1
fi

