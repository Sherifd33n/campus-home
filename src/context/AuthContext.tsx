"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { validateEmail, validatePassword } from "@/lib/validators";

/* =========================
   TYPES
========================= */

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  university?: string;
  avatar?: string;
  image?: string | null;
  agency?: string;
  role: "student" | "agent";
}

/** Stored account record (includes passwordHash) */
interface StoredAccount extends UserProfile {
  passwordHash: string;
}

export interface Inquiry {
  id: number;
  property: string;
  agent: string;
  date: string;
  status:
    | "Replied"
    | "Pending"
    | "Closed"
    | "Reserved"
    | "Booked"
    | "Contacted"
    | "Archived";
  type?: "Visit" | "Reservation" | "Booking";
  amount?: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  message?: string;
  agentReply?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: "Booking" | "System" | "Inquiry";
}

export interface UserDocument {
  id: string;
  name: string;
  type: "Receipt" | "Agreement";
  date: string;
  hostelName: string;
  amount?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  inquiries: Inquiry[];
  notifications: Notification[];
  documents: UserDocument[];
  login: (email: string, password: string) => Promise<void>;
  signup: (
    userData: Omit<UserProfile, "role">,
    role: "student" | "agent",
    password: string,
  ) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date">) => void;
  addNotification: (
    notificationData: Omit<Notification, "id" | "date" | "isRead">,
  ) => void;
  addDocument: (documentData: Omit<UserDocument, "id" | "date">) => void;
  markNotificationAsRead: (id: string) => void;
  updateInquiryStatus: (id: number, status: Inquiry["status"]) => void;
  replyToInquiry: (id: number, reply: string) => void;
  isLoading: boolean;
}

interface AuthState {
  user: UserProfile | null;
  inquiries: Inquiry[];
  notifications: Notification[];
  documents: UserDocument[];
  isLoading: boolean;
}

/* =========================
   CONSTANTS
========================= */

const USERS_KEY = "campus-accounts";
const SESSION_KEY = "auth-user";
const INQUIRIES_KEY = "auth-inquiries";
const NOTIFICATIONS_KEY = "auth-notifications";
const DOCUMENTS_KEY = "auth-documents";

const defaultInquiries: Inquiry[] = [
  {
    id: 1,
    property: "Sunshine Premium Hostel",
    agent: "Sheriff Jamiu",
    date: "2 days ago",
    status: "Replied",
    studentName: "Demo Student",
    studentEmail: "student@example.com",
  },
  {
    id: 2,
    property: "Green View Apartment",
    agent: "Premium Properties Ltd",
    date: "1 week ago",
    status: "Pending",
    studentName: "Demo Student",
    studentEmail: "student@example.com",
  },
];

/* =========================
   HELPERS
========================= */

/** Lightweight password obfuscation for localStorage demo (not cryptographic). */
function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password));
}

function checkPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

function loadAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: StoredAccount[]): void {
  safeStorage.set(USERS_KEY, accounts);
}

/* =========================
   SAFE STORAGE HELPER
   ========================= */

const safeStorage = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        // We only show toast on the client side
        if (typeof window !== "undefined") {
          import("sonner").then(({ toast }) => {
            toast.error("Storage limit reached. Some data may not be saved.");
          });
        }
      } else {
        console.error(`Failed to save ${key} to localStorage`, e);
      }
    }
  },
};

