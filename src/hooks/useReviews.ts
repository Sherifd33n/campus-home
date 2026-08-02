"use client";

import { useState, useEffect, useCallback } from "react";
import { Review } from "@/types";
import { reviewService } from "@/services/review.service";

interface UseReviewsReturn {
  reviews: Review[];
  averageRating: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  submitReview: (data: Partial<Review>) => Promise<Review | null>;
  voteHelpful: (reviewId: string, userId: string, isHelpful: boolean) => Promise<void>;
}

export function useReviews(hostelId: string): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!hostelId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const [reviewsData, avgRating] = await Promise.all([
        reviewService.getReviewsByHostel(hostelId),
        reviewService.getAverageRating(hostelId),
      ]);
      setReviews(reviewsData);
      setAverageRating(avgRating);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const submitReview = useCallback(async (data: Partial<Review>): Promise<Review | null> => {
    try {
      const newReview = await reviewService.submitReview({ ...data, hostelId });
      setReviews((prev) => [newReview, ...prev]);
      setAverageRating((prev) => {
        const total = prev * reviews.length + newReview.rating;
        return Math.round((total / (reviews.length + 1)) * 10) / 10;
      });
      return newReview;
    } catch {
      return null;
    }
  }, [hostelId, reviews.length]);

  const voteHelpful = useCallback(async (reviewId: string, userId: string, isHelpful: boolean) => {
    await reviewService.voteHelpful(reviewId, userId, isHelpful);
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulVotes: (r.helpfulVotes || 0) + (isHelpful ? 1 : 0) } : r
      )
    );
  }, []);

  return { reviews, averageRating, isLoading, error, refetch: fetch, submitReview, voteHelpful };
}
