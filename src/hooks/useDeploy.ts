'use client';

import { useState } from 'react';
import { DeployPayload, DeployResponse } from '@/types/api';

export function useDeploy() {
  const [isLoading, setIsLoading] = useState(false);

  const publish = async (payload: DeployPayload): Promise<DeployResponse> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const subdomain = payload.draftId.slice(0, 8);
        const publishedUrl = `https://${subdomain}.creativespace.app`;

        const response: DeployResponse = {
          success: true,
          url: publishedUrl,
        };

        setIsLoading(false);
        resolve(response);
      }, 1500);
    });
  };

  return { publish, isLoading };
}