/* =========================
   CONTEXT
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    inquiries: defaultInquiries,
    notifications: [],
    documents: [],
    isLoading: true,
  });

  /* Load session from localStorage on mount */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedUser: UserProfile | null = null;
    let savedInquiries: Inquiry[] | null = null;

    const userStr = localStorage.getItem(SESSION_KEY);
    const inqStr = localStorage.getItem(INQUIRIES_KEY);

    if (userStr) {
      try {
        savedUser = JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }

    if (inqStr) {
      try {
        savedInquiries = JSON.parse(inqStr);
      } catch (e) {
        console.error("Failed to parse inquiries", e);
      }
    }

    const notiStr = localStorage.getItem(NOTIFICATIONS_KEY);
    const docStr = localStorage.getItem(DOCUMENTS_KEY);

    let savedNotifications: Notification[] = [];
    let savedDocuments: UserDocument[] = [];

    if (notiStr) {
      try {
        savedNotifications = JSON.parse(notiStr);
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }

    if (docStr) {
      try {
        savedDocuments = JSON.parse(docStr);
      } catch (e) {
        console.error("Failed to parse documents", e);
      }
    }

    const timer = setTimeout(() => {
      setState({
        user: savedUser,
        inquiries: savedInquiries || defaultInquiries,
        notifications: savedNotifications,
        documents: savedDocuments,
        isLoading: false,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     LOGIN
  ========================= */

  const login = async (email: string, password: string) => {
    // Client-side field validation
    const emailErr = validateEmail(email);
    if (emailErr) throw new Error(emailErr);

    const passwordErr = validatePassword(password);
    if (passwordErr) throw new Error(passwordErr);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const accounts = loadAccounts();
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase(),
    );

    if (!account || !checkPassword(password, account.passwordHash)) {
      throw new Error("Invalid email or password. Please try again.");
    }

    // Strip passwordHash before storing in session
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _hash, ...profile } = account;
    const user: UserProfile = profile;

    setState((prev) => ({ ...prev, user }));
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  };

  /* =========================
     SIGNUP
  ========================= */

  const signup = async (
    userData: Omit<UserProfile, "role">,
    role: "student" | "agent",
    password: string,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const accounts = loadAccounts();

    // Check for duplicate email
    const exists = accounts.some(
      (a) => a.email.toLowerCase() === userData.email.toLowerCase(),
    );
    if (exists) {
      throw new Error("An account with this email already exists.");
    }

    const newAccount: StoredAccount = {
      ...userData,
      role,
      passwordHash: hashPassword(password),
    };

    saveAccounts([...accounts, newAccount]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _hash, ...profile } = newAccount;
    const user: UserProfile = profile;

    setState((prev) => ({ ...prev, user }));
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    setState((prev) => ({ ...prev, user: null }));
    localStorage.removeItem(SESSION_KEY);
  };

  /* =========================
     UPDATE USER
  ========================= */

  const updateUser = (data: Partial<UserProfile>) => {
    setState((prev) => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...data };
      safeStorage.set(SESSION_KEY, updatedUser);

      // Keep the stored account in sync too
      const accounts = loadAccounts();
      const idx = accounts.findIndex(
        (a) => a.email.toLowerCase() === updatedUser.email.toLowerCase(),
      );
      if (idx !== -1) {
        accounts[idx] = { ...accounts[idx], ...data };
        saveAccounts(accounts);
      }

      return { ...prev, user: updatedUser };
    });
  };

  const addInquiry = (inquiryData: Omit<Inquiry, "id" | "date">) => {
    setState((prev) => {
      const newInquiry: Inquiry = {
        id:
          prev.inquiries.length > 0
            ? Math.max(...prev.inquiries.map((i) => i.id)) + 1
            : 1,
        date: "Just now",
        ...inquiryData,
      };

      const updatedInquiries = [newInquiry, ...prev.inquiries];
      safeStorage.set(INQUIRIES_KEY, updatedInquiries);

      return { ...prev, inquiries: updatedInquiries };
    });
  };

  const addNotification = (
    notificationData: Omit<Notification, "id" | "date" | "isRead">,
  ) => {
    setState((prev) => {
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        date: "Just now",
        isRead: false,
        ...notificationData,
      };

      const updatedNotifications = [newNotification, ...prev.notifications];
      safeStorage.set(NOTIFICATIONS_KEY, updatedNotifications);

      return { ...prev, notifications: updatedNotifications };
    });
  };

  const addDocument = (documentData: Omit<UserDocument, "id" | "date">) => {
    setState((prev) => {
      const newDocument: UserDocument = {
        id: `DOC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        ...documentData,
      };

      const updatedDocuments = [newDocument, ...prev.documents];
      localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updatedDocuments));

      return { ...prev, documents: updatedDocuments };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setState((prev) => {
      const updatedNotifications = prev.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(updatedNotifications),
      );
      return { ...prev, notifications: updatedNotifications };
    });
  };

  const updateInquiryStatus = (id: number, status: Inquiry["status"]) => {
    setState((prev) => {
      const updatedInquiries = prev.inquiries.map((inq) =>
        inq.id === id ? { ...inq, status } : inq,
      );
      safeStorage.set(INQUIRIES_KEY, updatedInquiries);
      return { ...prev, inquiries: updatedInquiries };
    });
  };

  const replyToInquiry = (id: number, reply: string) => {
    console.log("Replying to inquiry:", id, reply);
    setState((prev) => {
      const inquiry = prev.inquiries.find((inq) => inq.id === id);
      if (!inquiry) return prev;

      const updatedInquiries = prev.inquiries.map((inq) =>
        inq.id === id
          ? ({ ...inq, status: "Replied", agentReply: reply } as Inquiry)
          : inq,
      );
      safeStorage.set(INQUIRIES_KEY, updatedInquiries);

      // Add notification for the student
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        title: "New Message from Agent",
        message: `Agent replied to your inquiry for ${inquiry.property}: "${reply.substring(0, 50)}${reply.length > 50 ? "..." : ""}"`,
        date: new Date().toLocaleDateString(),
        isRead: false,
        type: "Inquiry",
      };

      const updatedNotifications = [newNotification, ...prev.notifications];
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(updatedNotifications),
      );

      return {
        ...prev,
        inquiries: updatedInquiries,
        notifications: updatedNotifications,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        inquiries: state.inquiries,
        notifications: state.notifications,
        documents: state.documents,
        login,
        signup,
        logout,
        updateUser,
        addInquiry,
        addNotification,
        addDocument,
        markNotificationAsRead,
        updateInquiryStatus,
        replyToInquiry,
        isLoading: state.isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   HOOK
========================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
