"use client";

import Container from "@/components/Container";
import FavoritesCl from "@/components/FavoriteCl";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";

function FavoritesPage() {
  return (
    <div className="p-10 bg-[#f6f7f8] min-h-screen">
      <Container>
        <div className="flex items-center gap-3 text-[#7c8a9d] text-sm mb-5">
          <Link href="/" className="hover:text-[#278cf1]">
            Home
          </Link>
          <FaChevronRight size={10} />
          <p className="text-[#278cf1]">Favorites</p>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl text-[#0f172a] font-semibold">
            My Favorite Hostels
          </h1>
          <p className="text-[#6b7686] text-base mt-2">
            Your saved accommodations for quick access
          </p>
        </div>

        <div>
          <FavoritesCl />
        </div>
      </Container>
    </div>
  );
}

const WrappedFavoritesPage = () => (
  <ProtectedRoute>
    <FavoritesPage />
  </ProtectedRoute>
);

export default WrappedFavoritesPage;
