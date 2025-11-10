'use client';

import { X, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function SettingsModal({ isOpen, onClose, currentTheme, onThemeChange }: SettingsModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl transition-colors ${currentTheme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <div className={`flex items-center justify-between p-6 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className={`text-sm font-semibold mb-3 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>APPEARANCE</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onThemeChange('light')} className={`p-4 rounded-xl border-2 transition-all ${currentTheme === 'light' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : currentTheme === 'dark' ? 'border-gray-700 bg-gray-800 hover:border-gray-600' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-3 rounded-lg ${currentTheme === 'light' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-700'}`}>
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${currentTheme === 'light' ? 'text-purple-600' : currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Light</span>
                </div>
              </button>

              <button onClick={() => onThemeChange('dark')} className={`p-4 rounded-xl border-2 transition-all ${currentTheme === 'dark' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-3 rounded-lg ${currentTheme === 'dark' ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gray-300'}`}>
                    <Moon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-purple-400' : 'text-gray-700'}`}>Dark</span>
                </div>
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${currentTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Theme preference is saved automatically and only applies to the workspace.</p>
          </div>
        </div>

        <div className={`p-6 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <button onClick={onClose} className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium">Done</button>
        </div>
      </div>
    </div>
  );
}
