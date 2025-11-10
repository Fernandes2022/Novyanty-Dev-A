"use client";

import { Cloud, CloudOff, Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";

interface MirrorSyncIndicatorProps {
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
  hasPendingChanges: boolean;
}

/**
 * MirrorSyncIndicator Component
 * 
 * @description Visual feedback for sync status with pulse animations
 * @uses Accent color (#7B5CFF) for active states
 * @animations Framer Motion fade and pulse effects
 */
export function MirrorSyncIndicator({
  isSyncing,
  lastSynced,
  error,
  hasPendingChanges
}: MirrorSyncIndicatorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700"
    >
      {isSyncing ? (
        <>
          {/* Syncing state with accent color pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Loader2 className="h-4 w-4 text-accent-primary animate-spin" />
          </motion.div>
          <motion.span 
            className="text-xs font-semibold text-accent-primary"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Syncing...
          </motion.span>
        </>
      ) : error ? (
        <>
          {/* Error state */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <CloudOff className="h-4 w-4 text-red-600" />
          </motion.div>
          <span className="text-xs font-semibold text-red-600">Sync failed</span>
        </>
      ) : hasPendingChanges ? (
        <>
          {/* Pending state with subtle pulse */}
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Cloud className="h-4 w-4 text-yellow-500" />
          </motion.div>
          <span className="text-xs font-semibold text-gray-300">Pending...</span>
        </>
      ) : lastSynced ? (
        <>
          {/* Success state with accent color */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Check className="h-4 w-4 text-accent-secondary" />
          </motion.div>
          <motion.span 
            className="text-xs font-semibold text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Synced
          </motion.span>
        </>
      ) : (
        <>
          {/* Idle state */}
          <Cloud className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500">Not synced</span>
        </>
      )}
    </motion.div>
  );
}
