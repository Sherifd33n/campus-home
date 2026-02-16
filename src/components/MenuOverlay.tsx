"use client";

import React, { useState } from "react";
import Overlay from "../../public/images/menu.jpg";
import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import { IoBedSharp, IoPricetags, IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { institutions } from "@/data/listing";
import { roomTypes } from "@/data/hostel";

const MenuOverlay = () => {
  const router = useRouter();
  const [university, setUniversity] = useState("");
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState(roomTypes[0].type);
  const [error, setError] = useState("");

  const handleSearch = () => {
    // Clear previous errors
    setError("");

    // Validate university input
    if (!university.trim()) {
      setError("Please enter a university name");
      return;
    }

    // Find matching institution (case-insensitive search by name or shortName)
    const matchedInstitution = institutions.find(
      (inst) =>
        inst.name.toLowerCase().includes(university.toLowerCase()) ||
        inst.shortName.toLowerCase().includes(university.toLowerCase()),
    );

    if (!matchedInstitution) {
      setError("University not found. Please check the name and try again.");
      return;
    }

    // Construct URL with search params
    const params = new URLSearchParams();
    if (budget) params.append("budget", budget);
    if (roomType) params.append("roomType", roomType);

    const url = `/states/${matchedInstitution.stateId}/${matchedInstitution.schoolSlug}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    // Navigate to school page
    router.push(url);
  };

  return (
    <div>
      {" "}
      <div className="relative w-full h-[calc(100vh-65px)]">
        <Image
          src={Overlay}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          fill
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="uppercase text-[10px] font-semibold border border-gray-100 text-gray-100 py-1 px-4 rounded-full bg-[#595754] mb-4">
            over 1,000+ verified listings
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mx-[20%]">
            Find Your Perfect <span className="text-[#278cf1]">Home</span> Near
            Campus
          </h1>

          <p className="mt-4 text-base text-gray-300  mx-[30%]">
            Connecting students with premium, verified hostels near campus.
            Secure your space for the upcoming session.
          </p>

          {error && (
            <p className="mt-4 text-red-400 text-sm bg-red-900/30 px-4 py-2 rounded-md">
              {error}
            </p>
          )}

          <div className="mt-6 bg-white px-4 py-3 rounded-2xl flex items-center justify-between gap-7">
            <div className="flex items-center gap-2">
              <FaGraduationCap size={20} className="text-[#278cf1]" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  UNIVERSITY
                </p>
                <input
                  type="search"
                  placeholder="e.g. University of Ilorin"
                  className="text-gray-700 text-sm outline-none"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            </div>

            <hr className="h-full w-0.5 bg-gray-200 rounded-full" />

            <div className="flex items-center gap-2">
              <IoPricetags size={20} className="text-[#278cf1]" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  BUDGET
                </p>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  className="text-gray-700 text-sm outline-none"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <hr className="h-full w-0.5 bg-gray-200 rounded-full" />

            <div className="flex items-center gap-2">
              <IoBedSharp size={20} className="text-[#278cf1]" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  ROOM TYPE
                </p>
                <select
                  className="text-gray-600 outline-none font-semibold text-sm"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}>
                  {roomTypes.map((room) => (
                    <option key={room.type} value={room.type}>
                      {room.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="flex items-center gap-1 bg-[#278cf1] py-3 px-4 rounded-md text-sm cursor-pointer hover:opacity-60 duration-150"
              onClick={handleSearch}>
              <IoSearchSharp size={18} />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
