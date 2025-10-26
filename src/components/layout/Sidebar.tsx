'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface SidebarProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
}

export default function Sidebar({
  children,
  title,
  isOpen,
  onClose,
  side = 'left',
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: side === 'left' ? -320 : 320 }}
        animate={{ x: isOpen ? 0 : side === 'left' ? -320 : 320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed top-0 bottom-0 z-50 w-80 bg-background border-border',
          'lg:static lg:translate-x-0',
          side === 'left' ? 'left-0 border-r' : 'right-0 border-l'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </motion.aside>
    </>
  );
}