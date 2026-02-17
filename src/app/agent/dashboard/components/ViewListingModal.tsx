import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Listing } from "../types";

interface ViewListingModalProps {
  isViewModalOpen: boolean;
  setIsViewModalOpen: (isOpen: boolean) => void;
  viewingProperty: Listing | null;
}

const ViewListingModal: React.FC<ViewListingModalProps> = ({
  isViewModalOpen,
  setIsViewModalOpen,
  viewingProperty,
}) => {
  if (!isViewModalOpen || !viewingProperty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsViewModalOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {viewingProperty.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${viewingProperty.status === "Active" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>
                {viewingProperty.status}
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-500 text-sm">
                {viewingProperty.location}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {viewingProperty.images.map((img, idx) => (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden aspect-square ${idx === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img
                  src={img}
                  alt={`View ${idx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {viewingProperty.about}
              </p>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {viewingProperty.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-600 border border-gray-100">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">
                  Property Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Target Gender</span>
                    <span className="font-bold text-gray-900">
                      {viewingProperty.gender}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Distance to Campus</span>
                    <span className="font-bold text-gray-900">
                      {viewingProperty.distanceToCampus}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Starting Price</span>
                    <span className="font-bold text-[#278cf1]">
                      {viewingProperty.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-4">Room Types</h3>
                <div className="space-y-2">
                  {viewingProperty.rooms.map((room, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm bg-white p-2 rounded-lg border border-blue-100/50">
                      <span className="text-gray-700 font-medium">
                        {room.type}
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-[#278cf1]">
                          ₦{parseInt(room.price).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {room.availability}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewListingModal;
