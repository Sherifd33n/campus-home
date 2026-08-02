import { User, Role } from "@/types";
import { setAuthToken, clearAuthTokens, getAuthToken, apiClient } from "./api.client";

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  async login(email: string, role: Role = "student", rememberMe = true): Promise<User> {
    const isAgent = role === "agent" || email.toLowerCase().includes("agent");
    const mockUser: User = {
      id: isAgent ? "agent-1" : "user-1",
      name: isAgent ? "Alexander Wright" : "Student User",
      email: email || (isAgent ? "alex.wright@campus.home" : "student@campus.home"),
      role: isAgent ? "agent" : "student",
      phone: "+234 801 234 5678",
      image: isAgent
        ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
        : undefined,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    const token = "mock-jwt-token-" + Date.now();
    setAuthToken(token, "mock-refresh-token");
    return mockUser;
  },

  async register(data: { name: string; email: string; role: Role; phone?: string }): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    setAuthToken("mock-jwt-token-" + Date.now());
    return newUser;
  },

  async logout(): Promise<void> {
    clearAuthTokens();
  },

  async getCurrentUser(): Promise<User | null> {
    const token = getAuthToken();
    if (!token) return null;

    // In mock mode, token validity check
    return null;
  },

  async refreshToken(): Promise<string> {
    const newToken = "mock-refreshed-jwt-token-" + Date.now();
    setAuthToken(newToken);
    return newToken;
  },
};
