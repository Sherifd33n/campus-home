import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Container from "./Container";

const Navbar = () => {
  return (
    <div className=" z-50 sticky top-0 bg-[#feffff]">
      <Container className="py-4 flex items-center justify-between">
        <Logo />
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="hover:text-gray-500 duration-150">
              Browse Hostels
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
