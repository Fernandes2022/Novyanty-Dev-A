'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Block } from '@/types/api';
import { Grip, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditableBlockProps {
  block: Block;
  onUpdate: (blockId: string, content: string) => void;
  onDelete: (blockId: string) => void;
}

export default function EditableBlock({ block, onUpdate, onDelete }: EditableBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  const handleSave = () => {
    onUpdate(block.id, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(block.content);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDelete(block.id)}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          aria-label="Delete block"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-3">
        <div className="mt-1 cursor-move text-slate-400">
          <Grip className="w-4 h-4" />
        </div>

        <div className="flex-1">
          {block.type === 'heading' && (
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleSave}
              className="w-full text-2xl font-bold text-slate-900 bg-transparent border-none focus:outline-none"
              placeholder="Heading..."
            />
          )}

          {block.type === 'text' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleSave}
              className="w-full text-slate-700 bg-transparent border-none focus:outline-none resize-none"
              placeholder="Text content..."
              rows={3}
            />
          )}

          {block.type === 'image' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500">
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm">Image block</span>
              </div>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleSave}
                className="w-full text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Image URL..."
              />
            </div>
          )}

          {block.type === 'code' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleSave}
              className="w-full font-mono text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              placeholder="Code..."
              rows={5}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
