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
                  
                  {/* Theme Toggle Buttons - CRYSTAL CLEAR */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      onClick={() => handleThemeChange('dark')}
                      className={`relative px-6 py-4 rounded-xl font-semibold transition-all flex flex-col items-center justify-center gap-3 border-2 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white border-accent-primary shadow-lg shadow-accent-primary/50'
                          : 'bg-gray-900 text-gray-500 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active Checkmark */}
                      {theme === 'dark' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                      
                      <Moon className="h-8 w-8" />
                      <span className="text-base">Dark Mode</span>
                      
                      {theme === 'dark' && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                        />
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleThemeChange('light')}
                      className={`relative px-6 py-4 rounded-xl font-semibold transition-all flex flex-col items-center justify-center gap-3 border-2 ${
                        theme === 'light'
                          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white border-accent-primary shadow-lg shadow-accent-primary/50'
                          : 'bg-gray-900 text-gray-500 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active Checkmark */}
                      {theme === 'light' && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                      
                      <Sun className="h-8 w-8" />
                      <span className="text-base">Light Mode</span>
                      
                      {theme === 'light' && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                        />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Current Selection Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-sm text-gray-400"
                  >
                    Current: <span className="text-accent-primary font-semibold">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </motion.div>
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
