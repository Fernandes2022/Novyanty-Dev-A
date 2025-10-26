"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // DEFAULT TO DARK

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      const darkMode = stored === "dark";
      setIsDark(darkMode);
      document.documentElement.classList.toggle("light", !darkMode);
    } else {
      // DEFAULT TO DARK if no stored preference
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("light", !newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-gray-700 flex items-center px-1 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
        animate={{
          x: isDark ? 0 : 24
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-gray-900" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
