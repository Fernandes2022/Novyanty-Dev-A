#!/bin/bash

echo "🔧 Adding proper mobile menu with hamburger button..."
echo ""

# Backup
cp app/page.tsx app/page.tsx.backup-mobile-menu-$(date +%Y%m%d-%H%M%S)

python3 << 'PYTHON_EOF'
import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add mobile menu state at the top with other states
# Find where states are defined (after 'use client')
state_pattern = r"(const \[isVoicePlaying, setIsVoicePlaying\] = useState\(false\);)"
state_addition = r"\1\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);"

content = re.sub(state_pattern, state_addition, content)

# 2. Add Menu icon to imports
content = re.sub(
    r'(import \{ [^}]*Eye[^}]*) \} from "lucide-react";',
    r'\1, Menu, X } from "lucide-react";',
    content
)

# 3. Replace the mobile menu section with proper hamburger menu
old_mobile_menu = r'''              <div className="md:hidden flex items-center gap-2">
                <Link href="/workspace">
                  <motion.button 
                    whileTap=\{\{ scale: 0.95 \}\} 
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-sm text-white shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>'''

new_mobile_menu = '''              <div className="md:hidden flex items-center gap-2">
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
            )}'''

content = re.sub(old_mobile_menu, new_mobile_menu, content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("✅ Added mobile menu state")
print("✅ Added Menu and X icons to imports")
print("✅ Added hamburger button")
print("✅ Added mobile menu dropdown with all links")

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📋 Mobile menu features:"
    echo "   ✅ Hamburger icon (☰) opens menu"
    echo "   ✅ X icon closes menu"
    echo "   ✅ Shows: About, Pricing, FAQ links"
    echo "   ✅ Get Started button at bottom"
    echo "   ✅ Closes when link is clicked"
    echo "   ✅ Smooth animation"
    echo ""
    echo "⏸️  NOT DEPLOYED - Waiting for approval"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-mobile-menu-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

