'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const feedbackOptions = [
  { emoji: '🔥', label: 'Fire!', value: 'fire' },
  { emoji: '😍', label: 'Love it', value: 'love' },
  { emoji: '👍', label: 'Good', value: 'good' },
  { emoji: '😐', label: 'Meh', value: 'meh' },
  { emoji: '💤', label: 'Boring', value: 'boring' },
];

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = () => {
    if (!selectedFeedback) return;
    console.log('Feedback submitted:', { feedback: selectedFeedback, comment });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setSelectedFeedback(null);
      setComment('');
    }, 2000);
  };

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
          Quick feedback
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
                  <h3 className="text-xl font-bold text-white">{isSubmitted ? '🎉 Thanks!' : 'Was this page...'}</h3>
                  <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {!isSubmitted ? (
                  <>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {feedbackOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          onClick={() => setSelectedFeedback(option.value)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                            selectedFeedback === option.value ? 'bg-gradient-to-br from-purple-600 to-pink-600 scale-110' : 'bg-white/5 hover:bg-white/10'
                          }`}
                          whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
                          whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                        >
                          <span className="text-2xl">{option.emoji}</span>
                          <span className="text-xs text-white/70">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {selectedFeedback && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Anything else? (optional)"
                          className="w-full h-24 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                        />
                      </motion.div>
                    )}

                    <motion.button
                      onClick={handleSubmit}
                      disabled={!selectedFeedback}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                      whileHover={!prefersReducedMotion && selectedFeedback ? { scale: 1.02 } : {}}
                      whileTap={!prefersReducedMotion && selectedFeedback ? { scale: 0.98 } : {}}
                    >
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </motion.button>
                  </>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
                    <motion.div animate={!prefersReducedMotion ? { rotate: [0, 360] } : undefined} transition={{ duration: 0.5 }} className="text-6xl mb-4">
                      ✨
                    </motion.div>
                    <p className="text-white/80">Your feedback helps us improve!</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingFeedback;
