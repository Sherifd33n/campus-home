"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Review {
  id: string;
  hostelId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getHostelReviews: (hostelId: string) => Review[];
  getUserReviews: (email: string) => Review[];
  isHydrated: boolean;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hostel-reviews");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const timer = setTimeout(() => {
            setReviews(parsed);
            setIsHydrated(true);
          }, 0);
          return () => clearTimeout(timer);
        } catch (e) {
          console.error("Failed to parse reviews", e);
          const timer = setTimeout(() => {
            setIsHydrated(true);
          }, 0);
          return () => clearTimeout(timer);
        }
      } else {
        const timer = setTimeout(() => {
          setIsHydrated(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Save to localStorage whenever reviews change, but only after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("hostel-reviews", JSON.stringify(reviews));
      } catch (e) {
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
          toast.error("Review storage full.");
        } else {
          console.error("Failed to save reviews", e);
        }
      }
    }
  }, [reviews, isHydrated]);

  const addReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substring(2, 11),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getHostelReviews = (hostelId: string) => {
    return reviews.filter((r) => r.hostelId === hostelId);
  };

  const getUserReviews = (email: string) => {
    return reviews.filter((r) => r.userEmail === email);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getHostelReviews,
        getUserReviews,
        isHydrated,
      }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
};
