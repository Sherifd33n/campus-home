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
  role: "student" | "agent";
}

/** Stored account record (includes passwordHash) */
interface StoredAccount extends UserProfile {
  passwordHash: string;
}

interface Inquiry {
  id: number;
  property: string;
  agent: string;
  date: string;
  status: "Replied" | "Pending" | "Closed";
}

interface AuthContextType {
  user: UserProfile | null;
  inquiries: Inquiry[];
  login: (email: string, password: string) => Promise<void>;
  signup: (
    userData: Omit<UserProfile, "role">,
    role: "student" | "agent",
    password: string,
  ) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
}

interface AuthState {
  user: UserProfile | null;
  inquiries: Inquiry[];
  isLoading: boolean;
}

/* =========================
   CONSTANTS
========================= */

const USERS_KEY = "campus-accounts";
const SESSION_KEY = "auth-user";
const INQUIRIES_KEY = "auth-inquiries";

const defaultInquiries: Inquiry[] = [
  {
    id: 1,
    property: "Sunshine Premium Hostel",
    agent: "Sheriff Jamiu",
    date: "2 days ago",
    status: "Replied",
  },
  {
    id: 2,
    property: "Green View Apartment",
    agent: "Premium Properties Ltd",
    date: "1 week ago",
    status: "Pending",
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
  localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
}

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

    const timer = setTimeout(() => {
      setState({
        user: savedUser,
        inquiries: savedInquiries || defaultInquiries,
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
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

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

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        inquiries: state.inquiries,
        login,
        signup,
        logout,
        updateUser,
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
