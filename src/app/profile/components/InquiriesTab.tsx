import React from "react";
import { toast } from "sonner";
import { Inquiry } from "@/context/AuthContext";

interface InquiriesTabProps {
  inquiries: Inquiry[];
}

const InquiriesTab: React.FC<InquiriesTabProps> = ({ inquiries }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Inquiries</h2>
        <p className="text-xs text-gray-400">
          Track all your property inquiries
        </p>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {inquiry.property}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">
                      Agent:{" "}
                      <span className="font-bold text-gray-700">
                        {inquiry.agent}
                      </span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {inquiry.date}
                    </span>
                  </div>
                  {inquiry.agentReply && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">
                        Agent&apos;s Response:
                      </p>
                      <p className="text-sm text-gray-700 italic">
                        &quot;{inquiry.agentReply}&quot;
                      </p>
                    </div>
                  )}
                  {inquiry.amount && (
                    <p className="text-sm font-bold text-[#278cf1] mt-2">
                      {inquiry.amount}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      inquiry.status === "Booked"
                        ? "bg-blue-100 text-blue-600"
                        : inquiry.status === "Reserved"
                          ? "bg-purple-100 text-purple-600"
                          : inquiry.status === "Replied"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                    }`}>
                    {inquiry.status}
                  </span>
                  <button
                    onClick={() => toast.info("Chat feature coming soon!")}
                    className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer">
                    Chat Agent
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-400 italic">
              No inquiries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiriesTab;
