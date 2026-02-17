import React from "react";
import { IoNotifications, IoSearch, IoMenu } from "react-icons/io5";

interface TopBarProps {
  profile: {
    name: string;
    image: string | null;
  };
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (isOpen: boolean) => void;
  activeTab: string;
}

const TopBar: React.FC<TopBarProps> = ({
  profile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  isNotificationsOpen,
  setIsNotificationsOpen,
  activeTab,
}) => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 md:p-6 flex items-center justify-between z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600">
          <IoMenu className="text-2xl" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 capitalize hidden md:block">
          {activeTab === "overview"
            ? `Welcome back, ${profile.name.split(" ")[0]}`
            : activeTab}
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties, leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500/20 w-64 text-sm"
          />
        </div>

        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative p-2.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
          <IoNotifications className="text-xl" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-500">Verified Agent</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-blue-600">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
