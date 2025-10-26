'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
} from 'lucide-react';

interface ToolbarProps {
  onAction?: (action: string) => void;
  className?: string;
}

export default function Toolbar({ onAction, className }: ToolbarProps) {
  const tools = [
    { icon: Bold, action: 'bold', label: 'Bold' },
    { icon: Italic, action: 'italic', label: 'Italic' },
    { icon: Underline, action: 'underline', label: 'Underline' },
    { icon: AlignLeft, action: 'align-left', label: 'Align Left' },
    { icon: AlignCenter, action: 'align-center', label: 'Align Center' },
    { icon: AlignRight, action: 'align-right', label: 'Align Right' },
    { icon: Palette, action: 'color', label: 'Color' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center gap-1 p-2 bg-background border border-border rounded-xl shadow-lg',
        className
      )}
    >
      {tools.map((tool) => (
        <button
          key={tool.action}
          onClick={() => onAction?.(tool.action)}
          className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          title={tool.label}
        >
          <tool.icon className="w-4 h-4" />
        </button>
      ))}
    </motion.div>
  );
}