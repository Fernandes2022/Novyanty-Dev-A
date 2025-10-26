'use client';

import { useState } from 'react';
import { UpdatePayload, UpdateResponse } from '@/types/api';

export function useRefine() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (payload: UpdatePayload): Promise<UpdateResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with short delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      const response: UpdateResponse = {
        success: true,
        message: 'Draft updated successfully!',
      };

      setIsLoading(false);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update draft';
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { update, isLoading, error };
}