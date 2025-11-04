"use client";
import { X, Palette, Globe, Bell, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
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
                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Appearance</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Customize your workspace theme</p>
                  <button 
                    onClick={() => alert("Theme customization coming soon!")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    Change Theme
                  </button>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
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
                    <Bell className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Notifications</h3>
                  </div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Enable email notifications</span>
                  </label>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Privacy</h3>
                  </div>
                  <button 
                    onClick={() => alert("Privacy settings coming soon!")}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
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
