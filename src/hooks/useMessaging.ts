"use client";

import { useState, useEffect, useCallback } from "react";
import { Conversation, Message } from "@/types";
import { messagingService } from "@/services/messaging.service";

interface UseMessagingReturn {
  conversations: Conversation[];
  activeMessages: Message[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  refetch: () => void;
}

export function useMessaging(userId: string): UseMessagingReturn {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagingService.getConversations(userId);
      setConversations(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load conversations.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setActiveConvId(conversationId);
    try {
      const messages = await messagingService.getMessages(conversationId);
      setActiveMessages(messages);
      await messagingService.markAsRead(conversationId, userId);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load messages.");
    }
  }, [userId]);

  const sendMessage = useCallback(async (conversationId: string, text: string) => {
    try {
      const newMsg = await messagingService.sendMessage(conversationId, userId, text);
      setActiveMessages((prev) => [...prev, newMsg]);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to send message.");
    }
  }, [userId]);

  return { conversations, activeMessages, activeConversationId: activeConvId, isLoading, error, loadMessages, sendMessage, refetch: fetchConversations };
}
