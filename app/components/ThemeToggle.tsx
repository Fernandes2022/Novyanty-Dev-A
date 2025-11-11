'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMirrorSync } from '../hooks/useMirrorSync';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const mirrorSync = useMirrorSync();

  useEffect(() => {
    const savedTheme = localStorage.getItem('workspace-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('workspace-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Broadcast via MirrorSync
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
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-3 rounded-xl transition-colors ${
        theme === 'dark' 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </motion.button>
  );
}
