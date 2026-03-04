"use client";

import Link from "next/link";
import Image from "next/image";
import { states } from "@/data/state";
import Container from "@/components/Container";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useState, useMemo } from "react";

export default function AllStatesPage() {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialCount = 12;

  const filteredStates = useMemo(() => {
    return states.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const displayedStates = showAll
    ? filteredStates
    : filteredStates.slice(0, initialCount);

  return (
    <div className="p-2 sm:p-10 bg-gray-50 min-h-screen">
      <Container className="px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 text-[#7c8a9d] text-sm mb-5">
              <Link href="/" className="hover:text-[#278cf1]">
                Home
              </Link>
              <FaChevronRight size={10} />
              <p className="text-[#278cf1]">All states</p>
            </div>
            <h1 className="text-3xl font-semibold text-[#131b2d]">
              Find your home away from home
            </h1>
            <p className="text-sm text-[#727d8c] mt-2 max-w-xl">
              Explore student accommodations across the country. Choose a state
              to see our available hostels near your university.
            </p>
          </div>

          <div className="relative w-full md:w-80 lg:w-96">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {displayedStates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedStates.map((state) => (
              <div
                key={state.id}
                className="bg-white border rounded-2xl border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={state.image}
                    alt={state.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-2xl tracking-tight">
                    {state.name}
                  </div>
                </div>

                <div className="p-4">
                  <Link
                    href={`/states/${state.id}`}
                    className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold flex justify-center items-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Explore {state.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-300 text-xl" />
            </div>
            <p className="text-gray-500 font-medium">
              No states found matching &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 font-bold hover:underline">
              Clear search
            </button>
          </div>
        )}

        {filteredStates.length > initialCount && searchTerm === "" && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-3.5 bg-white border border-gray-200 text-[#131b2d] font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              {showAll ? "Show Less" : "Explore All States"}
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
