'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] p-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full shadow-lg hover:shadow-accent-primary/50 transition-shadow group"
          aria-label="Scroll to top"
        >
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full opacity-0 blur-xl group-hover:opacity-60 transition-opacity"
          />
          
          {/* Chevron Icon */}
          <ChevronUp className="h-6 w-6 text-white relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
