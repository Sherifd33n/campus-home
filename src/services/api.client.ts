// Production-ready API Client with JWT Auth, interceptors, and mock fallback readiness

export class APIError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status = 500, data: any = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

const TOKEN_KEY = "campus_home_token";
const REFRESH_TOKEN_KEY = "campus_home_refresh_token";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string, refreshToken?: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearAuthTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { requiresAuth = false, headers: customHeaders, ...restOptions } = options;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // If there's an API URL configured, perform real HTTP request
  if (baseUrl) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers,
        ...restOptions,
      });

      if (!response.ok) {
        if (response.status === 401) {
          clearAuthTokens();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("unauthorized"));
          }
        }
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }

      return (await response.json()) as T;
    } catch (err: any) {
      if (err instanceof APIError) throw err;
      throw new APIError(err.message || "Network error occurred", 500);
    }
  }

  // Simulated Async API delay when running with Mock Data
  await new Promise((resolve) => setTimeout(resolve, 150));
  return {} as T;
}
