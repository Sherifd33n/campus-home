"use client";

// components/HostelCard.tsx
import { useFavorites } from "@/context/FavoriteContext";
import { useComparison } from "@/context/ComparisonContext";
import {
  FaHeart,
  FaRegHeart,
  FaLocationDot,
  FaCodeCompare,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import { Hostel } from "@/data/hostel";

interface HostelCardProps {
  hostel: Hostel;
  onFavoriteChange?: () => void; // Optional callback for favorites page
}

export default function HostelCard({
  hostel,
  onFavoriteChange,
}: HostelCardProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isInComparison, addToComparison, removeFromComparison } =
    useComparison();

  const favorited = favoriteIds.includes(hostel.id);
  const inComparison = isInComparison(hostel.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(hostel.id);

    // Trigger callback if provided (for favorites page to refresh if needed)
    onFavoriteChange?.();
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(hostel.id);
    } else {
      addToComparison(hostel.id);
    }
  };

  return (
    <Link
      href={`/hostels/${hostel.slug}`}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
      {/* Hostel Image */}
      <div className="relative h-36">
        <Image
          src={hostel.images[0]}
          alt={hostel.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Favorite Button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full shadow-md transition cursor-pointer ${
              favorited
                ? "bg-red-50 text-red-500"
                : "bg-white/90 hover:bg-white text-gray-600"
            }`}
            aria-label="Add to favorites">
            {favorited ? (
              <FaHeart className="text-base" />
            ) : (
              <FaRegHeart className="text-base" />
            )}
          </button>

          <button
            onClick={handleCompareClick}
            className={`p-2 rounded-full shadow-md transition cursor-pointer ${
              inComparison
                ? "bg-blue-50 text-blue-500"
                : "bg-white/90 hover:bg-white text-gray-600"
            }`}
            aria-label="Add to comparison">
            <FaCodeCompare className="text-base" />
          </button>
        </div>
      </div>

      {/* Hostel Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#0f172a] group-hover:text-[#278cf1] transition">
          {hostel.name}
        </h3>

        {/* <p className="text-sm text-[#6b7686] mt-1">
          {hostel.address}, {hostel.city}
        </p> */}

        <p className="text-sm flex items-center gap-1 text-[#278cf1] font-medium mt-1">
          <FaLocationDot /> {hostel.distanceToCampus}
        </p>

        {/* Rating & Reviews */}
        {/* <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold text-sm">{hostel.rating}</span>
          </div>
          <span className="text-[#6b7686] text-sm">
            ({hostel.reviews} reviews)
          </span>
        </div> */}

        {/* Price */}
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs text-[#6b7686]">Starting from</p>
          <p className="text-xl font-bold text-[#0f172a]">
            ₦{hostel.startingPrice.toLocaleString()}
            <span className="text-sm font-normal text-[#6b7686]">/year</span>
          </p>
        </div>

        {/* Amenities Preview */}
        {/* <div className="flex flex-wrap gap-2 mt-3">
          {hostel.amenities.slice(0, 3).map((amenity: string, idx: number) => (
            <span
              key={idx}
              className="text-xs bg-[#e9f3fe] text-[#278cf1] px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {hostel.amenities.length > 3 && (
            <span className="text-xs text-[#6b7686] px-2 py-1">
              +{hostel.amenities.length - 3} more
            </span>
          )}
        </div> */}

        {/* Room Types */}
        {/* <div className="mt-3 text-xs text-[#6b7686]">
          {hostel.rooms.length} room type{hostel.rooms.length > 1 ? "s" : ""} •{" "}
          {hostel.gender}
        </div> */}
      </div>
    </Link>
  );
}
