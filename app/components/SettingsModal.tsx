"use client";

import { X, Palette, Globe, Bell, Lock, Sun, Moon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMirrorSync } from "@/app/hooks/useMirrorSync";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const mirrorSync = useMirrorSync();

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Handle theme change with MirrorSync broadcast
  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Broadcast theme change to mirror components via MirrorSync
    mirrorSync.sync([{
      type: 'theme',
      value: {
        mode: newTheme,
        accentPrimary: '#7B5CFF',
        accentSecondary: '#00F5A0'
      }
    }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-gray-800 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Theme Toggle Section - ENHANCED */}
                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="h-6 w-6 text-accent-primary" />
                    <h3 className="text-xl font-bold text-white">Appearance</h3>
                  </div>
                  <p className="text-gray-400 mb-6">Choose your preferred theme</p>
                  

                  
                </div>
                  {/* Theme Toggle - Pro Dev Design */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 border ${
                        theme === 'dark'
                          ? 'bg-accent-primary/10 text-white border-accent-primary/50 shadow-sm'
                          : 'bg-gray-900/50 text-gray-400 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                      {theme === 'dark' && (
                        <Check className="h-3.5 w-3.5 text-accent-secondary" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleThemeChange('light')}
                      className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 border ${
                        theme === 'light'
                          ? 'bg-accent-primary/10 text-white border-accent-primary/50 shadow-sm'
                          : 'bg-gray-900/50 text-gray-400 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                      {theme === 'light' && (
                        <Check className="h-3.5 w-3.5 text-accent-secondary" />
                      )}
                    </motion.button>
                  </div>
                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-accent-primary" />
                    <h3 className="text-xl font-bold text-white">Language</h3>
                  </div>
                  <select className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded-lg text-white font-semibold">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="h-6 w-6 text-accent-primary" />
                    <h3 className="text-xl font-bold text-white">Notifications</h3>
                  </div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                    <span className="text-gray-400 font-semibold">Enable email notifications</span>
                  </label>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-accent-primary" />
                    <h3 className="text-xl font-bold text-white">Privacy</h3>
                  </div>
                  <button 
                    onClick={() => alert("Privacy settings coming soon!")}
                    className="text-accent-primary hover:text-accent-secondary font-semibold transition-colors"
                  >
                    Manage Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
