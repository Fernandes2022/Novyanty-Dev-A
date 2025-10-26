"use client";
import { useState } from "react";

interface PaymentPayload {
  amount: number;
  userId: string;
  plan?: "basic" | "pro" | "premium";
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  unlockedFeatures?: string[];
  message?: string;
}

export function usePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (payload: PaymentPayload): Promise<PaymentResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (!isSuccess) {
        throw new Error("Payment processing failed. Please try again.");
      }

      const response: PaymentResponse = {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        unlockedFeatures: [
          "custom_domain",
          "advanced_export",
          "priority_rendering",
          "unlimited_projects",
          "team_collaboration"
        ],
        message: "Payment successful! All premium features unlocked."
      };

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment failed";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    isLoading,
    error
  };
}
