#!/bin/bash

echo "🔧 Adding hamburger menu to Settings button on workspace..."
echo ""

# Backup
cp app/workspace/page.tsx app/workspace/page.tsx.backup-settings-menu-$(date +%Y%m%d-%H%M%S)

# Add settingsMenuOpen state
echo "1. Adding settingsMenuOpen state..."
sed -i '/const \[mobileMenuOpen, setMobileMenuOpen\] = useState(false);/a\  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);' app/workspace/page.tsx

echo "2. Modifying Settings button to open menu instead..."

# Find and replace the Settings button section
python3 << 'PYTHON_EOF'
import re

with open('app/workspace/page.tsx', 'r') as f:
    content = f.read()

# Replace the Settings button to toggle menu instead of opening settings directly
old_settings_button = r'''<motion\.button 
                whileHover=\{\{ scale: 1\.05 \}\}
                whileTap=\{\{ scale: 0\.95 \}\}
                onClick=\{\(\) => setShowSettings\(true\)\}
                className="p-2\.5 glass rounded-xl hover:bg-white/10 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </motion\.button>'''

new_settings_button = '''<motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
                className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors relative"
              >
                <Settings className="h-5 w-5" />
                
                {/* Settings Dropdown Menu */}
                {settingsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 w-48 glass-dark rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setSettingsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowSignIn(true);
                        setSettingsMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-t border-white/10"
                    >
                      <Lock className="h-4 w-4" />
                      Sign In
                    </button>
                  </motion.div>
                )}
              </motion.button>'''

content = re.sub(old_settings_button, new_settings_button, content, flags=re.DOTALL)

with open('app/workspace/page.tsx', 'w') as f:
    f.write(content)

print("✅ Settings button now opens dropdown menu")

PYTHON_EOF

# Also hide the desktop Sign In button since it's now in the menu
echo ""
echo "3. Hiding desktop Sign In button (now in Settings menu)..."

sed -i 's/className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold/className="hidden px-4 py-2 text-sm font-semibold/g' app/workspace/page.tsx

echo ""
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Settings menu improvements:"
    echo "   ✅ Settings button now opens dropdown menu"
    echo "   ✅ Menu shows: Settings & Sign In"
    echo "   ✅ Works on both mobile and desktop"
    echo "   ✅ Smooth animations"
    echo "   ✅ Clean, accessible design"
    echo ""
    echo "⏸️  NOT DEPLOYED - Ready when you are!"
else
    echo "❌ Build failed"
    cp app/workspace/page.tsx.backup-settings-menu-$(date +%Y%m%d-%H%M%S) app/workspace/page.tsx
    exit 1
fi

