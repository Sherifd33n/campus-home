"use client";

import React, { useState } from "react";
import Overlay from "../../public/images/menu.jpg";
import Image from "next/image";
import { IoBedSharp, IoPricetags, IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { roomTypes } from "@/data/hostel";
import { institutions } from "@/data/listing";
import type { Institution } from "@/types/listing";
import UniversityAutocomplete from "./UniversityAutocomplete";

const MenuOverlay = () => {
  const router = useRouter();
  const [universityInput, setUniversityInput] = useState(""); // display text
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [budget, setBudget] = useState("");
  const [roomType, setRoomType] = useState(roomTypes[0].type);
  const [error, setError] = useState("");

  const handleSelect = (inst: Institution) => {
    setSelectedInstitution(inst);
    setUniversityInput(inst.name);
    setError("");
  };

  const handleClear = () => {
    setSelectedInstitution(null);
    setUniversityInput("");
    setError("");
  };

  const handleSearch = () => {
    setError("");

    if (!universityInput.trim()) {
      setError("Please enter a university name");
      return;
    }

    // Use the selected institution from the dropdown first;
    // fall back to fuzzy-matching what the user typed (in case they skipped the dropdown)
    let institution = selectedInstitution;

    if (!institution) {
      institution =
        institutions.find(
          (inst: Institution) =>
            inst.name.toLowerCase().includes(universityInput.toLowerCase()) ||
            inst.shortName
              .toLowerCase()
              .includes(universityInput.toLowerCase()),
        ) ?? null;
    }

    if (!institution) {
      setError("University not found. Please select from the suggestions.");
      return;
    }

    const params = new URLSearchParams();
    if (budget) params.append("budget", budget);
    if (roomType) params.append("roomType", roomType);

    const url = `/states/${institution.stateId}/${institution.schoolSlug}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    router.push(url);
  };

  return (
    <div>
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

          <p className="mt-4 text-base text-gray-300 mx-[30%]">
            Connecting students with premium, verified hostels near campus.
            Secure your space for the upcoming session.
          </p>

          {error && (
            <p className="mt-4 text-red-400 text-sm bg-red-900/30 px-4 py-2 rounded-md">
              {error}
            </p>
          )}

          <div className="mt-6 bg-white px-4 py-3 rounded-2xl flex items-center justify-between gap-7">
            {/* University Autocomplete */}
            <UniversityAutocomplete
              value={universityInput}
              onChange={(val) => {
                setUniversityInput(val);
                // If the user edits after selecting, clear the selection
                if (selectedInstitution) setSelectedInstitution(null);
                setError("");
              }}
              onSelect={handleSelect}
              onClear={handleClear}
              error={error && !universityInput ? error : undefined}
            />

            <hr className="h-full w-0.5 bg-gray-200 rounded-full self-stretch" />

            {/* Budget */}
            <div className="flex items-center gap-2">
              <IoPricetags size={20} className="text-[#278cf1] shrink-0" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  BUDGET
                </p>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  className="text-gray-700 text-sm outline-none w-24"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <hr className="h-full w-0.5 bg-gray-200 rounded-full self-stretch" />

            {/* Room Type */}
            <div className="flex items-center gap-2">
              <IoBedSharp size={20} className="text-[#278cf1] shrink-0" />
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
              className="flex items-center gap-1 bg-[#278cf1] py-3 px-4 rounded-md text-sm cursor-pointer hover:opacity-60 duration-150 shrink-0 text-white"
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
