"use client";
import { useState, useEffect, useCallback } from "react";

interface SyncState {
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
}

export function useMirrorSync(draftId: string | null, autoSync: boolean = true) {
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    lastSynced: null,
    error: null
  });

  const [pendingChanges, setPendingChanges] = useState<any[]>([]);

  const sync = useCallback(async (changes: any) => {
    if (!draftId) return;

    setSyncState(prev => ({ ...prev, isSyncing: true, error: null }));

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          draftId,
          content: changes
        })
      });

      if (!response.ok) {
        throw new Error("Sync failed");
      }

      setSyncState({
        isSyncing: false,
        lastSynced: new Date(),
        error: null
      });

      setPendingChanges([]);
    } catch (error) {
      setSyncState(prev => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : "Sync failed"
      }));
    }
  }, [draftId]);

  const queueChange = useCallback((change: any) => {
    setPendingChanges(prev => [...prev, change]);
  }, []);

  useEffect(() => {
    if (autoSync && pendingChanges.length > 0 && !syncState.isSyncing) {
      const timer = setTimeout(() => {
        sync(pendingChanges);
      }, 1000); // Debounce 1 second

      return () => clearTimeout(timer);
    }
  }, [pendingChanges, autoSync, syncState.isSyncing, sync]);

  return {
    ...syncState,
    sync,
    queueChange,
    hasPendingChanges: pendingChanges.length > 0
  };
}
