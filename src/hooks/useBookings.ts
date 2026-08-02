"use client";

import { useState, useEffect, useCallback } from "react";
import { Booking, Visit } from "@/types";
import { bookingService } from "@/services/booking.service";

interface UseBookingsReturn {
  bookings: Booking[];
  visits: Visit[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  cancelBooking: (bookingId: string) => Promise<boolean>;
}

export function useBookings(userId: string): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
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
      const [bookingsData, visitsData] = await Promise.all([
        bookingService.getUserBookings(userId),
        bookingService.getUserVisits(userId),
      ]);
      setBookings(bookingsData);
      setVisits(visitsData);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load bookings.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const cancelBooking = useCallback(async (bookingId: string): Promise<boolean> => {
    try {
      const success = await bookingService.cancelBooking(bookingId);
      if (success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
        );
      }
      return success;
    } catch {
      return false;
    }
  }, []);

  return { bookings, visits, isLoading, error, refetch: fetch, cancelBooking };
}
