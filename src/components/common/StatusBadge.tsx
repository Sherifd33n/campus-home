"use client";

import React from "react";
import { BookingStatus, PaymentStatus, AvailabilityStatus } from "@/types";

type StatusType = BookingStatus | PaymentStatus | AvailabilityStatus | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  // Booking Statuses
  PENDING:       { label: "Pending",       classes: "bg-amber-50 text-amber-700 border-amber-200" },
  CONFIRMED:     { label: "Confirmed",     classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  IN_PROGRESS:   { label: "In Progress",   classes: "bg-blue-50 text-blue-700 border-blue-200" },
  COMPLETED:     { label: "Completed",     classes: "bg-green-50 text-green-700 border-green-200" },
  CANCELLED:     { label: "Cancelled",     classes: "bg-red-50 text-red-600 border-red-200" },
  // Payment Statuses
  UNPAID:        { label: "Unpaid",        classes: "bg-gray-50 text-gray-600 border-gray-200" },
  PAID:          { label: "Paid",          classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  REFUNDED:      { label: "Refunded",      classes: "bg-purple-50 text-purple-700 border-purple-200" },
  FAILED:        { label: "Failed",        classes: "bg-red-50 text-red-600 border-red-200" },
  // Availability Statuses
  AVAILABLE:     { label: "Available",     classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  LIMITED:       { label: "Limited",       classes: "bg-amber-50 text-amber-700 border-amber-200" },
  SOLD_OUT:      { label: "Sold Out",      classes: "bg-red-50 text-red-600 border-red-200" },
  COMING_SOON:   { label: "Coming Soon",   classes: "bg-blue-50 text-blue-700 border-blue-200" },
  // Visit Statuses
  SCHEDULED:     { label: "Scheduled",     classes: "bg-blue-50 text-blue-700 border-blue-200" },
  RESCHEDULED:   { label: "Rescheduled",   classes: "bg-amber-50 text-amber-700 border-amber-200" },
  // Inquiry
  new:           { label: "New",           classes: "bg-blue-50 text-blue-700 border-blue-200" },
  contacted:     { label: "Contacted",     classes: "bg-purple-50 text-purple-700 border-purple-200" },
  archived:      { label: "Archived",      classes: "bg-gray-50 text-gray-500 border-gray-200" },
};

export function StatusBadge({ status, className = "", size = "sm" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    classes: "bg-gray-50 text-gray-600 border-gray-200",
  };

  const sizeClasses = size === "sm"
    ? "text-[10px] px-2 py-0.5"
    : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border ${config.classes} ${sizeClasses} ${className}`}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;
