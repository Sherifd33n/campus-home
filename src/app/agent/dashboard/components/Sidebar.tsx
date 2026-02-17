import React from "react";
import {
  IoStatsChart,
  IoHome,
  IoPeople,
  IoSettings,
  IoLogOut,
} from "react-icons/io5";

import Logo from "@/components/Logo";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  handleLogout,
}) => {
  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: <IoStatsChart /> },
    { id: "listings", label: "My Listings", icon: <IoHome /> },
    { id: "leads", label: "Student Leads", icon: <IoPeople /> },
    { id: "analytics", label: "Analytics", icon: <IoStatsChart /> },
    { id: "settings", label: "Settings", icon: <IoSettings /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-100 z-30">
      <div className="p-6 border-b border-gray-50 flex items-center justify-center">
        <Logo />
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === link.id
                ? "bg-[#278cf1] text-white shadow-lg shadow-blue-500/30"
                : "text-gray-500 hover:bg-blue-50 hover:text-[#278cf1]"
            }`}>
            <span
              className={`text-xl ${activeTab === link.id ? "text-white" : "text-gray-400 group-hover:text-[#278cf1]"}`}>
              {link.icon}
            </span>
            <span className="font-bold text-sm">{link.label}</span>
            {activeTab === link.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
          <IoLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
