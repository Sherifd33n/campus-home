"use client";

import React from "react";
import { AvailabilityStatus } from "@/types";

interface AvailabilityBadgeProps {
  status: AvailabilityStatus | string;
  showDot?: boolean;
  className?: string;
}

const AVAILABILITY_CONFIG: Record<string, { label: string; dotColor: string; textColor: string }> = {
  AVAILABLE:    { label: "Available",   dotColor: "bg-emerald-500", textColor: "text-emerald-700" },
  LIMITED:      { label: "Limited",     dotColor: "bg-amber-500",   textColor: "text-amber-700" },
  SOLD_OUT:     { label: "Sold Out",    dotColor: "bg-red-500",      textColor: "text-red-600" },
  COMING_SOON:  { label: "Coming Soon", dotColor: "bg-blue-500",     textColor: "text-blue-700" },
};

export function AvailabilityBadge({
  status,
  showDot = true,
  className = "",
}: AvailabilityBadgeProps) {
  const config = AVAILABILITY_CONFIG[status] || {
    label: status,
    dotColor: "bg-gray-400",
    textColor: "text-gray-600",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${config.textColor} ${className}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
      )}
      {config.label}
    </span>
  );
}

export default AvailabilityBadge;
