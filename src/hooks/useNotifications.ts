"use client";

import { useState, useEffect, useCallback } from "react";
import { Notification } from "@/types";
import { notificationService } from "@/services/notification.service";

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refetch: () => void;
}

export function useNotifications(userId: string): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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
      const data = await notificationService.getUserNotifications(userId);
      setNotifications(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load notifications.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const markAsRead = useCallback(async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(async () => {
    await notificationService.markAllAsRead(userId);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return { notifications, unreadCount, isLoading, error, markAsRead, markAllAsRead, refetch: fetch };
}
