import { Notification, NotificationType } from "@/types";

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Booking Confirmed",
    message: "Your booking for Premier Lodge - Single Room has been confirmed by the agent.",
    type: "Booking",
    date: "2026-08-01",
    isRead: false,
    linkUrl: "/profile?tab=bookings",
  },
  {
    id: "notif-2",
    title: "New Inquiry",
    message: "A student has submitted an inquiry for Royal Residence.",
    type: "Inquiry",
    date: "2026-07-30",
    isRead: true,
    linkUrl: "/agent/dashboard",
  },
];

export const notificationService = {
  async getUserNotifications(userId: string): Promise<Notification[]> {
    return mockNotifications;
  },

  async markAsRead(notificationId: string): Promise<void> {
    const notif = mockNotifications.find((n) => n.id === notificationId);
    if (notif) notif.isRead = true;
  },

  async markAllAsRead(userId: string): Promise<void> {
    mockNotifications.forEach((n) => { n.isRead = true; });
  },

  async getUnreadCount(userId: string): Promise<number> {
    return mockNotifications.filter((n) => !n.isRead).length;
  },

  async addNotification(data: Omit<Notification, "id" | "isRead">): Promise<Notification> {
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      ...data,
      isRead: false,
    };
    mockNotifications.unshift(notif);
    return notif;
  },
};
