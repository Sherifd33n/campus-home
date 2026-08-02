import { Conversation, Message } from "@/types";

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [
      { id: "user-1", name: "Student User", role: "student" },
      { id: "agent-1", name: "Alexander Wright", role: "agent" },
    ],
    lastMessage: {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "agent-1",
      senderName: "Alexander Wright",
      receiverId: "user-1",
      text: "Hello! Is Premier Lodge still available for inspection tomorrow?",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    unreadCount: 1,
    updatedAt: new Date().toISOString(),
  },
];

const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "user-1",
      senderName: "Student User",
      receiverId: "agent-1",
      text: "Hi! I am interested in Premier Lodge. Is it still available?",
      isRead: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "agent-1",
      senderName: "Alexander Wright",
      receiverId: "user-1",
      text: "Hello! Yes, we have single rooms available. Would you like to schedule an inspection?",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

export const messagingService = {
  async getConversations(userId: string): Promise<Conversation[]> {
    return mockConversations;
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    return mockMessages[conversationId] || [];
  },

  async sendMessage(conversationId: string, senderId: string, text: string): Promise<Message> {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName: "User",
      receiverId: "agent-1",
      text,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    if (!mockMessages[conversationId]) {
      mockMessages[conversationId] = [];
    }
    mockMessages[conversationId].push(newMessage);
    return newMessage;
  },

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    if (mockMessages[conversationId]) {
      mockMessages[conversationId].forEach((m) => {
        if (m.receiverId === userId) m.isRead = true;
      });
    }
  },
};
