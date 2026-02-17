import React from "react";
import {
  IoStatsChart,
  IoHome,
  IoPeople,
  IoArrowForward,
} from "react-icons/io5";
import { Activity } from "../types";

interface OverviewTabProps {
  stats: {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }[];
  activities: Activity[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ stats, activities }) => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div
              className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color.replace("bg-", "text-")}`}>
              <span className="text-8xl">{stat.icon}</span>
            </div>
            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white text-xl mb-4 shadow-lg shadow-blue-500/20`}>
                {stat.icon}
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {stat.label}
              </p>
              <h3 className="text-4xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-lg">Recent Activity</h3>
          <button className="text-[#278cf1] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <IoArrowForward />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "lead"
                    ? "bg-green-500"
                    : activity.type === "stat"
                      ? "bg-blue-500"
                      : "bg-amber-500"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.text}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
