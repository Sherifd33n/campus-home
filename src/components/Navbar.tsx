"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Container from "./Container";
import { useFavorites } from "@/context/FavoriteContext";
import { useComparison } from "@/context/ComparisonContext";
import { useAuth } from "@/context/AuthContext";
// import { FaRegHeart } from "react-icons/fa";
// import { FaCodeCompare } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import {
  IoLogOutOutline,
  IoMenu,
  IoClose,
  IoNotificationsOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { favoriteIds } = useFavorites();
  const { comparisonIds } = useComparison();
  const { user, logout, notifications, markNotificationAsRead } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const isStudent = user?.role === "student";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Favorite", href: "/favorite", count: favoriteIds.length },
    { name: "Compare", href: "/compare", count: comparisonIds.length },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={`z-50 sticky top-0 bg-white/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "shadow-md border-transparent"
            : "border-b border-gray-50"
        }`}>
        <Container className="py-4 flex items-center justify-between relative">
          <div className="flex-1 lg:flex-none">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#278cf1] duration-150 flex items-center gap-1.5 relative text-base font-medium text-gray-800">
                    {link.name}
                    {user && link.count > 0 && (
                      <span className="bg-[#278cf1] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-2">
                        {link.count}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              {!isStudent && (
                <li>
                  <Link
                    href="/register/agent"
                    className="hover:text-[#278cf1] duration-150 text-base font-medium text-gray-800">
                    Become an Agent
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setIsNotificationsOpen(!isNotificationsOpen)
                      }
                      className="p-2 text-gray-500 hover:text-[#278cf1] transition-colors relative cursor-pointer">
                      <IoNotificationsOutline size={22} />
                      {notifications.filter((n) => !n.isRead).length > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isNotificationsOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsNotificationsOpen(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                              <h3 className="font-bold text-sm">
                                Notifications
                              </h3>
                              <span className="text-[10px] bg-blue-50 text-[#278cf1] px-2 py-0.5 rounded-full font-bold">
                                {notifications.filter((n) => !n.isRead).length}{" "}
                                New
                              </span>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                              {notifications.length > 0 ? (
                                notifications.map((noti) => (
                                  <div
                                    key={noti.id}
                                    onClick={() => {
                                      markNotificationAsRead(noti.id);
                                      // Optional: navigate based on type
                                    }}
                                    className={`p-4 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors relative ${
                                      !noti.isRead ? "bg-blue-50/30" : ""
                                    }`}>
                                    <div className="flex gap-3">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                          noti.type === "Booking"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-blue-100 text-blue-600"
                                        }`}>
                                        {noti.type === "Booking" ? (
                                          <IoCheckmarkDoneOutline size={16} />
                                        ) : (
                                          <IoNotificationsOutline size={16} />
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-900 mb-0.5">
                                          {noti.title}
                                        </p>
                                        <p className="text-[11px] text-gray-500 leading-relaxed mb-1">
                                          {noti.message}
                                        </p>
                                        <p className="text-[9px] text-gray-400 font-medium">
                                          {noti.date}
                                        </p>
                                      </div>
                                      {!noti.isRead && (
                                        <div className="w-1.5 h-1.5 bg-[#278cf1] rounded-full mt-1" />
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-8 text-center text-gray-400">
                                  <p className="text-xs italic">
                                    No notifications yet
                                  </p>
                                </div>
                              )}
                            </div>
                            {notifications.length > 0 && (
                              <Link
                                href="/profile?tab=notifications"
                                onClick={() => setIsNotificationsOpen(false)}
                                className="block p-3 text-center text-[10px] font-bold text-[#278cf1] bg-gray-50 hover:bg-gray-100 transition-colors uppercase tracking-widest">
                                View All Activity
                              </Link>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#278cf1] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#278cf1] overflow-hidden">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CgProfile size={18} />
                      )}
                    </div>
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-100 text-red-500 hover:bg-red-50 transition-all text-xs font-bold cursor-pointer">
                    <IoLogOutOutline size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <button className="bg-[#278cf1] text-[#f9fcff] py-1.5 px-4 rounded-md cursor-pointer hover:bg-[#f9fcff] hover:text-[#278cf1] border border-[#278cf1] duration-200 transition-all text-sm font-bold">
                      Login
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="bg-gray-200 text-[#232a32] py-1.5 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-all text-sm font-bold">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#278cf1] transition-colors">
              {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer - Moved outside sticky div for absolute fixed positioning */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] h-screen bg-white! z-70 lg:hidden border-l border-gray-100 p-6 shadow-2xl overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {user && (
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#278cf1] font-bold overflow-hidden">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                            pathname === link.href
                              ? "bg-blue-50 text-[#278cf1]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}>
                          <span>{link.name}</span>
                          {user && link.count > 0 && (
                            <span className="bg-[#278cf1] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                              {link.count}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                    {user && (
                      <li>
                        <Link
                          href="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                            pathname === "/profile"
                              ? "bg-blue-50 text-[#278cf1]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}>
                          Profile Portal
                        </Link>
                      </li>
                    )}
                    {!isStudent && (
                      <li>
                        <Link
                          href="/register/agent"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center px-4 py-3 rounded-xl font-bold text-sm text-[#278cf1] hover:bg-blue-50 transition-all italic">
                          Become an Agent
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-50 text-red-500 font-bold text-sm hover:bg-red-100 transition-all">
                      <IoLogOutOutline size={18} />
                      Sign Out
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center px-4 py-3 rounded-xl bg-[#278cf1] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-200 transition-all">
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-all border border-gray-100">
                        Join
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
