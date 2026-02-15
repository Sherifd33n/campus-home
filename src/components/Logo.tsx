import Link from "next/link";
import React from "react";
import { MdApartment } from "react-icons/md";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="inline-flex gap-0.5 items-center font-semibold text-xl text-[#1e252c]">
        <MdApartment className="text-[#278cf1]" size={28}/>
        CampusHome
      </Link>
    </div>
  );
};

export default Logo;
