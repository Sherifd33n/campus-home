import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Lead } from "../types";

interface LeadDetailsModalProps {
  viewingLead: Lead | null;
  setViewingLead: (lead: Lead | null) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  viewingLead,
  setViewingLead,
  updateLeadStatus,
}) => {
  if (!viewingLead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setViewingLead(null)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-lg relative z-10 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
            <p className="text-xs text-gray-500 mt-1">ID: {viewingLead.id}</p>
          </div>
          <button
            onClick={() => setViewingLead(null)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <IoClose className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#278cf1] font-bold text-lg">
              {viewingLead.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {viewingLead.studentName}
              </h3>
              <p className="text-xs text-gray-500">Studen</p>
              <div className="flex gap-2 mt-2">
                <a
                  href={`mailto:${viewingLead.email}`}
                  className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium hover:bg-gray-100">
                  Email
                </a>
                <a
                  href={`tel:${viewingLead.phone}`}
                  className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium hover:bg-gray-100">
                  Call
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase">
                Property Interest
              </span>
              <p className="font-medium text-gray-900">
                {viewingLead.property}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase">
                Message
              </span>
              <p className="text-sm text-gray-700 mt-1 italic">
                &quot;{viewingLead.message}&quot;
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-200">
              <span>Received {viewingLead.date}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {viewingLead.status !== "contacted" && (
              <button
                onClick={() => updateLeadStatus(viewingLead.id, "contacted")}
                className="flex-1 px-4 py-3 bg-[#278cf1] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-[#1e72c5]">
                Mark Contacted
              </button>
            )}
            {viewingLead.status !== "archived" && (
              <button
                onClick={() => updateLeadStatus(viewingLead.id, "archived")}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200">
                Archive Lead
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadDetailsModal;
