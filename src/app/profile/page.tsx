"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import { useFavorites } from "@/context/FavoriteContext";
import { useAuth } from "@/context/AuthContext";
import { schoolHostels, Hostel } from "@/data/hostel";
import HostelCard from "@/components/HostelCard";
import {
  IoSettings,
  IoSave,
  IoStar,
  IoNotificationsOutline,
  IoDocumentTextOutline,
  IoCloudDownloadOutline,
  IoCheckmarkDoneOutline,
  IoChatbubbleEllipsesOutline,
  IoGridOutline,
} from "react-icons/io5";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { useReviews } from "@/context/ReviewContext";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

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

  const [activeTab, setActiveTab] = useState<
    "overview" | "settings" | "notifications" | "documents" | "inquiries"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    university: user?.university || "",
    image: user?.image || null,
  });

  if (!user) return null;

  const userReviews = getUserReviews(user.email);

  const favoriteHostels = favoriteIds
    .map((id) => schoolHostels.find((h) => h.id === id))
    .filter((h): h is Hostel => h !== undefined);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit, reset form
      setFormData({
        name: user?.name || "",
        phone: user?.phone || "",
        university: user?.university || "",
        image: user?.image || null,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 mt-16 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-3 lg:p-6 lg:sticky lg:top-24">
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

              <div className="flex lg:flex-col gap-1 lg:gap-2 mt-4 lg:mt-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                {[
                  {
                    id: "overview",
                    label: "Overview",
                    icon: <IoGridOutline />,
                  },
                  {
                    id: "inquiries",
                    label: "Inquiries",
                    icon: <IoChatbubbleEllipsesOutline />,
                  },
                  {
                    id: "notifications",
                    label: "Notifications",
                    icon: <IoNotificationsOutline />,
                    count: notifications.filter((n) => !n.isRead).length,
                  },
                  {
                    id: "documents",
                    label: "Documents",
                    icon: <IoDocumentTextOutline />,
                  },
                  { id: "settings", label: "Settings", icon: <IoSettings /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-4 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm transition-all whitespace-nowrap relative ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-[#278cf1]"
                        : "text-gray-500 hover:bg-gray-50 border border-transparent lg:border-none"
                    }`}>
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="absolute top-2 right-2 lg:relative lg:top-0 lg:right-0 lg:ml-auto bg-[#278cf1] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {activeTab === "overview" ? (
              <>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm flex items-center gap-3 lg:gap-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl lg:text-2xl shrink-0">
                      <FaRegHeart />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {favoriteIds.length}
                      </h3>
                      <p className="text-gray-500 text-[10px] lg:text-sm font-medium">
                        Saved
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm flex items-center gap-3 lg:gap-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl lg:text-2xl shrink-0">
                      <IoStar />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {userReviews.length}
                      </h3>
                      <p className="text-gray-500 text-[10px] lg:text-sm font-medium">
                        Reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* Saved Hostels */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      Saved Hostels
                    </h2>
                  </div>

                  {favoriteHostels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favoriteHostels.map((hostel: Hostel) => (
                        <HostelCard key={hostel.id} hostel={hostel} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white py-16 px-6 rounded-3xl border border-dashed border-gray-200 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaRegHeart className="text-gray-300 text-2xl" />
                      </div>
                      <p className="text-gray-400 font-medium">
                        You haven&apos;t saved any hostels yet.
                      </p>
                      <button className="mt-4 text-[#278cf1] font-bold text-sm hover:underline">
                        Browse Listings
                      </button>
                    </div>
                  )}
                </div>

                {/* My Reviews Section */}
                {userReviews.length > 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        My Reviews
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {userReviews.map((review) => {
                        const hostel = schoolHostels.find(
                          (h) => h.id === review.hostelId,
                        );
                        return (
                          <div
                            key={review.id}
                            className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900 text-base">
                                {hostel?.name || "Unknown Hostel"}
                              </h4>
                              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={
                                      i < review.rating
                                        ? "fill-current"
                                        : "text-slate-200"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              &quot;{review.comment}&quot;
                            </p>
                            <p className="text-[10px] text-gray-400 mt-3 font-medium">
                              Submitted on {review.date}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Inquiries List (Preview in Overview) */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Inquiries
                    </h2>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="text-[#278cf1] text-xs font-bold hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="p-4 lg:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">
                            {inquiry.property}
                          </h4>
                          <p className="text-[10px] lg:text-xs text-gray-500 mt-1">
                            Agent:{" "}
                            <span className="text-gray-900 font-semibold">
                              {inquiry.agent}
                            </span>{" "}
                            • {inquiry.date}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inquiry.status === "Replied"
                                ? "bg-green-100 text-green-600"
                                : inquiry.status === "Pending"
                                  ? "bg-amber-100 text-amber-600"
                                  : inquiry.status === "Booked"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-600"
                            }`}>
                            {inquiry.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {inquiries.length === 0 && (
                      <div className="p-12 text-center text-gray-400 italic text-sm">
                        No inquiries yet.
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : activeTab === "notifications" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Activity
                  </h2>
                  <span className="text-xs font-bold text-[#278cf1] bg-blue-50 px-3 py-1 rounded-full">
                    {notifications.filter((n) => !n.isRead).length} New
                  </span>
                </div>
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((noti) => (
                      <div
                        key={noti.id}
                        className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                          !noti.isRead
                            ? "bg-white border-blue-100 shadow-md shadow-blue-500/5"
                            : "bg-white border-gray-100 shadow-sm"
                        }`}>
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                            noti.type === "Booking"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600"
                          }`}>
                          {noti.type === "Booking" ? (
                            <IoCheckmarkDoneOutline size={24} />
                          ) : (
                            <IoNotificationsOutline size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">
                              {noti.title}
                            </h4>
                            <span className="text-[10px] font-medium text-gray-400">
                              {noti.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {noti.message}
                          </p>
                          {!noti.isRead && (
                            <button
                              onClick={() => markNotificationAsRead(noti.id)}
                              className="text-[10px] font-bold text-[#278cf1] uppercase tracking-wider hover:underline cursor-pointer">
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white py-20 px-6 rounded-3xl border border-dashed border-gray-200 text-center">
                      <IoNotificationsOutline
                        size={48}
                        className="mx-auto text-gray-200 mb-4"
                      />
                      <p className="text-gray-400 font-medium italic">
                        No notifications yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "documents" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Tenancy Documents
                  </h2>
                  <p className="text-xs text-gray-400 italic">
                    Manage your receipts and agreements
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-[#278cf1]/30 transition-all group shadow-sm hover:shadow-md">
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#278cf1] transition-all">
                            <IoDocumentTextOutline size={28} />
                          </div>
                          <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer bg-gray-50 rounded-full">
                            <IoCloudDownloadOutline size={22} />
                          </button>
                        </div>
                        <div className="mb-6">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">
                            {doc.hostelName}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {doc.date}
                          </span>
                          {doc.amount && (
                            <span className="text-base font-bold text-gray-900">
                              {doc.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 bg-white py-20 px-6 rounded-3xl border border-dashed border-gray-200 text-center">
                      <IoDocumentTextOutline
                        size={48}
                        className="mx-auto text-gray-200 mb-4"
                      />
                      <p className="text-gray-400 font-medium">
                        No documents available yet.
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2">
                        Documents are generated automatically after a successful
                        booking.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : activeTab === "inquiries" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Inquiries
                  </h2>
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
                              onClick={() =>
                                toast.info("Chat feature coming soon!")
                              }
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
            ) : (
              /* Settings Tab */
              <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Profile Settings
                  </h2>
                  <button
                    onClick={isEditing ? handleSave : handleEditToggle}
                    className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                      isEditing
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-[#278cf1] text-white hover:bg-[#1e74cc]"
                    }`}>
                    {isEditing ? (
                      <>
                        <IoSave /> Save Changes
                      </>
                    ) : (
                      "Edit Profile"
                    )}
                  </button>
                </div>

                <div className="p-6 lg:p-8 space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-50">
                    <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative group">
                      {formData.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={formData.image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">
                          {formData.name.charAt(0)}
                        </span>
                      )}
                      {isEditing && (
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <IoSettings className="text-white text-xl animate-spin-slow" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-bold text-gray-900 text-lg">
                        Profile Photo
                      </h3>
                      <p className="text-xs text-gray-500">
                        {isEditing
                          ? "Click the photo to upload a new one"
                          : "This is how you appear to others"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                            : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-[10px] text-gray-400">
                        Email cannot be changed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                            : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">
                        University/Institution
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                            : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                      <button
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-all">
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all shadow-md shadow-green-100">
                        Confirm Changes
                      </button>
                    </div>
                  )}

                  <div className="pt-8 border-t border-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      Privacy & Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            Two-Factor Authentication
                          </p>
                          <p className="text-xs text-gray-500">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <button className="text-[#278cf1] text-xs font-bold hover:underline">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-50">
                        <div>
                          <p className="font-bold text-red-600 text-sm">
                            Delete Account
                          </p>
                          <p className="text-xs text-red-400">
                            Permanently remove your account and all data.
                          </p>
                        </div>
                        <button className="text-red-500 text-xs font-bold hover:underline">
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
