"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Hostel, schoolHostels } from "@/data/hostel";

interface HostelContextType {
  hostels: Hostel[];
  addHostel: (hostel: Hostel) => void;
  updateHostel: (id: string, updatedHostel: Partial<Hostel>) => void;
  deleteHostel: (id: string) => void;
  getHostelBySlug: (slug: string) => Hostel | undefined;
  getHostelsBySchool: (schoolSlug: string) => Hostel[];
  resetHostels: () => void;
  isLoading: boolean;
}

const HOSTELS_KEY = "campus-hostels";

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export const HostelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hostels, setHostels] = useState<Hostel[]>(schoolHostels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(HOSTELS_KEY);
      let hydratedHostels = schoolHostels;

      if (saved) {
        try {
          hydratedHostels = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse hostels from localStorage", e);
        }
      }

      // Using setTimeout to avoid synchronous setState warning in effect body
      const timer = setTimeout(() => {
        setHostels(hydratedHostels);
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  /* Cross-tab Synchronization */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === HOSTELS_KEY && e.newValue) {
        try {
          setHostels(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Storage sync failed", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      try {
        localStorage.setItem(HOSTELS_KEY, JSON.stringify(hostels));
      } catch (e) {
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
          // Fallback: Strip only base64 data-URI images (agent uploads) to save space,
          // but keep path-based images (e.g. /images/hostels/hostel1.png) from seed data.
          try {
            const liteHostels = hostels.map((h) => ({
              ...h,
              images: h.images.filter((img) => !img.startsWith("data:")),
            }));
            localStorage.setItem(HOSTELS_KEY, JSON.stringify(liteHostels));
            toast.warning(
              "Storage limit nearly reached. Saved your changes but uploaded photos were removed to free space.",
            );
          } catch (innerError) {
            toast.error(
              "Storage full: Cannot save new changes. Try deleting some listings or reset platform data.",
            );
          }
        } else {
          console.error("Failed to save to localStorage", e);
        }
      }
    }
  }, [hostels, isLoading]);

  const addHostel = (hostel: Hostel) => {
    setHostels((prev) => [hostel, ...prev]);
  };

  const updateHostel = (id: string, updatedHostel: Partial<Hostel>) => {
    setHostels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updatedHostel } : h)),
    );
  };

  const deleteHostel = (id: string) => {
    setHostels((prev) => prev.filter((h) => h.id !== id));
  };

  const getHostelBySlug = (slug: string) => {
    return hostels.find((h) => h.slug === slug);
  };

  const getHostelsBySchool = (schoolSlug: string) => {
    return hostels.filter((h) => h.schoolSlug === schoolSlug);
  };

  const resetHostels = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(HOSTELS_KEY);
      setHostels(schoolHostels);
      toast.success("Platform data reset to defaults");
    }
  };

  return (
    <HostelContext.Provider
      value={{
        hostels,
        addHostel,
        updateHostel,
        deleteHostel,
        getHostelBySlug,
        getHostelsBySchool,
        resetHostels,
        isLoading,
      }}>
      {children}
    </HostelContext.Provider>
  );
};

export const useHostels = () => {
  const context = useContext(HostelContext);
  if (!context) {
    throw new Error("useHostels must be used within a HostelProvider");
  }
  return context;
};
