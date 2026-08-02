"use client";

import { useState, useEffect, useCallback } from "react";
import { Hostel, SearchFilter, SearchResult } from "@/types";
import { hostelService } from "@/services/hostel.service";

interface UseHostelsReturn {
  hostels: Hostel[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  setFilter: (filter: SearchFilter) => void;
  filter: SearchFilter;
}

export function useHostels(initialFilter: SearchFilter = {}): UseHostelsReturn {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilterState] = useState<SearchFilter>(initialFilter);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result: SearchResult = await hostelService.getHostels(filter);
      setHostels(result.hostels);
      setTotal(result.total);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load hostels. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const setFilter = useCallback((newFilter: SearchFilter) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  }, []);

  return { hostels, total, page, totalPages, isLoading, error, refetch: fetch, setFilter, filter };
}
