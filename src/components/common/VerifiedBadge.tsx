"use client";

import React from "react";
import { MdVerified } from "react-icons/md";

interface VerifiedBadgeProps {
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

export function VerifiedBadge({
  label = "Verified",
  size = "sm",
  className = "",
}: VerifiedBadgeProps) {
  const sizeClasses = size === "sm"
    ? "text-[10px] px-1.5 py-0.5 gap-0.5"
    : "text-xs px-2 py-1 gap-1";

  const iconSize = size === "sm" ? 11 : 14;

  return (
    <span
      className={`inline-flex items-center font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full ${sizeClasses} ${className}`}
    >
      <MdVerified size={iconSize} />
      {label}
    </span>
  );
}

export default VerifiedBadge;
