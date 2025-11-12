'use client';

import { useEffect } from 'react';
import { CursorTrail } from './cursor-script';
import { SuppressHydrationWarning } from './suppressHydration';
import { useMirrorSync } from './hooks/useMirrorSync';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const mirrorSync = useMirrorSync();

  useEffect(() => {
    console.log('✅ MirrorSync ready');
  }, [mirrorSync]);

  return (
    <>
      <CursorTrail />
      <SuppressHydrationWarning />
      {children}
    </>
  );
}
