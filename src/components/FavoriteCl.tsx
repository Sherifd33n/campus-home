"use client";

import { useFavorites } from "@/context/FavoriteContext";
import { schoolHostels } from "@/data/hostel";
import HostelCard from "@/components/HostelCard";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import { EmptyState } from "@/components/common";

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
  schoolSlug: string;
}

export default function FavoritesClient() {
  const { favoriteHostels, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    toast("Are you sure you want to remove all favorites?", {
      description: "This action cannot be undone.",
      action: {
        label: "Clear All",
        onClick: () => {
          clearFavorites();
          toast.success("All favorites cleared successfully!");
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  if (favoriteHostels.length === 0) {
    return (
      <EmptyState
        icon={
          <div className="w-20 h-20 bg-[#e9f3fe] rounded-full flex items-center justify-center">
            <FaHeart className="text-[#278cf1] text-3xl" />
          </div>
        }
        title="No Favorites Yet"
        description="Start exploring hostels by states and save your favorites by clicking the heart icon. They will appear here for easy access."
        actionLabel="Browse by States"
        actionHref="/states"
      />
    );
  }

  return (
    <div>
      {/* Stats and Clear Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#6b7686]">
          You have{" "}
          <span className="font-semibold text-[#0f172a]">
            {favoriteHostels.length}
          </span>{" "}
          saved {favoriteHostels.length === 1 ? "hostel" : "hostels"}
        </p>
        <button
          onClick={handleClearAll}
          className="px-3 py-2 rounded-md bg-red-600 text-white hover:opacity-50 cursor-pointer text-sm font-medium transition">
          Clear All
        </button>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
        {favoriteHostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
}
