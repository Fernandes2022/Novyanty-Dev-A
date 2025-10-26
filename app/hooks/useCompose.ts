"use client";
import { useState } from "react";

interface ComposePayload {
  directive: string;
  tier?: "basic" | "enhanced" | "premium" | "ultra";
  references?: string[];
  userId?: string;
}

interface ComposeResponse {
  success: boolean;
  draftId?: string;
  previewData?: any;
  error?: string;
}

export function useCompose() {
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDraftId, setLastDraftId] = useState<string | null>(null);

  const compose = async (payload: ComposePayload): Promise<ComposeResponse> => {
    if (!payload.directive || payload.directive.trim().length === 0) {
      setError("Please enter a directive");
      return { success: false, error: "Directive is required" };
    }

    setIsComposing(true);
    setError(null);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Composition failed");
      }

      if (data.draftId) {
        setLastDraftId(data.draftId);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Composition failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsComposing(false);
    }
  };

  const updateDraft = async (draftId: string, content: any): Promise<boolean> => {
    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ draftId, content })
      });

      const data = await response.json();
      return data.success;
    } catch (err) {
      console.error("Update failed:", err);
      return false;
    }
  };

  const publish = async (draftId: string, customDomain?: string): Promise<{ success: boolean; url?: string }> => {
    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ draftId, customDomain })
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Publish failed:", err);
      return { success: false };
    }
  };

  return {
    compose,
    updateDraft,
    publish,
    isComposing,
    error,
    lastDraftId
  };
}
