"use client";

import React, { useState } from "react";
import {
  IoClose,
  IoCalendarOutline,
  IoTimeOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ScheduleVisitModalProps {
  hostelName: string;
  agentName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  hostelName,
  agentName,
  isOpen,
  onClose,
}) => {
  const { addInquiry, user } = useAuth();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to schedule a visit");
      return;
    }

    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addInquiry({
        property: hostelName,
        agent: agentName,
        status: "Pending",
        type: "Visit",
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: user.phone,
        message: message || `Scheduled visit for ${date} at ${time}`,
      });

      toast.success(
        `Visit scheduled for ${hostelName}! The agent will contact you soon.`,
      );
      onClose();
      // Reset form
      setDate("");
      setTime("");
      setMessage("");
    } catch {
      toast.error("Failed to schedule visit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-white w-full max-w-lg h-[70vh] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Schedule a Visit
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Book an appointment to see {hostelName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <IoClose size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <IoCalendarOutline className="text-[#278cf1]" /> Preferred Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1] outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <IoTimeOutline className="text-[#278cf1]" /> Preferred Time
              </label>
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1] outline-none transition-all text-sm appearance-none">
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <IoChatboxEllipsesOutline className="text-[#278cf1]" /> Message
                to Agent (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let the agent know if you have specific questions or requirements..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1] outline-none transition-all resize-none text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="bg-blue-50 p-4 rounded-2xl mb-6 border border-blue-100">
              <p className="text-[11px] text-[#278cf1] leading-relaxed font-medium">
                <strong>Note:</strong> Your contact details (name and phone
                number) will be shared with the agent{" "}
                <strong>{agentName}</strong> to facilitate the visit.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 cursor-pointer bg-[#278cf1] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#1a76d1] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Confirm Schedule"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
