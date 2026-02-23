"use client";

import Link from "next/link";
import Image from "next/image";
import { states } from "@/data/state";
import Container from "@/components/Container";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";

export default function AllStatesPage() {
  const [showAll, setShowAll] = useState(false);

  const initialCount = 12;

  const displayedStates = showAll ? states : states.slice(0, initialCount);

  return (
    <div className="p-2 sm:p-10 bg-gray-50">
      <Container className="px-6">
        <div className="flex items-center gap-3 text-[#7c8a9d] text-sm mb-5">
          <Link href="/" className="hover:text-[#278cf1]">
            Home
          </Link>
          <FaChevronRight size={10} />
          <p className="text-[#278cf1]">All states</p>
        </div>

        <div>
          <p className="text-3xl font-semibold text-[#131b2d]">
            Find your home away from home
          </p>
          <p className="texts-sm text-[#727d8c] mt-2 md:mr-[20%] xl:mr-[50%]">

            Explore student accommodations across the country. Choose a state to
            see our available hostels near your university.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 ">
          {displayedStates.map((state) => (
            <div key={state.id} className="border rounded-2xl border-gray-300">
              <div className="relative rounded-t-2xl overflow-hidden group h-40">
                <Image
                  src={state.image}
                  alt={state.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
                <div className="absolute bottom-4 left-4 text-white  text-2xl">
                  {state.name}
                </div>
              </div>

              <div className="text-center p-4">
                <Link
                  href={`/states/${state.id}`}
                  className="text-center bg-[#e9f3fe] text-[#278cf1] text-sm w-full py-2 rounded-md flex justify-center hover:bg-[#278cf1] hover:text-[#e9f3fe] transition-all duration-200">
                  Explore {state.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {states.length > initialCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-transparent border border-gray-400 cursor-pointer text-[#131b2d] rounded-lg hover:bg-[#1f7dd4] transition font-medium">
              {showAll ? "Load less state" : `Load more states`}
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
