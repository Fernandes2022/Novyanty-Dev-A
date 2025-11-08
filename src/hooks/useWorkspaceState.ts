"use client";

import { useState } from 'react';
import { Block, Draft } from '@/types/api';

export interface WorkspaceStore {
  currentDraft: Draft | null;
  blocks: Block[];
  selectedBlockId: string | null;
}

export function useWorkspaceState() {
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const loadDraft = (draft: Draft) => {
    setCurrentDraft(draft);
    setBlocks(draft.blocks || []);
  };

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: '',
    };
    setBlocks([...blocks, newBlock]);
    if (currentDraft) {
      setCurrentDraft({
        ...currentDraft,
        blocks: [...(currentDraft.blocks || []), newBlock],
      });
    }
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
    if (currentDraft) {
      setCurrentDraft({
        ...currentDraft,
        blocks: (currentDraft.blocks || []).filter((b) => b.id !== blockId),
      });
    }
  };

  const updateBlock = (blockId: string, content: string) => {
    if (!currentDraft || !currentDraft.blocks) return;
    const updatedBlocks = currentDraft.blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );
    setCurrentDraft({
      ...currentDraft,
      blocks: updatedBlocks,
    });
    setBlocks(updatedBlocks);
  };

  const selectBlock = (blockId: string | null) => {
    setSelectedBlockId(blockId);
  };

  return {
    currentDraft,
    blocks,
    selectedBlockId,
    loadDraft,
    addBlock,
    removeBlock,
    updateBlock,
    selectBlock,
  };
}
