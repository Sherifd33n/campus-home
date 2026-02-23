import React from "react";
import { IoAdd, IoEye, IoPencil, IoTrash, IoRocket } from "react-icons/io5";
import { Listing } from "../types";

interface ListingsTabProps {
  listings: Listing[];
  setEditingProperty: (property: Listing | null) => void;
  setIsPropertyModalOpen: (isOpen: boolean) => void;
  handleDelete: (id: string) => void;
  setViewingProperty: (property: Listing | null) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
}

const ListingsTab: React.FC<ListingsTabProps> = ({
  listings,
  setEditingProperty,
  setIsPropertyModalOpen,
  handleDelete,
  setViewingProperty,
  setIsViewModalOpen,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <button
          onClick={() => {
            setEditingProperty(null);
            setIsPropertyModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#278cf1] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
          <IoAdd className="text-xl" />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Desktop Listings Table */}
      <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase">
                  Property
                </th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase">
                  Price
                </th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase">
                  Status
                </th>
                <th className="p-6 text-xs font-bold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  className="hover:bg-gray-50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={listing.images[0] || "/images/menu-image.jpg"}
                        alt={listing.name}
                        className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {listing.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          {listing.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="font-bold text-[#278cf1]">
                      {listing.price}
                    </span>
                    <span className="text-xs text-gray-400 block">/ year</span>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        listing.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                      }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setViewingProperty(listing);
                          setIsViewModalOpen(true);
                        }}
                        title="View Details"
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <IoEye />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProperty(listing);
                          setIsPropertyModalOpen(true);
                        }}
                        title="Edit Listing"
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                        <IoPencil />
                      </button>
                      <button
                        onClick={() => {
                          // Handle Boost logic here
                        }}
                        title="Boost Listing"
                        className="p-2 hover:bg-amber-50 rounded-lg text-amber-500 transition-colors">
                        <IoRocket />
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        title="Delete Listing"
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                        <IoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Listings Cards */}
      <div className="md:hidden space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex gap-4">
              <img
                src={listing.images[0]}
                alt={listing.name}
                className="w-20 h-20 rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-gray-900 truncate">
                    {listing.name}
                  </h4>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      listing.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}>
                    {listing.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {listing.location}
                </p>
                <div className="mt-2 text-sm">
                  <span className="font-bold text-[#278cf1]">
                    {listing.price}
                  </span>
                  <span className="text-[10px] text-gray-400"> / year</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setViewingProperty(listing);
                    setIsViewModalOpen(true);
                  }}
                  className="p-2.5 bg-blue-50 text-blue-600 rounded-xl active:scale-95 transition-all">
                  <IoEye size={18} />
                </button>
                <button
                  onClick={() => {
                    setEditingProperty(listing);
                    setIsPropertyModalOpen(true);
                  }}
                  className="p-2.5 bg-gray-50 text-gray-600 rounded-xl active:scale-95 transition-all">
                  <IoPencil size={18} />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2.5 bg-amber-50 text-amber-500 rounded-xl active:scale-95 transition-all">
                  <IoRocket size={18} />
                </button>
              </div>
              <button
                onClick={() => handleDelete(listing.id)}
                className="p-2.5 bg-red-50 text-red-600 rounded-xl active:scale-95 transition-all">
                <IoTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsTab;
