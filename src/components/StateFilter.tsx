"use client";

import { institutions } from "@/data/listing";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

export default function StateFilter() {
  const { stateId } = useParams();
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const buttons = [
    { id: "all", label: "All Institutions" },
    { id: "university", label: "University" },
    { id: "polytechnic", label: "Polytechnic" },
    { id: "college", label: "College" },
  ];

  const stateInstitutions = institutions.filter(
    (inst) => inst.stateId === stateId,
  );

  const filteredInstitutions = stateInstitutions.filter((inst) => {
    const matchesCategory = active === "all" || inst.type === active;

    const matchesSearch = inst.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-3 flex-wrap">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActive(btn.id)}
              className={`px-4 py-2 rounded-md cursor-pointer transition 
              ${
                active === btn.id
                  ? "bg-[#278cf1] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}>
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-2 bg-[#f6f7f8] px-3 py-2 items-center rounded-md">
            <IoIosSearch size={17} />
            <input
              type="search"
              placeholder="Search by school name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent"
            />
          </div>

          <div className="bg-[#e9f3fe] p-2 rounded-md cursor-pointer hidden md:block">
            <IoFilterSharp size={20} className="text-[#278cf1]" />
          </div>
        </div>
      </div>

      {filteredInstitutions.length === 0 ? (
        <p className="mt-10 text-gray-500">
          No institutions found for this selection.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredInstitutions.map((institution) => (
            <Link
              key={institution.id}
              href={`/states/${institution.stateId}/${institution.schoolSlug}`}
              className="relative h-48 md:h-55 rounded-xl overflow-hidden group">
              <Image
                src={institution.image}
                alt={institution.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">{institution.shortName}</p>
                <p className="text-sm text-gray-200">{institution.city}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
