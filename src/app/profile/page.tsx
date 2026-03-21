"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import { useFavorites } from "@/context/FavoriteContext";
import { useAuth } from "@/context/AuthContext";
import { schoolHostels, Hostel } from "@/data/hostel";
import { useReviews } from "@/context/ReviewContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  IoSettings,
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoChatbubbleEllipsesOutline,
  IoGridOutline,
} from "react-icons/io5";

import ProfileOverviewTab from "./components/ProfileOverviewTab";
import InquiriesTab from "./components/InquiriesTab";
import NotificationsTab from "./components/NotificationsTab";
import DocumentsTab from "./components/DocumentsTab";
import ProfileSettingsTab from "./components/ProfileSettingsTab";

type TabId =
  | "overview"
  | "settings"
  | "notifications"
  | "documents"
  | "inquiries";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <IoGridOutline /> },
  {
    id: "inquiries",
    label: "Inquiries",
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <IoNotificationsOutline />,
  },
  { id: "documents", label: "Documents", icon: <IoDocumentTextOutline /> },
  { id: "settings", label: "Settings", icon: <IoSettings /> },
];

const StudentProfilePage = () => {
  const { favoriteIds } = useFavorites();
  const {
    user,
    inquiries,
    notifications,
    documents,
    markNotificationAsRead,
    updateUser,
  } = useAuth();
  const { getUserReviews } = useReviews();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  if (!user) return null;

  const userReviews = getUserReviews(user.email);
  const favoriteHostels = favoriteIds
    .map((id) => schoolHostels.find((h) => h.id === id))
    .filter((h): h is Hostel => h !== undefined);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 mt-16 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-3 lg:p-6 lg:sticky lg:top-24">
              {/* Avatar + Name */}
              <div className="flex lg:flex-col items-center gap-4 lg:gap-0 lg:text-center mb-0 lg:mb-6 p-2 lg:p-0">
                <div className="relative group w-12 h-12 lg:w-28 lg:h-28 shrink-0">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-xl lg:text-4xl text-blue-600 font-bold overflow-hidden">
                    {user.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                </div>
                <div className="text-left lg:text-center min-w-0">
                  <h2 className="text-base lg:text-xl font-bold text-gray-900 truncate">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 text-[10px] lg:text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Tab Nav */}
              <div className="flex lg:flex-col gap-1 lg:gap-2 mt-4 lg:mt-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {tabs.map((tab) => {
                  const count =
                    tab.id === "notifications" ? unreadCount : undefined;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-4 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm transition-all whitespace-nowrap relative ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-[#278cf1]"
                          : "text-gray-500 hover:bg-gray-50 border border-transparent lg:border-none"
                      }`}>
                      <span className="text-lg">{tab.icon}</span>
                      <span className="hidden lg:inline">{tab.label}</span>
                      {count !== undefined && count > 0 && (
                        <span className="absolute top-2 right-2 lg:relative lg:top-0 lg:right-0 lg:ml-auto bg-[#278cf1] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {activeTab === "overview" && (
              <ProfileOverviewTab
                favoriteIds={favoriteIds}
                favoriteHostels={favoriteHostels}
                userReviews={userReviews}
                inquiries={inquiries}
                onGoToInquiries={() => setActiveTab("inquiries")}
              />
            )}
            {activeTab === "inquiries" && (
              <InquiriesTab inquiries={inquiries} />
            )}
            {activeTab === "notifications" && (
              <NotificationsTab
                notifications={notifications}
                markNotificationAsRead={markNotificationAsRead}
              />
            )}
            {activeTab === "documents" && (
              <DocumentsTab documents={documents} />
            )}
            {activeTab === "settings" && (
              <ProfileSettingsTab user={user} updateUser={updateUser} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const WrappedProfilePage = () => (
  <ProtectedRoute>
    <StudentProfilePage />
  </ProtectedRoute>
);

export default WrappedProfilePage;
