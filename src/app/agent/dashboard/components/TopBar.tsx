import { IoNotifications, IoSearch, IoMenu, IoTime } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

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
  const notifications = [
    { id: 1, text: "New lead from John Doe", time: "2 mins ago", type: "lead" },
    {
      id: 2,
      text: "Property 'Sunshine Premium' viewed 50 times",
      time: "1 hour ago",
      type: "stat",
    },
    {
      id: 3,
      text: "Listing 'Royal Court' marked as active",
      time: "5 hours ago",
      type: "update",
    },
  ];

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

        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <IoNotifications className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                key="notifications-dropdown"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                  <button className="text-xs text-blue-600 font-bold">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          notif.type === "lead"
                            ? "bg-blue-500"
                            : notif.type === "stat"
                              ? "bg-green-500"
                              : "bg-amber-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-gray-800 leading-tight">
                          {notif.text}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                          <IoTime /> {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full p-4 text-center text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                  View All Notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
