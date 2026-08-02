"use client";

import { useState, useCallback } from "react";
import { User } from "@/types";
import { userService } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";

interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<string | null>;
  recentlyViewed: string[];
  addRecentlyViewed: (hostelId: string) => Promise<void>;
}

export function useUser(): UseUserReturn {
  const { user: authUser, updateUser: updateAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewedState] = useState<string[]>([]);

  const user: User | null = authUser
    ? {
        id: "user-1",
        name: authUser.name,
        email: authUser.email,
        role: authUser.role,
        phone: authUser.phone,
        image: authUser.image || undefined,
        createdAt: new Date().toISOString(),
      }
    : null;

  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const { role, ...profileData } = data;
        updateAuthUser({
          ...profileData,
          ...(role === "student" || role === "agent" ? { role } : {}),
        });
        return true;
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to update profile.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [updateAuthUser]
  );

  const uploadAvatar = useCallback(
    async (file: File): Promise<string | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await userService.uploadAvatar(user?.id || "user-1", file);
        updateAuthUser({ image: url });
        return url;
      } catch (err: unknown) {
        setError((err as Error).message || "Failed to upload avatar.");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id, updateAuthUser]
  );

  const addRecentlyViewed = useCallback(
    async (hostelId: string) => {
      if (user?.id) {
        await userService.addRecentlyViewed(user.id, hostelId);
        setRecentlyViewedState((prev) => [hostelId, ...prev.filter((id) => id !== hostelId)]);
      }
    },
    [user?.id]
  );

  return { user, isLoading, error, updateProfile, uploadAvatar, recentlyViewed, addRecentlyViewed };
}
