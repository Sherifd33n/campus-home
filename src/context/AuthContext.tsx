"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  university: string;
  avatar?: string;
}

interface Inquiry {
  id: number;
  property: string;
  agent: string;
  date: string;
  status: "Replied" | "Pending" | "Closed";
}

interface AuthContextType {
  user: UserProfile;
  inquiries: Inquiry[];
  updateUser: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
}

const defaultUser: UserProfile = {
  name: "Student User",
  email: "student.user@example.com",
  phone: "08012345678",
  university: "University of Lagos",
};

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

interface AuthState {
  user: UserProfile;
  inquiries: Inquiry[];
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: defaultUser,
    inquiries: defaultInquiries,
    isLoading: true,
  });

  useEffect(() => {
    let savedUser = null;
    let savedInquiries = null;

    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("student-user");
      const inqStr = localStorage.getItem("student-inquiries");

      if (userStr) {
        try {
          savedUser = JSON.parse(userStr);
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }

      if (inqStr) {
        try {
          savedInquiries = JSON.parse(inqStr);
        } catch (e) {
          console.error("Failed to parse inquiries", e);
        }
      }
    }

    // Wrap in setTimeout to avoid "synchronous setState in Effect" error
    // which can trigger cascading renders warning in some environments.
    const timer = setTimeout(() => {
      setState({
        user: savedUser || defaultUser,
        inquiries: savedInquiries || defaultInquiries,
        isLoading: false,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const updateUser = (data: Partial<UserProfile>) => {
    setState((prev) => {
      const newUser = { ...prev.user, ...data };
      localStorage.setItem("student-user", JSON.stringify(newUser));
      return { ...prev, user: newUser };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        inquiries: state.inquiries,
        updateUser,
        isLoading: state.isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
