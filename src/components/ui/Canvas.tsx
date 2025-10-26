'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Monitor } from 'lucide-react';

interface CanvasProps {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export default function Canvas({ children, isLoading, className }: CanvasProps) {
  return (
    <div className={cn('flex flex-col h-full bg-muted/30', className)}>
      {/* Browser Frame Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-background border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground">
            <Monitor className="w-4 h-4" />
            <span>Live Preview</span>
          </div>
        </div>
      </div>

      {/* Canvas Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Generating preview...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="min-h-full p-8"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}