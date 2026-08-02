"use client";

import React from "react";
import { IoAlertCircle, IoRefreshOutline, IoCloudOffline } from "react-icons/io5";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  type?: "generic" | "network" | "notfound" | "unauthorized";
  className?: string;
  compact?: boolean;
}

export function ErrorState({
  title,
  message,
  onRetry,
  type = "generic",
  className = "",
  compact = false,
}: ErrorStateProps) {
  const config = {
    generic: {
      icon: <IoAlertCircle className="text-red-400" size={compact ? 32 : 48} />,
      defaultTitle: "Something went wrong",
      defaultMessage: "An unexpected error occurred. Please try again.",
    },
    network: {
      icon: <IoCloudOffline className="text-gray-400" size={compact ? 32 : 48} />,
      defaultTitle: "No internet connection",
      defaultMessage: "Check your connection and try again.",
    },
    notfound: {
      icon: <IoAlertCircle className="text-amber-400" size={compact ? 32 : 48} />,
      defaultTitle: "Not found",
      defaultMessage: "The item you're looking for could not be found.",
    },
    unauthorized: {
      icon: <IoAlertCircle className="text-orange-400" size={compact ? 32 : 48} />,
      defaultTitle: "Unauthorized",
      defaultMessage: "You need to log in to view this content.",
    },
  };

  const { icon, defaultTitle, defaultMessage } = config[type];

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-red-50 rounded-xl text-sm ${className}`}>
        {icon}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-red-700">{title || defaultTitle}</p>
          <p className="text-red-600 text-xs mt-0.5 truncate">{message || defaultMessage}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
          >
            <IoRefreshOutline size={14} />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title || defaultTitle}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{message || defaultMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#278cf1] text-white text-sm font-bold rounded-xl hover:bg-[#1f7dd4] transition cursor-pointer"
        >
          <IoRefreshOutline size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
