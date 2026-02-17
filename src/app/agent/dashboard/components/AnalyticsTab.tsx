import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Lead } from "../types";

interface AnalyticsTabProps {
  analyticsData: any[];
  topListingsData: any[];
  leads: Lead[];
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  analyticsData,
  topListingsData,
  leads,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Performance Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Track your property views and engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Views</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
          <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
            +12% vs last week
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Link Clicks</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">567</p>
          <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full mt-2 inline-block">
            +5% vs last week
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Lead Conversion</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">3.2%</p>
          <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full mt-2 inline-block">
            -1.4% vs last week
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#278cf1"
                  strokeWidth={3}
                  dot={{ fill: "#278cf1", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Listings Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">
            Top Performing Listings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topListingsData}
                layout="vertical"
                margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#4B5563", fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="views"
                  fill="#278cf1"
                  radius={[0, 10, 10, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lead Funnel / Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Engagement Overview</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between text-center divide-x divide-gray-100">
            <div className="flex-1 px-4">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                New Leads
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter((l) => l.status === "new").length}
              </p>
            </div>
            <div className="flex-1 px-4">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                Contacted
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter((l) => l.status === "contacted").length}
              </p>
            </div>
            <div className="flex-1 px-4">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                Archived
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.filter((l) => l.status === "archived").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
