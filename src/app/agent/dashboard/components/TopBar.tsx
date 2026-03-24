import { IoNotifications, IoSearch, IoMenu, IoTime } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface TopBarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (isOpen: boolean) => void;
  activeTab: string;
}

const TopBar: React.FC<TopBarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  isNotificationsOpen,
  setIsNotificationsOpen,
  activeTab,
}) => {
  const {
    user,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useAuth();

  const profile = {
    name: user?.name || "Verified Agent",
    image: user?.image || null,
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Colour-code dot by notification type
  const dotColor = (type: string) => {
    if (type === "Booking") return "bg-green-500";
    if (type === "Inquiry") return "bg-blue-500";
    return "bg-amber-500"; // System
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 md:p-6 flex items-center justify-between z-40">
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
        {/* Search */}
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

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <IoNotifications className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsNotificationsOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                />

                {/* Modal */}
                <motion.div
                  key="notifications-modal"
                  initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                  className="fixed left-1/2 top-1/2 w-[90%] max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden z-50">

                  {/* Header */}
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-blue-600 font-bold hover:underline">
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notification List */}
                  <div className="max-h-[60vh] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center text-gray-400">
                        <IoNotifications className="text-3xl mx-auto mb-2 opacity-30" />
                        <p className="text-sm italic">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-5 hover:bg-blue-50/30 transition-colors border-b border-gray-50 flex gap-4 group cursor-pointer ${
                            !notif.isRead ? "bg-blue-50/20" : ""
                          }`}>
                          <div
                            className={`w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-sm ${dotColor(notif.type)}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-900 transition-colors">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1.5 font-medium">
                              <IoTime className="text-gray-300" /> {notif.date}
                            </p>
                          </div>
                          {!notif.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-gray-50/50">
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full py-3.5 text-center text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-blue-100">
                      Close
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
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
