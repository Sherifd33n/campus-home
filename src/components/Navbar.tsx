"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Container from "./Container";
import { useFavorites } from "@/context/FavoriteContext";

const Navbar = () => {
  const { favoriteIds } = useFavorites();

  return (
    <div className="z-50 sticky top-0 bg-[#feffff]">
      <Container className="py-4 flex items-center justify-between">
        <Logo />
        <ul className="flex items-center gap-12">
          <li>
            <Link
              href="/favorite"
              className="hover:text-gray-500 duration-150 flex items-center gap-1.5 relative">
              Favorite
              {favoriteIds.length > 0 && (
                <span className="bg-[#278cf1] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full absolute top-0 -right-4">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-500 duration-150">
              Become an Agent
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button className="bg-[#278cf1] text-[#f9fcff] py-1.5 px-4 rounded-md cursor-pointer hover:bg-[#f9fcff] hover:text-[#278cf1] border duration-200 transition-all text-sm">
            Login
          </button>
          <button className="bg-[#e7edf3] text-[#232a32] py-1.5 px-3 rounded-md cursor-pointer hover:bg-[#232a32] hover:text-[#e7edf3] border border-[#e7edf3] duration-200 transition-all text-sm">
            Sign Up
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
