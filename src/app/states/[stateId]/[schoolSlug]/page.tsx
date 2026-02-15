// app/states/[stateId]/[schoolSlug]/page.tsx

import { schoolHostels } from "@/data/hostel";
import { states } from "@/data/state";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  params: {
    stateId: string;
    schoolSlug: string;
  };
}

export default function SchoolHostelsPage({ params }: Props) {
  const { stateId, schoolSlug } = params;
  const state = states.find((s) => s.id.toLowerCase() === stateId.toLowerCase());
  if (!state) return <div className="p-10">State not found</div>;

  const hostels = schoolHostels.filter(
    (hostel) =>
      hostel.state.toLowerCase() === state.name.toLowerCase() &&
      hostel.schoolSlug.toLowerCase() === schoolSlug.toLowerCase()
  );

  return (
    <div className="p-10 bg-[#f6f7f8]">
      <div className="flex items-center gap-3 text-[#7c8a9d] text-sm">
        <Link href="/">Home</Link>
        <FaChevronRight size={10} />
        <Link href="/states">All States</Link>
        <FaChevronRight size={10} />
        <Link href={`/states/${stateId}`}>{state.name}</Link>
        <FaChevronRight size={10} />
        <p className="text-[#278cf1]">{schoolSlug.toUpperCase()}</p>
      </div>

      <h1 className="text-3xl font-semibold mt-6">
        Hostels near {schoolSlug.toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {hostels.length === 0 ? (
          <p>No hostels found</p>
        ) : (
          hostels.map((hostel) => (
            <div key={hostel.id} className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">{hostel.name}</h2>
              <p className="text-sm text-gray-500">{hostel.city}</p>
              <p className="text-blue-600 font-medium mt-2">
                ₦{hostel.startingPrice.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
