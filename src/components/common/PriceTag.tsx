"use client";

import React from "react";

interface PriceTagProps {
  amount: number;
  currency?: string;
  period?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function PriceTag({
  amount,
  currency = "₦",
  period = "/year",
  size = "md",
  className = "",
  label,
}: PriceTagProps) {
  const sizeClasses = {
    sm: { label: "text-[10px]", amount: "text-base font-bold", period: "text-xs" },
    md: { label: "text-xs", amount: "text-xl font-bold", period: "text-sm" },
    lg: { label: "text-sm", amount: "text-3xl font-bold", period: "text-base" },
  };

  const cls = sizeClasses[size];

  return (
    <div className={className}>
      {label && <p className={`text-[#6b7686] ${cls.label}`}>{label}</p>}
      <p className={`text-[#0f172a] ${cls.amount}`}>
        {currency}
        {amount.toLocaleString()}
        <span className={`font-normal text-[#6b7686] ${cls.period}`}>{period}</span>
      </p>
    </div>
  );
}

export default PriceTag;
