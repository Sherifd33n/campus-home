"use client";

import { useState, useCallback } from "react";
import { SearchFilter, SearchResult } from "@/types";
import { hostelService } from "@/services/hostel.service";

interface UseSearchReturn {
  results: SearchResult | null;
  isLoading: boolean;
  error: string | null;
  search: (filter: SearchFilter) => Promise<void>;
  clearResults: () => void;
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filter: SearchFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await hostelService.getHostels(filter);
      setResults(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return { results, isLoading, error, search, clearResults };
}
