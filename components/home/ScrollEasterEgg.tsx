'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const easterEggMessages = [
  { trigger: 95, message: "🎉 Congrats! You found the bottom of the internet!", action: "Go back up" },
];

export function ScrollEasterEgg() {
  const [activeEgg, setActiveEgg] = useState<number | null>(null);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if already shown this session
    const shownBefore = sessionStorage.getItem('easterEggShown');
    if (shownBefore) {
      setHasShownPopup(true);
      return;
    }

    // Show popup after 3 minutes (180 seconds), ONCE per session
    const timer = setTimeout(() => {
      if (!hasShownPopup) {
        setActiveEgg(0);
        setHasShownPopup(true);
        sessionStorage.setItem('easterEggShown', 'true');
        
        // Auto-hide after 5 seconds
        setTimeout(() => setActiveEgg(null), 5000);
      }
    }, 180000); // 3 minutes

    return () => clearTimeout(timer);
  }, [hasShownPopup]);

  // Also show if user scrolls to 95% (bottom)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage >= 95 && !hasShownPopup) {
        setActiveEgg(0);
        setHasShownPopup(true);
        sessionStorage.setItem('easterEggShown', 'true');
        setTimeout(() => setActiveEgg(null), 5000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveEgg(null);
  };

  const currentEgg = activeEgg !== null ? easterEggMessages[activeEgg] : null;

  return (
    <AnimatePresence>
      {currentEgg && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl shadow-purple-500/50 backdrop-blur-xl border border-white/20">
            <button onClick={() => setActiveEgg(null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="text-white text-center mb-4">
              <motion.p className="text-lg font-bold" animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : undefined} transition={{ duration: 0.5, repeat: 2 }}>
                {currentEgg.message}
              </motion.p>
            </div>

            {currentEgg.action && (
              <motion.button
                onClick={handleScrollToTop}
                className="w-full py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
              >
                <ArrowUp className="w-5 h-5" />
                {currentEgg.action}
              </motion.button>
            )}

            {!prefersReducedMotion && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{ top: `${20 + i * 20}%`, left: i % 2 === 0 ? '5%' : '95%' }}
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollEasterEgg;
