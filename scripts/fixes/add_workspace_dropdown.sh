#!/bin/bash

echo "🔧 Adding mobile menu dropdown to workspace..."
echo ""

# Backup
cp app/workspace/page.tsx app/workspace/page.tsx.backup-dropdown-$(date +%Y%m%d-%H%M%S)

# Find the closing </div></div></motion.nav> section (around line 296-298)
LINE_NUM=$(grep -n "</motion.nav>" app/workspace/page.tsx | head -1 | cut -d: -f1)
echo "Found </motion.nav> at line: $LINE_NUM"

# Insert mobile menu BEFORE </motion.nav>
python3 << 'PYTHON_EOF'
with open('app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

# Find </motion.nav>
nav_close_line = None
for i, line in enumerate(lines):
    if '</motion.nav>' in line:
        nav_close_line = i
        break

if nav_close_line:
    # Insert mobile menu before </motion.nav>
    mobile_menu = '''
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
    
    lines.insert(nav_close_line, mobile_menu)
    
    with open('app/workspace/page.tsx', 'w') as f:
        f.writelines(lines)
    
    print(f"✅ Added mobile menu dropdown before line {nav_close_line + 1}")
else:
    print("❌ Could not find </motion.nav>")
    exit(1)

PYTHON_EOF

# Now add the hamburger button
echo ""
echo "Adding hamburger button..."

# Find the "Go Live" button closing and add hamburger after it
LINE_NUM=$(grep -n "Go Live" app/workspace/page.tsx | tail -1 | cut -d: -f1)
BUTTON_CLOSE=$((LINE_NUM + 1))

echo "Adding hamburger button after line $BUTTON_CLOSE"

python3 << 'PYTHON_EOF'
with open('app/workspace/page.tsx', 'r') as f:
    lines = f.readlines()

# Find "Go Live" and add button after its closing tag
for i, line in enumerate(lines):
    if 'Go Live' in line:
        # Find the next </motion.button>
        for j in range(i, min(i + 10, len(lines))):
            if '</motion.button>' in lines[j]:
                # Insert hamburger button after this
                hamburger = '''
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-white hover:text-purple-400 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
'''
                lines.insert(j + 1, hamburger)
                print(f"✅ Added hamburger button after line {j + 2}")
                break
        break

with open('app/workspace/page.tsx', 'w') as f:
    f.writelines(lines)

PYTHON_EOF

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Workspace mobile menu complete:"
    echo "   ✅ Hamburger button (☰) - visible on mobile"
    echo "   ✅ Sign In button in menu"
    echo "   ✅ Back to Home link"
    echo ""
    echo "⏸️  NOT DEPLOYED"
else
    echo "❌ Build failed"
    cp app/workspace/page.tsx.backup-dropdown-$(date +%Y%m%d-%H%M%S) app/workspace/page.tsx
    exit 1
fi

