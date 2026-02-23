"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useReviews } from "@/context/ReviewContext";
import ReviewModal from "./ReviewModal";

interface ReviewsSectionProps {
  hostelId: string;
  hostelName: string;
  initialReviews?: {
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  hostelId,
  hostelName,
  initialReviews = [],
}) => {
  const { getHostelReviews, isHydrated } = useReviews();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userReviews = isHydrated ? getHostelReviews(hostelId) : [];

  // Format user reviews to match the display format
  const formattedUserReviews = userReviews.map((r) => ({
    name: r.userName,
    date: r.date,
    rating: r.rating,
    comment: r.comment,
  }));

  // Combine mock reviews and user reviews
  const allReviews = [...formattedUserReviews, ...initialReviews];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-base md:text-xl font-bold text-[#0f172a]">
          Student Reviews ({allReviews.length})
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#278cf1] text-white text-xs font-bold rounded-xl hover:bg-[#1a76d1] transition shadow-md shadow-blue-500/10">
          Write a Review
        </button>
      </div>

      <div className="space-y-8">
        {allReviews.length > 0 ? (
          allReviews.map((review, idx) => (
            <div
              key={idx}
              className="border-b border-slate-50 last:border-0 pb-6 last:pb-0 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-[#278cf1]">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0f172a]">
                      {review.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium lowercase">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "fill-current" : "text-slate-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                &quot;{review.comment}&quot;
              </p>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-400 text-sm">
              No reviews yet. Be the first to write one!
            </p>
          </div>
        )}
      </div>

      <ReviewModal
        hostelId={hostelId}
        hostelName={hostelName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ReviewsSection;
