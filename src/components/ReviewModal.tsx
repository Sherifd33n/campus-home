"use client";

import React, { useState } from "react";
import { IoClose, IoStar } from "react-icons/io5";
import { useReviews } from "@/context/ReviewContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ReviewModalProps {
  hostelId: string;
  hostelName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  hostelId,
  hostelName,
  isOpen,
  onClose,
}) => {
  const { addReview } = useReviews();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review comment must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      addReview({
        hostelId,
        userName: user.name,
        userEmail: user.email,
        rating,
        comment: comment.trim(),
      });

      toast.success("Review submitted successfully!");
      onClose();
      // Reset form
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">How was your stay at</p>
            <h3 className="text-lg font-bold text-[#278cf1] mb-6">
              {hostelName}
            </h3>

            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1 transition-transform hover:scale-110">
                  <IoStar
                    size={36}
                    className={`${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-medium text-gray-400">
              {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience (e.g., power supply, water, security, environment...)"
              className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1] outline-none transition-all resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#278cf1] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#1a76d1] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
