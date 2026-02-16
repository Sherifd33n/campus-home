// app/states/[stateId]/[schoolSlug]/page.tsx
import { institutions } from "@/data/listing";
import { schoolHostels } from "@/data/hostel";
import { states } from "@/data/state";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import HostelCard from "@/components/HostelCard";
import Container from "@/components/Container";

interface Props {
  params: { stateId: string; schoolSlug: string };
}

export default async function SchoolPage({ params }: Props) {
  const { stateId, schoolSlug } = await params;

  if (!stateId || !schoolSlug) {
    return <div className="p-10">Invalid URL parameters</div>;
  }

  const school = institutions.find(
    (inst) =>
      inst.schoolSlug?.toLowerCase() === schoolSlug.toLowerCase() &&
      inst.stateId?.toLowerCase() === stateId.toLowerCase(),
  );

  if (!school) return <div className="p-10">School not found</div>;

  // Get state info
  const state = states.find((s) => s.id === stateId);

  // Filter hostels by schoolSlug
  const schoolHostelsList = schoolHostels.filter(
    (hostel) => hostel.schoolSlug?.toLowerCase() === schoolSlug.toLowerCase(),
  );

  // Get all other schools in the same state (excluding current school)
  const otherSchools = institutions.filter(
    (inst) => inst.stateId === stateId && inst.schoolSlug !== schoolSlug,
  );

  return (
    <div className="p-10 bg-[#f6f7f8]">
      <Container>
        <div className="flex items-center gap-3 text-[#7c8a9d] text-sm mb-5">
          <Link href="/" className="hover:text-[#278cf1]">
            Home
          </Link>
          <FaChevronRight size={10} />
          <Link href="/states" className="hover:text-[#278cf1]">
            All states
          </Link>
          <FaChevronRight size={10} />
          <Link href={`/states/${stateId}`} className="hover:text-[#278cf1]">
            {state?.name}
          </Link>
          <FaChevronRight size={10} />
          <p className="text-[#278cf1]">{school.shortName}</p>
        </div>

        {/* School Header */}
        <h1 className="text-3xl text-[#0f172a] font-semibold">{school.name}</h1>
        <p className="text-[#6b7686] text-base mt-2">
          {school.city}, {state?.name}
        </p>

        {/* Hostels Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
            Available Hostels Near {school.shortName} (
            {schoolHostelsList.length})
          </h2>

          {schoolHostelsList.length === 0 ? (
            <div className="bg-white rounded-lg p-10 text-center">
              <p className="text-gray-500">
                No hostels available for {school.shortName} yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolHostelsList.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          )}
        </div>

        {/* Other Schools in Same State */}
        {otherSchools.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
              Other Institutions in {state?.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherSchools.map((institution) => (
                <Link
                  key={institution.id}
                  href={`/states/${institution.stateId}/${institution.schoolSlug}`}
                  className="relative h-55 rounded-xl overflow-hidden group">
                  <Image
                    src={institution.image}
                    alt={institution.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg">
                      {institution.shortName}
                    </p>
                    <p className="text-sm text-gray-200">{institution.city}</p>
                    <p className="text-xs text-gray-300 mt-1 capitalize">
                      {institution.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
