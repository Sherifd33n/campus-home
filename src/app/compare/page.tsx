"use client";

import React from "react";
import { useComparison } from "@/context/ComparisonContext";
import { schoolHostels } from "@/data/hostel";
import Container from "@/components/Container";
import { IoClose, IoAdd, IoCheckmark } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Hostel } from "@/data/hostel";

const ComparisonPage = () => {
  const { comparisonIds, removeFromComparison, clearComparison } =
    useComparison();

  const comparedHostels = comparisonIds
    .map((id) => schoolHostels.find((h) => h.id === id))
    .filter((h): h is Hostel => h !== undefined);

  if (comparisonIds.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 mt-16">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-4xl mb-6">
          <IoAdd />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          No hostels to compare
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          Add hostels from the search results to see them side-by-side and
          choose the best one for you.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-[#278cf1] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
          Browse Hostels
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 mt-16 pb-20">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Compare Hostels
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Comparing {comparedHostels.length} of 4 max hostels
            </p>
          </div>
          <button
            onClick={clearComparison}
            className="text-red-500 text-sm font-bold hover:underline">
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="p-6 bg-gray-50/50 w-48 shrink-0"></th>
                  {comparedHostels.map((h: any) => (
                    <th
                      key={h.id}
                      className="p-6 min-w-[280px] relative border-l border-gray-100">
                      <button
                        onClick={() => removeFromComparison(h.id)}
                        className="absolute top-4 right-4 p-1.5 bg-gray-100 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                        <IoClose />
                      </button>
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                        <Image
                          src={h.images[0]}
                          alt={h.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                        {h.name}
                      </h3>
                      <Link
                        href={`/hostels/${h.slug}`}
                        className="text-[#278cf1] text-xs font-bold hover:underline">
                        View Details
                      </Link>
                    </th>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <th
                        key={`empty-${i}`}
                        className="p-6 min-w-[280px] border-l border-gray-100 bg-gray-50/20 animate-pulse">
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 mb-2">
                            <IoAdd size={24} />
                          </div>
                          <p className="text-xs text-gray-400 font-medium">
                            Add to compare
                          </p>
                        </div>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Price Row */}
                <tr>
                  <td className="p-6 bg-gray-50/50 font-bold text-sm text-gray-900">
                    Price / Year
                  </td>
                  {comparedHostels.map((h: any) => (
                    <td key={h.id} className="p-6 border-l border-gray-100">
                      <span className="text-xl font-bold text-[#278cf1]">
                        ₦{h.startingPrice.toLocaleString()}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <td
                        key={`empty-price-${i}`}
                        className="p-6 border-l border-gray-100"></td>
                    ),
                  )}
                </tr>

                {/* Location Row */}
                <tr>
                  <td className="p-6 bg-gray-50/50 font-bold text-sm text-gray-900">
                    Distance to Campus
                  </td>
                  {comparedHostels.map((h: any) => (
                    <td
                      key={h.id}
                      className="p-6 border-l border-gray-100 text-gray-700 font-medium">
                      {h.distanceToCampus}
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <td
                        key={`empty-dist-${i}`}
                        className="p-6 border-l border-gray-100"></td>
                    ),
                  )}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className="p-6 bg-gray-50/50 font-bold text-sm text-gray-900">
                    Rating
                  </td>
                  {comparedHostels.map((h: any) => (
                    <td key={h.id} className="p-6 border-l border-gray-100">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <IoCheckmark />
                        <span className="font-bold text-gray-900">
                          {h.rating}
                        </span>
                        <span className="text-xs text-gray-400 font-normal">
                          ({h.reviews})
                        </span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <td
                        key={`empty-rate-${i}`}
                        className="p-6 border-l border-gray-100"></td>
                    ),
                  )}
                </tr>

                {/* Gender Row */}
                <tr>
                  <td className="p-6 bg-gray-50/50 font-bold text-sm text-gray-900">
                    Accommodation
                  </td>
                  {comparedHostels.map((h: any) => (
                    <td key={h.id} className="p-6 border-l border-gray-100">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold text-[10px] rounded-full uppercase tracking-wider">
                        {h.gender}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <td
                        key={`empty-gender-${i}`}
                        className="p-6 border-l border-gray-100"></td>
                    ),
                  )}
                </tr>

                {/* Amenities Row */}
                <tr>
                  <td className="p-6 bg-gray-50/50 font-bold text-sm text-gray-900 align-top">
                    Top Amenities
                  </td>
                  {comparedHostels.map((h: any) => (
                    <td key={h.id} className="p-6 border-l border-gray-100">
                      <div className="space-y-2">
                        {h.amenities.slice(0, 5).map((amenity: string) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-xs text-gray-600">
                            <IoCheckmark className="text-green-500" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 4 - comparedHostels.length }).map(
                    (_, i) => (
                      <td
                        key={`empty-amenities-${i}`}
                        className="p-6 border-l border-gray-100"></td>
                    ),
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComparisonPage;
