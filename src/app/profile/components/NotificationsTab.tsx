import React from "react";
import {
  IoNotificationsOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { Notification } from "@/context/AuthContext";

interface NotificationsTabProps {
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({
  notifications,
  markNotificationAsRead,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
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
                  <h4 className="font-bold text-gray-900">{noti.title}</h4>
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
  );
};

export default NotificationsTab;
