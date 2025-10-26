'use client';

import { useState, useEffect } from 'react';

export function useLocalWorkspace<T>(key: string, initialValue: T | null) {
  const [value, setValue] = useState<T | null>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setValue(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing localStorage:', error);
        }
      }
    }
  }, [key]);

  const updateValue = (newValue: T | null) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    }
  };

  return { value, setValue: updateValue };
}
