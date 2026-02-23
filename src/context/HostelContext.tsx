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

/**
 * Delta-based storage: instead of saving ALL 300+ hostels (which fills
 * localStorage), we only persist the CHANGES the agent makes:
 *   - added:   full Hostel objects created by the agent
 *   - updated: map of hostelId → partial Hostel fields that were changed
 *   - deleted: array of hostelId strings that were removed
 *
 * On load, we start from the seed data (`schoolHostels`), apply deletions,
 * apply updates, and prepend additions. This keeps storage usage tiny.
 */
interface HostelDelta {
  added: Hostel[];
  updated: Record<string, Partial<Hostel>>;
  deleted: string[];
}

const DELTA_KEY = "campus-hostels-delta";

const HostelContext = createContext<HostelContextType | undefined>(undefined);

/** Check if a hostel ID belongs to the seed data */
function isSeedHostel(id: string): boolean {
  return id.startsWith("ng-");
}

/** Build the full hostel list from seed data + delta */
function applyDelta(delta: HostelDelta): Hostel[] {
  // Start with seed data
  const result = schoolHostels
    // Remove deleted seed hostels
    .filter((h) => !delta.deleted.includes(h.id))
    // Apply updates to seed hostels
    .map((h) => {
      const updates = delta.updated[h.id];
      return updates ? { ...h, ...updates } : h;
    });

  // Prepend agent-added hostels (newest first)
  return [...delta.added, ...result];
}

function loadDelta(): HostelDelta {
  if (typeof window === "undefined")
    return { added: [], updated: {}, deleted: [] };
  try {
    const raw = localStorage.getItem(DELTA_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse hostel delta", e);
  }
  return { added: [], updated: {}, deleted: [] };
}

function saveDelta(delta: HostelDelta) {
  try {
    localStorage.setItem(DELTA_KEY, JSON.stringify(delta));
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      // Last resort: try saving without base64 images in added hostels
      try {
        const liteDelta: HostelDelta = {
          ...delta,
          added: delta.added.map((h) => ({
            ...h,
            images: h.images.filter((img) => !img.startsWith("data:")),
          })),
        };
        localStorage.setItem(DELTA_KEY, JSON.stringify(liteDelta));
        toast.warning(
          "Storage nearly full. Your listing was saved but uploaded photos were removed. Consider deleting unused listings.",
        );
      } catch {
        toast.error(
          "Storage full: Cannot save changes. Try deleting some listings or reset platform data.",
        );
      }
    } else {
      console.error("Failed to save delta", e);
    }
  }
}

export const HostelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hostels, setHostels] = useState<Hostel[]>(schoolHostels);
  const [delta, setDelta] = useState<HostelDelta>({
    added: [],
    updated: {},
    deleted: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // --- Load delta from localStorage on mount ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDelta = loadDelta();

      // Migrate: if old "campus-hostels" key exists, clean it up
      if (localStorage.getItem("campus-hostels")) {
        localStorage.removeItem("campus-hostels");
        // Also clean up old per-image keys
        Object.keys(localStorage)
          .filter((k) => k.startsWith("campus-img-"))
          .forEach((k) => localStorage.removeItem(k));
      }

      const timer = setTimeout(() => {
        setDelta(savedDelta);
        setHostels(applyDelta(savedDelta));
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  /* Cross-tab Synchronization */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === DELTA_KEY && e.newValue) {
        try {
          const newDelta: HostelDelta = JSON.parse(e.newValue);
          setDelta(newDelta);
          setHostels(applyDelta(newDelta));
        } catch (err) {
          console.error("Storage sync failed", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- Persist delta when it changes ---
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      saveDelta(delta);
    }
  }, [delta, isLoading]);

  const addHostel = (hostel: Hostel) => {
    setDelta((prev) => {
      const newDelta = { ...prev, added: [hostel, ...prev.added] };
      setHostels(applyDelta(newDelta));
      return newDelta;
    });
  };

  const updateHostel = (id: string, updatedHostel: Partial<Hostel>) => {
    setDelta((prev) => {
      let newDelta: HostelDelta;

      if (isSeedHostel(id)) {
        // Merge into the updated map for seed hostels
        newDelta = {
          ...prev,
          updated: {
            ...prev.updated,
            [id]: { ...(prev.updated[id] || {}), ...updatedHostel },
          },
        };
      } else {
        // Directly update the added hostel
        newDelta = {
          ...prev,
          added: prev.added.map((h) =>
            h.id === id ? { ...h, ...updatedHostel } : h,
          ),
        };
      }

      setHostels(applyDelta(newDelta));
      return newDelta;
    });
  };

  const deleteHostel = (id: string) => {
    setDelta((prev) => {
      let newDelta: HostelDelta;

      if (isSeedHostel(id)) {
        // Track deletion of seed hostel
        newDelta = {
          ...prev,
          deleted: [...prev.deleted, id],
        };
        // Also remove any updates for this hostel
        newDelta.updated = Object.fromEntries(
          Object.entries(prev.updated).filter(([key]) => key !== id),
        );
      } else {
        // Remove from added list
        newDelta = {
          ...prev,
          added: prev.added.filter((h) => h.id !== id),
        };
      }

      setHostels(applyDelta(newDelta));
      return newDelta;
    });
  };

  const getHostelBySlug = (slug: string) => {
    return hostels.find((h) => h.slug === slug);
  };

  const getHostelsBySchool = (schoolSlug: string) => {
    return hostels.filter((h) => h.schoolSlug === schoolSlug);
  };

  const resetHostels = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DELTA_KEY);
      // Also clean up any legacy keys
      localStorage.removeItem("campus-hostels");
      Object.keys(localStorage)
        .filter((k) => k.startsWith("campus-img-"))
        .forEach((k) => localStorage.removeItem(k));

      const emptyDelta: HostelDelta = { added: [], updated: {}, deleted: [] };
      setDelta(emptyDelta);
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
