"use client";

import React from "react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = "",
  compact = false,
}: EmptyStateProps) {
  const actionElement = actionLabel && (
    actionHref ? (
      <Link
        href={actionHref}
        className="inline-block text-sm bg-[#278cf1] text-white px-5 py-2.5 rounded-xl hover:bg-[#1f7dd4] transition font-bold"
      >
        {actionLabel}
      </Link>
    ) : onAction ? (
      <button
        onClick={onAction}
        className="text-sm bg-[#278cf1] text-white px-5 py-2.5 rounded-xl hover:bg-[#1f7dd4] transition font-bold cursor-pointer"
      >
        {actionLabel}
      </button>
    ) : null
  );

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-gray-50 rounded-xl ${className}`}>
        {icon && <div className="text-gray-400">{icon}</div>}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-700 text-sm">{title}</p>
          {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
        </div>
        {actionElement}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-8 md:p-16 text-center ${className}`}>
      <div className="max-w-sm mx-auto">
        {icon && (
          <div className="flex items-center justify-center mb-6">{icon}</div>
        )}
        <h2 className="text-xl font-semibold text-[#0f172a] mb-3">{title}</h2>
        {description && (
          <p className="text-[#6b7686] text-sm mb-6 leading-relaxed">{description}</p>
        )}
        {actionElement}
      </div>
    </div>
  );
}

export default EmptyState;
