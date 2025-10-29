'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  emoji?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
  className?: string;
}

export function TestimonialSlider({
  testimonials,
  autoPlayInterval = 4000,
  className = '',
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, prefersReducedMotion, autoPlayInterval]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -10000) {
      paginate(1);
    } else if (swipe > 10000) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
  };

  return (
    <div className={`relative ${className}`} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative h-[320px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={!prefersReducedMotion ? variants : undefined}
            initial={!prefersReducedMotion ? 'enter' : undefined}
            animate="center"
            exit={!prefersReducedMotion ? 'exit' : undefined}
            transition={{ x: { type: 'spring', stiffness: 400, damping: 25 }, opacity: { duration: 0.15 }, scale: { duration: 0.25 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <motion.button
          onClick={() => paginate(-1)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
          whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </motion.button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className="group relative"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' : 'bg-white/30 group-hover:bg-white/50'}`} />
            </button>
          ))}
        </div>

        <motion.button
          onClick={() => paginate(1)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
          whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </motion.button>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-[#1E293B] to-[#334155] rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <blockquote className="text-xl md:text-2xl font-medium text-white mb-6 leading-relaxed">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          {testimonial.emoji && (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
              {testimonial.emoji}
            </div>
          )}

          <div>
            <div className="font-semibold text-white text-lg">{testimonial.author}</div>
            <div className="text-sm text-white/60">{testimonial.role}</div>
          </div>
        </div>

        <div className="absolute top-6 right-6 text-6xl text-white/5 font-serif">"</div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
