import React from "react";
import Overlay from "../../public/images/menu.jpg";
import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa";
import { IoBedSharp, IoPricetags, IoSearchSharp } from "react-icons/io5";

const MenuOverlay = () => {
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

          <p className="uppercase text-[10px] font-semibold border border-gray-100 text-gray-100 py-1 px-4 rounded-full bg-[#595754] mb-4">over 1,000+ verified listings</p>

          <h1 className="text-4xl md:text-5xl font-semibold mx-[20%]">
            Find Your Perfect <span className="text-[#278cf1]">Home</span> Near
            Campus
          </h1>

          <p className="mt-4 text-base text-gray-300  mx-[30%]">
            Connecting students with premium, verified hostels near campus.
            Secure your space for the upcoming session.
          </p>

          <div className="mt-6 bg-white px-4 py-3 rounded-2xl flex items-center justify-between gap-7">
            <div className="flex items-center gap-2">
              <FaGraduationCap size={20} className="text-[#278cf1]" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  UNIVERSITY
                </p>
                <input
                  type="search"
                  placeholder="e.g . University of Ilorin"
                  className="text-gray-700 text-sm outline-none"
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
                <select className="text-gray-600 outline-none font-semibold text-sm">
                  <option value={50 - 100} className="">
                    #50,000 - #100,000
                  </option>
                  <option value={50 - 100}>#101,000 - #200,000</option>

                  <option value={50 - 100}>#201,000 - #300,000</option>

                  <option value={50 - 100}>#301,000 - #400,000</option>

                  <option value={50 - 100}>#401,000 - #500,000</option>

                  <option value={50 - 100}>#501,000 - #900,000</option>
                  <option value={50 - 100}>#900,000+</option>
                </select>
              </div>
            </div>

            <hr className="h-full w-0.5 bg-gray-200 rounded-full" />

            <div className="flex items-center gap-2">
              <IoBedSharp size={20} className="text-[#278cf1]" />
              <div className="flex flex-col gap-0.5 items-start">
                <p className="text-[10px] font-semibold text-gray-600">
                  ROOM TYPE
                </p>
                <select className="text-gray-600 outline-none font-semibold text-sm">
                  <option value={"single-room"} className="">
                    Single Room
                  </option>
                  <option value={"room-and-parlour"}>Room and Parlour</option>

                  <option value={"2-bedroom"}>2 Bedroom</option>

                  <option value={"3-bedroom"}>3 Bedroom</option>

                  <option value={"room-selfcon"}>Room Selfcon</option>

                  <option value={"room-parlour-selfcon"}>
                    Room and Parlour Selfcon
                  </option>
                </select>
              </div>
            </div>

            <button className="flex items-center gap-1 bg-[#278cf1] py-3 px-4 rounded-md text-sm cursor-pointer hover:opacity-60 duration-150">
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
