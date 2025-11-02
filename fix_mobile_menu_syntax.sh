#!/bin/bash

echo "🔧 Fixing mobile menu syntax error..."
echo ""

# Find latest backup
LATEST_BACKUP=$(ls -t app/page.tsx.backup-* 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "Restoring from: $LATEST_BACKUP"
    cp "$LATEST_BACKUP" app/page.tsx
fi

# New backup
cp app/page.tsx app/page.tsx.backup-menu-fix-$(date +%Y%m%d-%H%M%S)

# Add the mobile menu properly using sed
echo "Adding mobile menu components..."

# 1. First add the state
sed -i '/const \[isVoicePlaying, setIsVoicePlaying\] = useState(false);/a\  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);' app/page.tsx

# 2. Add Menu and X to imports
sed -i 's/Eye } from "lucide-react";/Eye, Menu, X } from "lucide-react";/' app/page.tsx

# 3. Find the mobile menu div and create the replacement
LINE_NUM=$(grep -n '<div className="md:hidden flex items-center gap-2">' app/page.tsx | head -1 | cut -d: -f1)

echo "Found mobile menu at line: $LINE_NUM"

# Create the new mobile menu section in a temp file
cat > /tmp/new_mobile_menu.txt << 'MOBILE_END'
              <div className="md:hidden flex items-center gap-2">
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
        </motion.nav>
MOBILE_END

# Delete old mobile menu section (lines LINE_NUM to LINE_NUM+11) and replace
python3 << PYTHON_EOF
with open('app/page.tsx', 'r') as f:
    lines = f.readlines()

# Find and replace the mobile menu section
start_line = $LINE_NUM - 1  # 0-indexed
end_line = start_line + 11  # Delete 11 lines (original mobile menu + closing tags)

# Read new content
with open('/tmp/new_mobile_menu.txt', 'r') as f:
    new_content = f.read()

# Replace
lines[start_line:end_line] = [new_content]

with open('app/page.tsx', 'w') as f:
    f.writelines(lines)

print(f"✅ Replaced lines {start_line+1} to {end_line+1}")
PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Mobile menu added:"
    echo "   ✅ Hamburger button (☰)"
    echo "   ✅ About, Pricing, FAQ links"
    echo "   ✅ Get Started button"
    echo "   ✅ Smooth animations"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    cp app/page.tsx.backup-menu-fix-$(date +%Y%m%d-%H%M%S) app/page.tsx
    exit 1
fi

