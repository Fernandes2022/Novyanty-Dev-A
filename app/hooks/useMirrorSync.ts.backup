import { useState, useEffect, useCallback } from 'react';

interface SyncState {
  isSyncing: boolean;
  lastSync: Date | null;
  error: string | null;
}

export function useMirrorSync(autoSync = true) {
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    lastSync: null,
    error: null,
  });

  const [pendingChanges, setPendingChanges] = useState<unknown[]>([]);

  const sync = useCallback(async (changes: unknown[]) => {
    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      // TODO: Implement actual sync logic with backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setSyncState({
        isSyncing: false,
        lastSync: new Date(),
        error: null,
      });
      
      setPendingChanges([]);
    } catch (error) {
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      }));
    }
  }, []);

  const addChange = useCallback((change: unknown) => {
    setPendingChanges((prev) => [...prev, change]);
  }, []);

  const clearChanges = useCallback(() => {
    setPendingChanges([]);
  }, []);

  // Load last sync time from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lastSync');
    if (stored) {
      setSyncState((prev) => ({ ...prev, lastSync: new Date(stored) }));
    }
  }, []);

  // Auto-sync when there are pending changes
  useEffect(() => {
    if (!autoSync || pendingChanges.length === 0 || syncState.isSyncing) {
      return undefined;
    }

    const timer = setTimeout(() => {
      sync(pendingChanges);
    }, 1000); // Debounce 1 second
    
    return () => clearTimeout(timer);
  }, [pendingChanges, autoSync, syncState.isSyncing, sync]);

  return {
    ...syncState,
    sync,
    addChange,
    clearChanges,
    pendingChanges: pendingChanges.length,
  };
}
