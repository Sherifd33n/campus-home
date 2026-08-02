"use client";

import { useState, useEffect, useCallback } from "react";
import { Payment, Receipt } from "@/types";
import { paymentService } from "@/services/payment.service";

interface UsePaymentsReturn {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  initiatePayment: (bookingId: string, amount: number, method: "CARD" | "BANK_TRANSFER" | "USSD") => Promise<Payment | null>;
  getReceipt: (paymentId: string) => Promise<Receipt | null>;
  refetch: () => void;
}

export function usePayments(userId: string): UsePaymentsReturn {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await paymentService.getUserPayments(userId);
      setPayments(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load payments.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const initiatePayment = useCallback(
    async (bookingId: string, amount: number, method: "CARD" | "BANK_TRANSFER" | "USSD"): Promise<Payment | null> => {
      try {
        const payment = await paymentService.initiatePayment(bookingId, amount, method);
        setPayments((prev) => [payment, ...prev]);
        return payment;
      } catch (err: unknown) {
        setError((err as Error).message || "Payment initiation failed.");
        return null;
      }
    },
    []
  );

  const getReceipt = useCallback(async (paymentId: string): Promise<Receipt | null> => {
    return paymentService.getReceipt(paymentId);
  }, []);

  return { payments, isLoading, error, initiatePayment, getReceipt, refetch: fetch };
}
