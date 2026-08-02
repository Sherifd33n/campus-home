import { User } from "@/types";

export const userService = {
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    // In production, PATCH /api/users/:userId
    return {
      id: userId,
      name: data.name || "",
      email: data.email || "",
      role: data.role || "student",
      phone: data.phone,
      image: data.image,
      bio: data.bio,
      isVerified: data.isVerified || false,
      createdAt: new Date().toISOString(),
    };
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    // In production, POST /api/users/:userId/avatar (multipart form)
    // Return mock URL
    return URL.createObjectURL(file);
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    // In production, POST /api/users/:userId/change-password
    return true;
  },

  async deactivateAccount(userId: string): Promise<boolean> {
    // In production, DELETE /api/users/:userId
    return true;
  },

  async getRecentlyViewed(userId: string): Promise<string[]> {
    if (typeof window === "undefined") return [];
    const key = `campus_home_recently_viewed_${userId}`;
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  },

  async addRecentlyViewed(userId: string, hostelId: string): Promise<void> {
    if (typeof window === "undefined") return;
    const key = `campus_home_recently_viewed_${userId}`;
    try {
      const existing: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      const filtered = existing.filter((id) => id !== hostelId);
      const updated = [hostelId, ...filtered].slice(0, 10);
      localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      // silent
    }
  },
};
