"use client";
import { Cloud, CloudOff, Loader2, Check } from "lucide-react";

interface MirrorSyncIndicatorProps {
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
  hasPendingChanges: boolean;
}

export function MirrorSyncIndicator({
  isSyncing,
  lastSynced,
  error,
  hasPendingChanges
}: MirrorSyncIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      {isSyncing ? (
        <>
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
          <span className="text-xs font-semibold text-gray-700">Syncing...</span>
        </>
      ) : error ? (
        <>
          <CloudOff className="h-4 w-4 text-red-600" />
          <span className="text-xs font-semibold text-red-600">Sync failed</span>
        </>
      ) : hasPendingChanges ? (
        <>
          <Cloud className="h-4 w-4 text-yellow-600" />
          <span className="text-xs font-semibold text-gray-700">Pending...</span>
        </>
      ) : lastSynced ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-xs font-semibold text-gray-700">Synced</span>
        </>
      ) : (
        <>
          <Cloud className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500">Not synced</span>
        </>
      )}
    </div>
  );
}
