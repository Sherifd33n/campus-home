"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Container from "./Container";
import { useFavorites } from "@/context/FavoriteContext";
import { useComparison } from "@/context/ComparisonContext";
// import { FaRegHeart } from "react-icons/fa";
// import { FaCodeCompare } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { favoriteIds } = useFavorites();
  const { comparisonIds } = useComparison();

  return (
    <div className="z-50 sticky top-0 bg-[#feffff]">
      <Container className="py-4 flex items-center justify-between">
        <Logo />
        <ul className="flex items-center gap-10">
          <li>
            <Link
              href="/favorite"
              className="hover:text-[#278cf1] duration-150 flex items-center gap-1.5 relative text-sm font-medium">
              {/* <FaRegHeart className="text-lg" /> */}
              Favorite
              {favoriteIds.length > 0 && (
                <span className="bg-[#278cf1] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/compare"
              className="hover:text-[#278cf1] duration-150 flex items-center gap-1.5 relative text-sm font-medium text-gray-700">
              {/* <FaCodeCompare className="text-lg" /> */}
              Compare
              {comparisonIds.length > 0 && (
                <span className="bg-blue-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute -top-2 -right-2">
                  {comparisonIds.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-[#278cf1] duration-150 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              {/* <CgProfile className="text-lg" /> */}
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/register/agent"
              className="hover:text-[#278cf1] duration-150 text-sm font-medium text-gray-700">
              Become an Agent
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <button className="bg-[#278cf1] text-[#f9fcff] py-1.5 px-4 rounded-md cursor-pointer hover:bg-[#f9fcff] hover:text-[#278cf1] border border-[#278cf1] duration-200 transition-all text-sm">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-[#e7edf3] text-[#232a32] py-1.5 px-3 rounded-md cursor-pointer hover:bg-[#232a32] hover:text-[#e7edf3] border border-[#e7edf3] duration-200 transition-all text-sm">
              Sign Up
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
