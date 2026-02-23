"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { schoolHostels, Hostel } from "@/data/hostel";

interface FavoriteContextType {
  favoriteIds: string[];
  favoriteHostels: Hostel[];
  toggleFavorite: (hostelId: string) => void;
  isFavorite: (hostelId: string) => boolean;
  clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favoriteHostels");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const timer = setTimeout(() => {
            setFavoriteIds(parsed);
            setIsHydrated(true);
          }, 0);
          return () => clearTimeout(timer);
        } catch (e) {
          console.error("Failed to parse favorites", e);
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

  // Persist state to localStorage only when it changes and after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("favoriteHostels", JSON.stringify(favoriteIds));
      } catch (e) {
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
          toast.error("Favorites storage full.");
        } else {
          console.error("Failed to save favorites", e);
        }
      }
    }
  }, [favoriteIds, isHydrated]);

  const toggleFavorite = (hostelId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(hostelId)
        ? prev.filter((id) => id !== hostelId)
        : [...prev, hostelId],
    );
  };

  const isFavorite = (hostelId: string) => favoriteIds.includes(hostelId);

  const clearFavorites = () => setFavoriteIds([]);

  const favoriteHostels = schoolHostels.filter((hostel) =>
    favoriteIds.includes(hostel.id),
  ) as Hostel[];

  return (
    <FavoriteContext.Provider
      value={{
        favoriteIds,
        favoriteHostels,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
