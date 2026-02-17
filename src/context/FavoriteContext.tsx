"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  // Use lazy initialization to recover state on mount
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favoriteHostels");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse favorites", e);
        }
      }
    }
    return [];
  });

  // Persist state to localStorage only when it changes
  useEffect(() => {
    localStorage.setItem("favoriteHostels", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

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
