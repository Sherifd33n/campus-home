import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoTrash, IoAdd } from "react-icons/io5";
import { nigeriaStates } from "@/data/listing";
import { roomTypes as availableRoomTypes } from "@/data/hostel";
import { Institution } from "@/types/listing";
import { Listing } from "../types";

interface ListingFormData {
  state: string;
  schoolId: string;
  name: string;
  about: string;
  gender: string;
  distanceToCampus: string;
}

interface PropertyRoom {
  type: string;
  price: string | number;
  availability: string;
}

interface ListingModalProps {
  isPropertyModalOpen: boolean;
  setIsPropertyModalOpen: (isOpen: boolean) => void;
  editingProperty: Listing | null;
  handleSaveProperty: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: ListingFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  filteredSchools: Institution[];
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedImages: string[];
  removeImage: (index: number) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  propertyRooms: PropertyRoom[];
  setPropertyRooms: React.Dispatch<React.SetStateAction<PropertyRoom[]>>;
}

const ListingModal: React.FC<ListingModalProps> = ({
  isPropertyModalOpen,
  setIsPropertyModalOpen,
  editingProperty,
  handleSaveProperty,
  formData,
  handleInputChange,
  filteredSchools,
  selectedAmenities,
  setSelectedAmenities,
  selectedImages,
  removeImage,
  handleImageUpload,
  propertyRooms,
  setPropertyRooms,
}) => {
  if (!isPropertyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPropertyModalOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-lg relative z-10 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingProperty ? "Edit Listing" : "Add New Listing"}
        </h2>
        <form
          onSubmit={handleSaveProperty}
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20">
                <option value="">Select State</option>
                {nigeriaStates.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">
                Target Institution
              </label>
              <select
                name="schoolId"
                value={formData.schoolId}
                onChange={handleInputChange}
                required
                disabled={!formData.state}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50">
                <option value="">Select School</option>
                {filteredSchools.map((sch) => (
                  <option key={sch.id} value={sch.id}>
                    {sch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              Property Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g Sunshine Premium Hostel"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              About the Property
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe your hostel, facilities, and unique selling points..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">
                Target Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20">
                <option value="Mixed">Mixed</option>
                <option value="Male Only">Male Only</option>
                <option value="Female Only">Female Only</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">
                Distance to Campus
              </label>
              <input
                name="distanceToCampus"
                value={formData.distanceToCampus}
                onChange={handleInputChange}
                required
                placeholder="e.g 5 mins walk"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Amenities Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 block">
              Amenities & Facilities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "WiFi",
                "24/7 Power",
                "Security",
                "CCTV",
                "Laundry",
                "Water",
                "Generator",
                "Gym",
                "Parking",
              ].map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-blue-200 transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity]);
                      } else {
                        setSelectedAmenities(
                          selectedAmenities.filter((a) => a !== amenity),
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-gray-700">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 block">
              Property Images (Max 5)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {selectedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative group">
                  <Image
                    src={img}
                    alt={`Preview ${idx}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <IoTrash className="text-xs" />
                  </button>
                </div>
              ))}
              {selectedImages.length < 5 && (
                <label className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <IoAdd className="text-gray-400 text-xl" />
                </label>
              )}
            </div>
          </div>

          {/* Rooms Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">
                Room Types & Pricing
              </label>
              <button
                type="button"
                onClick={() =>
                  setPropertyRooms([
                    ...propertyRooms,
                    {
                      type: "Single Room",
                      price: "",
                      availability: "AVAILABLE",
                    },
                  ])
                }
                className="text-[#278cf1] text-xs font-bold hover:underline flex items-center gap-1">
                <IoAdd /> Add Room Type
              </button>
            </div>
            {propertyRooms.map((room, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100 relative">
                <div className="col-span-5">
                  <select
                    value={room.type}
                    onChange={(e) => {
                      const newRooms = [...propertyRooms];
                      newRooms[idx].type = e.target.value;
                      setPropertyRooms(newRooms);
                    }}
                    className="w-full text-xs px-2 py-2 rounded-lg bg-white border border-gray-200">
                    {availableRoomTypes.map((rt) => (
                      <option key={rt.type} value={rt.type}>
                        {rt.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4">
                  <input
                    type="number"
                    value={room.price}
                    onChange={(e) => {
                      const newRooms = [...propertyRooms];
                      newRooms[idx].price = e.target.value;
                      setPropertyRooms(newRooms);
                    }}
                    placeholder="Price (₦)"
                    className="w-full text-xs px-2 py-2 rounded-lg bg-white border border-gray-200"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={room.availability}
                    onChange={(e) => {
                      const newRooms = [...propertyRooms];
                      newRooms[idx].availability = e.target.value;
                      setPropertyRooms(newRooms);
                    }}
                    className="w-full text-xs px-2 py-2 rounded-lg bg-white border border-gray-200">
                    <option value="AVAILABLE">Yes</option>
                    <option value="LIMITED">Ltd</option>
                    <option value="FULL">Fu</option>
                  </select>
                </div>
                {propertyRooms.length > 1 && (
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setPropertyRooms(
                          propertyRooms.filter((_, i) => i !== idx),
                        )
                      }
                      className="text-red-400 hover:text-red-600">
                      <IoTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
            <button
              type="button"
              onClick={() => setIsPropertyModalOpen(false)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-[#278cf1] text-white font-bold shadow-lg shadow-blue-500/20">
              Save Listing
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ListingModal;
