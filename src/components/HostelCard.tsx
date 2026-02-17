"use client";

// components/HostelCard.tsx
import { useFavorites } from "@/context/FavoriteContext";
import { FaHeart, FaRegHeart, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

interface Hostel {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distanceToCampus: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  images: string[];
  amenities: string[];
  rooms: Array<{
    type: string;
    price: number;
    availability: string;
  }>;
  gender: string;
}

interface HostelCardProps {
  hostel: Hostel;
  onFavoriteChange?: () => void; // Optional callback for favorites page
}

export default function HostelCard({
  hostel,
  onFavoriteChange,
}: HostelCardProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favorited = favoriteIds.includes(hostel.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(hostel.id);

    // Trigger callback if provided (for favorites page to refresh if needed)
    onFavoriteChange?.();
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
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition z-10 cursor-pointer ${
            favorited
              ? "bg-red-50 text-red-500"
              : "bg-white/90 hover:bg-white text-gray-600"
          }`}
          aria-label="Add to favorites">
          {favorited ? (
            <FaHeart className="text-lg" />
          ) : (
            <FaRegHeart className="text-lg" />
          )}
        </button>
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
