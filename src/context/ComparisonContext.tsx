"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface ComparisonContextType {
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined,
);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hostel-comparison");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const timer = setTimeout(() => {
            setComparisonIds(parsed);
            setIsHydrated(true);
          }, 0);
          return () => clearTimeout(timer);
        } catch (e) {
          console.error("Failed to parse comparison IDs", e);
          const timer = setTimeout(() => {
            setIsHydrated(true);
          }, 0);
          return () => clearTimeout(timer);
        }
      } else {
        const timer = setTimeout(() => {
          setIsHydrated(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Save to localStorage whenever it changes, but only after initial hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("hostel-comparison", JSON.stringify(comparisonIds));
    }
  }, [comparisonIds, isHydrated]);

  const addToComparison = (id: string) => {
    if (comparisonIds.length >= 4) {
      toast.error("You can only compare up to 4 hostels at a time");
      return;
    }
    if (!comparisonIds.includes(id)) {
      setComparisonIds([...comparisonIds, id]);
      toast.success("Added to comparison");
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonIds(comparisonIds.filter((currId) => currId !== id));
    toast.info("Removed from comparison");
  };

  const clearComparison = () => {
    setComparisonIds([]);
  };

  const isInComparison = (id: string) => comparisonIds.includes(id);

  return (
    <ComparisonContext.Provider
      value={{
        comparisonIds,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
