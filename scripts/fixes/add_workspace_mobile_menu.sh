#!/bin/bash

echo "🔧 Adding mobile menu to workspace page..."
echo ""

# Backup
cp app/workspace/page.tsx app/workspace/page.tsx.backup-mobile-$(date +%Y%m%d-%H%M%S)

# 1. Add mobile menu state
echo "1. Adding mobileMenuOpen state..."
sed -i '/const \[showSettings, setShowSettings\] = useState(false);/a\  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);' app/workspace/page.tsx

# 2. Check if Menu and X are imported
echo "2. Checking imports..."
if ! grep -q "Menu.*X.*from 'lucide-react'" app/workspace/page.tsx; then
    echo "   Adding Menu and X to imports..."
    sed -i "s/} from 'lucide-react';/, Menu, X } from 'lucide-react';/" app/workspace/page.tsx
fi

# 3. Find the line with the "Get Started" button (last button in header)
LINE_NUM=$(grep -n 'className="btn-primary text-sm px-4 md:px-6 py-2.5 flex items-center gap-2"' app/workspace/page.tsx | head -1 | cut -d: -f1)
echo "3. Found Get Started button at line: $LINE_NUM"

# 4. Add mobile menu button and dropdown after the desktop buttons
python3 << 'PYTHON_EOF'
with open('app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

# Find the closing </div> after the Get Started button
# Should be around line 295
insert_point = None
for i in range(260, 300):
    if '</div>' in lines[i] and 'flex items-center gap' in lines[i-40]:
        insert_point = i
        break

if insert_point:
    mobile_menu = '''
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-white hover:text-purple-400 transition-colors"
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
              className="sm:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-3">
                <button
                  onClick={() => {
                    setShowSignIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <Link href="/">
                  <button
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
'''
    
    # Insert before the closing </div>
    lines.insert(insert_point, mobile_menu)
    
    with open('app/workspace/page.tsx', 'w') as f:
        f.writelines(lines)
    
    print(f"✅ Added mobile menu at line {insert_point}")
else:
    print("❌ Could not find insertion point")
    exit(1)

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Workspace mobile menu added:"
    echo "   ✅ Hamburger button (☰)"
    echo "   ✅ Sign In button (now visible on mobile)"
    echo "   ✅ Back to Home link"
    echo "   ✅ Settings button already visible"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    cp app/workspace/page.tsx.backup-mobile-$(date +%Y%m%d-%H%M%S) app/workspace/page.tsx
    exit 1
fi

