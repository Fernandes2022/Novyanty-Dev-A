"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreviewCarouselProps {
  previews: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export function PreviewCarousel({ previews }: PreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % previews.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length);
  };

  if (previews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No previews available
      </div>
    );
  }

  const current = previews[currentIndex];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 border-2 border-indigo-200 dark:border-indigo-800"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {current.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {current.content}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={previous}
          className="p-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>

        <div className="flex gap-2">
          {previews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 bg-indigo-600 dark:bg-indigo-400"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
