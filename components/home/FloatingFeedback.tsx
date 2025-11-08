'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Link from 'next/link';

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl shadow-purple-500/50 flex items-center justify-center group"
        whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
        whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div animate={!prefersReducedMotion ? { rotate: [0, 15, -15, 0] } : undefined} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
          <MessageSquare className="w-6 h-6 text-white" />
        </motion.div>

        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <div className="absolute -top-12 right-0 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Contact Us
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-6 z-50 w-full max-w-md"
            >
              <div className="bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">💬 Let&apos;s Chat!</h3>
                  <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-white/80 text-sm">
                    Have questions or need help? We&apos;re here for you!
                  </p>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all text-center"
                  >
                    Go to Contact Page
                  </Link>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/60 text-center">
                      Or email us directly at{' '}
                      <a href="mailto:support@creativeworkspace.com" className="text-purple-400 hover:text-purple-300">
                        support@creativeworkspace.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingFeedback;
