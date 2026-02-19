"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import { useFavorites } from "@/context/FavoriteContext";
import { useAuth } from "@/context/AuthContext";
import { schoolHostels, Hostel } from "@/data/hostel";
import HostelCard from "@/components/HostelCard";
import { IoSettings, IoSave, IoStar } from "react-icons/io5";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useReviews } from "@/context/ReviewContext";
import { toast } from "sonner";
import ProtectedRoute from "@/components/ProtectedRoute";

const StudentProfilePage = () => {
  const { favoriteIds } = useFavorites();
  const { user, inquiries, updateUser } = useAuth();
  const { getUserReviews } = useReviews();

  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    university: user?.university || "",
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

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 mt-16 pb-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 text-center sticky top-24">
              <div className="relative group mx-auto mb-4 w-28 h-28">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{user.email}</p>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "overview"
                      ? "bg-blue-50 text-[#278cf1]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}>
                  <CgProfile className="text-lg" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeTab === "settings"
                      ? "bg-blue-50 text-[#278cf1]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}>
                  <IoSettings className="text-lg" /> Account Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {activeTab === "overview" ? (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-2xl">
                      <FaRegHeart />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {favoriteIds.length}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        Saved Hostels
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl">
                      <IoStar />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {userReviews.length}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        My Reviews
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
                            <p className="text-sm text-gray-600 italic line-clamp-2">
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

                {/* Inquiries List */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Inquiries
                    </h2>
                    <button className="text-[#278cf1] text-xs font-bold hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {inquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {inquiry.property}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Agent:{" "}
                            <span className="text-gray-900 font-semibold">
                              {inquiry.agent}
                            </span>{" "}
                            • {inquiry.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inquiry.status === "Replied"
                                ? "bg-green-100 text-green-600"
                                : inquiry.status === "Pending"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-gray-100 text-gray-600"
                            }`}>
                            {inquiry.status}
                          </span>
                          <button
                            onClick={() =>
                              toast.info("Chat feature coming soon!")
                            }
                            className="text-[#278cf1] text-xs font-bold hover:underline">
                            View Chat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Settings Tab */
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Profile Settings
                  </h2>
                  <button
                    onClick={isEditing ? handleSave : handleEditToggle}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
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

                <div className="p-8 space-y-8">
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
                    <h3 className="text-lg font-bold text-gray-900 mb-6 italic">
                      Privacy & Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="font-bold text-gray-800 text-sm italic">
                            Two-Factor Authentication
                          </p>
                          <p className="text-xs text-gray-500 italic">
                            Add an extra layer of security to your account.
                          </p>
                        </div>
                        <button className="text-[#278cf1] text-xs font-bold italic hover:underline">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-50">
                        <div>
                          <p className="font-bold text-red-600 text-sm italic">
                            Delete Account
                          </p>
                          <p className="text-xs text-red-400 italic">
                            Permanently remove your account and all data.
                          </p>
                        </div>
                        <button className="text-red-500 text-xs font-bold italic hover:underline">
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
