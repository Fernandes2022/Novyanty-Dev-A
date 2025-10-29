'use client';

import { useEffect } from 'react';

export function SuppressHydrationWarning() {
  useEffect(() => {
    // Suppress ALL hydration and Next.js warnings
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const msg = args[0]?.toString() || '';
      if (
        msg.includes('Hydration') ||
        msg.includes('hydration') ||
        msg.includes('__gchrome_uniqueid') ||
        msg.includes('did not match') ||
        msg.includes('server rendered HTML') ||
        msg.includes('tree will be regenerated') ||
        msg.includes('canvas') ||
        msg.includes('suppressHydrationWarning')
      ) {
        return;
      }
      originalError.call(console, ...args);
    };

    console.warn = (...args) => {
      const msg = args[0]?.toString() || '';
      if (
        msg.includes('Hydration') ||
        msg.includes('hydration') ||
        msg.includes('canvas') ||
        msg.includes('Next.js')
      ) {
        return;
      }
      originalWarn.call(console, ...args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
