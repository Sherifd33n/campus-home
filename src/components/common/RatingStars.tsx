"use client";

import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  size = 14,
  showCount = false,
  reviewCount,
  className = "",
}: RatingStarsProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = rating >= i + 1;
    const half = !filled && rating >= i + 0.5;
    return { filled, half };
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <span key={i} className="text-yellow-400">
            {star.filled ? (
              <FaStar size={size} />
            ) : star.half ? (
              <FaStarHalfAlt size={size} />
            ) : (
              <FaRegStar size={size} />
            )}
          </span>
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-gray-500 font-medium">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}

export default RatingStars;
