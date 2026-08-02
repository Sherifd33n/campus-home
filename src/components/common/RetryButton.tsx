"use client";

import React from "react";
import { IoRefreshOutline } from "react-icons/io5";

interface RetryButtonProps {
  onClick: () => void;
  label?: string;
  isLoading?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RetryButton({
  onClick,
  label = "Try Again",
  isLoading = false,
  className = "",
  size = "md",
}: RetryButtonProps) {
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center gap-2 font-bold rounded-xl bg-[#278cf1] text-white hover:bg-[#1f7dd4] transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      <IoRefreshOutline
        size={size === "sm" ? 14 : size === "lg" ? 18 : 16}
        className={isLoading ? "animate-spin" : ""}
      />
      {isLoading ? "Retrying..." : label}
    </button>
  );
}

export default RetryButton;
