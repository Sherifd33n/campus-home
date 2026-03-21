import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import HostelCard from "@/components/HostelCard";
import { Hostel, schoolHostels } from "@/data/hostel";
import { Inquiry } from "@/context/AuthContext";
import { Review } from "@/context/ReviewContext";

interface ProfileOverviewTabProps {
  favoriteIds: string[];
  favoriteHostels: Hostel[];
  userReviews: Review[];
  inquiries: Inquiry[];
  onGoToInquiries: () => void;
}

const ProfileOverviewTab: React.FC<ProfileOverviewTabProps> = ({
  favoriteIds,
  favoriteHostels,
  userReviews,
  inquiries,
  onGoToInquiries,
}) => {
  return (
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
          <h2 className="text-2xl font-bold text-gray-900">Saved Hostels</h2>
        </div>
        {favoriteHostels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteHostels.map((hostel) => (
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
          </div>
        )}
      </div>

      {/* My Reviews */}
      {userReviews.length > 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">My Reviews</h2>
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

      {/* Recent Inquiries Preview */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
          <button
            onClick={onGoToInquiries}
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
          ))}
          {inquiries.length === 0 && (
            <div className="p-12 text-center text-gray-400 italic text-sm">
              No inquiries yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileOverviewTab;
