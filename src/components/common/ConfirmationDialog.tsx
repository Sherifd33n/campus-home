"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoWarning } from "react-icons/io5";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmationDialogProps) {
  const variantConfig = {
    danger:  { icon: <IoWarning className="text-red-500" size={24} />, btnClass: "bg-red-500 hover:bg-red-600" },
    warning: { icon: <IoWarning className="text-amber-500" size={24} />, btnClass: "bg-amber-500 hover:bg-amber-600" },
    info:    { icon: <IoWarning className="text-[#278cf1]" size={24} />, btnClass: "bg-[#278cf1] hover:bg-[#1f7dd4]" },
  };

  const { icon, btnClass } = variantConfig[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition cursor-pointer"
                aria-label="Close dialog"
              >
                <IoClose size={18} />
              </button>

              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 mt-0.5">{icon}</div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition disabled:opacity-60 cursor-pointer"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 py-2.5 text-sm font-bold text-white rounded-xl transition disabled:opacity-60 cursor-pointer ${btnClass}`}
                >
                  {isLoading ? "Processing..." : confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationDialog;
