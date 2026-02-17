import React from "react";
import { motion } from "framer-motion";
import { Lead } from "../types";

interface LeadsTabProps {
  leads: Lead[];
  activeLeadTab: "new" | "contacted" | "archived";
  setActiveLeadTab: (tab: "new" | "contacted" | "archived") => void;
  setViewingLead: (lead: Lead | null) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
}

const LeadsTab: React.FC<LeadsTabProps> = ({
  leads,
  activeLeadTab,
  setActiveLeadTab,
  setViewingLead,
  updateLeadStatus,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Student Leads</h1>
      <div className="flex items-center gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {(["new", "contacted", "archived"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveLeadTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
              activeLeadTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}>
            {tab} ({leads.filter((l) => l.status === tab).length})
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {leads
          .filter((l) => l.status === activeLeadTab)
          .map((lead) => (
            <motion.div
              layout
              key={lead.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-200 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">
                    {lead.studentName}
                  </h3>
                  {lead.status === "new" && (
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      New Lead
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  Inquired about{" "}
                  <span className="text-gray-900 font-bold">
                    {lead.property}
                  </span>{" "}
                  • {lead.date}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed italic truncate max-w-lg">
                  &quot;{lead.message}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewingLead(lead)}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-[#278cf1] text-xs font-bold hover:bg-blue-100 transition-all">
                  View Details
                </button>
                {lead.status !== "archived" && (
                  <button
                    onClick={() => updateLeadStatus(lead.id, "archived")}
                    className="px-4 py-2 rounded-xl bg-gray-50 text-gray-500 text-xs font-bold hover:bg-gray-100 transition-all">
                    Archive
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        {leads.filter((l) => l.status === activeLeadTab).length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400">No {activeLeadTab} leads found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsTab;
