"use client";

import { useState, useEffect, useCallback } from "react";
import { Hostel } from "@/types";
import { hostelService } from "@/services/hostel.service";

interface UseHostelReturn {
  hostel: Hostel | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useHostel(slug: string): UseHostelReturn {
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await hostelService.getHostelBySlug(slug);
      setHostel(result);
      if (!result) {
        setError("Hostel not found.");
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load hostel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { hostel, isLoading, error, refetch: fetch };
}
