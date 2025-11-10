"use client";

import { X, Monitor, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'dark' | 'light';
  onThemeChange: (theme: 'light' | 'dark') => void;
  isSyncing?: boolean;
}

export default function SettingsModal({ isOpen, onClose, currentTheme, onThemeChange, isSyncing = false }: SettingsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes = [
    { 
      value: 'light' as const, 
      icon: Sun, 
      label: 'Light',
      bg: 'from-amber-400 to-orange-400'
    },
    { 
      value: 'dark' as const, 
      icon: Moon, 
      label: 'Dark',
      bg: 'from-indigo-600 to-purple-600'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
            currentTheme === 'dark' 
              ? 'bg-gray-900 border border-gray-800' 
              : 'bg-[#FAF9F6] border border-gray-200'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b ${currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Monitor className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Appearance
                  </h2>
                  <p className={`text-sm ${
                    currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Customize your workspace theme
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  currentTheme === 'dark'
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Theme Options */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isSelected = currentTheme === themeOption.value;
                
                return (
                  <motion.button
                    key={themeOption.value}
                    onClick={() => onThemeChange(themeOption.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                        : currentTheme === 'dark'
                          ? 'border-gray-800 hover:border-gray-700'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}

                    <div className="flex flex-col items-center gap-3">
                      {/* Icon with gradient background */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${themeOption.bg} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* Label */}
                      <span className={`text-sm font-medium ${
                        isSelected
                          ? 'text-purple-500'
                          : currentTheme === 'dark'
                            ? 'text-gray-300'
                            : 'text-gray-700'
                      }`}>
                        {themeOption.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Info text */}
            <div className={`mt-6 p-4 rounded-lg ${
              currentTheme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
            }`}>
              <p className={`text-xs text-center ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Your theme preference is automatically saved
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-6 border-t ${
            currentTheme === 'dark' ? 'border-gray-800' : 'border-gray-100'
          }`}>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export { SettingsModal };
