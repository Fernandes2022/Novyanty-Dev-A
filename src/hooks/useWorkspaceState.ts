'use client';

import { useState } from 'react';
import { Block, Draft } from '@/types/api';

export interface WorkspaceStore {
  currentDraft: Draft | null;
  isLoading: boolean;
  isSaving: boolean;
  unlockedFeatures: string[];
  setDraft: (draft: Draft) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  unlockFeatures: (features: string[]) => void;
  updateBlock: (blockId: string, content: string) => void;
  deleteBlock: (blockId: string) => void;
  addBlock: (block: Block) => void;
}

export function useWorkspaceState(): WorkspaceStore {
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);

  const setDraft = (draft: Draft) => {
    setCurrentDraft(draft);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setSaving = (saving: boolean) => {
    setIsSaving(saving);
  };

  const unlockFeatures = (features: string[]) => {
    setUnlockedFeatures(features);
  };

  const updateBlock = (blockId: string, content: string) => {
    if (!currentDraft) return;
    const updatedBlocks = currentDraft.blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );
    setCurrentDraft({
      ...currentDraft,
      blocks: updatedBlocks,
      lastEdited: new Date().toISOString(),
    });
  };

  const deleteBlock = (blockId: string) => {
    if (!currentDraft) return;
    const updatedBlocks = currentDraft.blocks.filter((block) => block.id !== blockId);
    setCurrentDraft({
      ...currentDraft,
      blocks: updatedBlocks,
      lastEdited: new Date().toISOString(),
    });
  };

  const addBlock = (block: Block) => {
    if (!currentDraft) return;
    setCurrentDraft({
      ...currentDraft,
      blocks: [...currentDraft.blocks, block],
      lastEdited: new Date().toISOString(),
    });
  };

  return {
    currentDraft,
    isLoading,
    isSaving,
    unlockedFeatures,
    setDraft,
    setLoading,
    setSaving,
    unlockFeatures,
    updateBlock,
    deleteBlock,
    addBlock,
  };
}
