// app/states/[stateId]/[schoolSlug]/page.tsx
import { institutions } from "@/data/listing";
import { schoolHostels } from "../../../../data/hostel"
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

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
      inst.stateId?.toLowerCase() === stateId.toLowerCase()
  );

  if (!school) return <div className="p-10">School not found</div>;

  // Filter hostels by schoolSlug
  const schoolHostelsList = schoolHostels.filter(
    (hostel) => hostel.schoolSlug?.toLowerCase() === schoolSlug.toLowerCase()
  );

  return (
    <div className="p-10 bg-[#f6f7f8]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-[#7c8a9d] text-sm mb-5">
        <Link href="/" className="hover:text-[#278cf1]">
          Home
        </Link>
        <FaChevronRight size={10} />
        <Link href="/states" className="hover:text-[#278cf1]">
          All States
        </Link>
        <FaChevronRight size={10} />
        <Link href={`/states/${stateId}`} className="hover:text-[#278cf1]">
          {school.stateId}
        </Link>
        <FaChevronRight size={10} />
        <p className="text-[#278cf1]">{school.shortName}</p>
      </div>

      {/* School Header */}
      <h1 className="text-3xl text-[#0f172a] font-semibold">
        {school.name}
      </h1>
      <p className="text-[#6b7686] text-base mt-2">
        {school.city}, {school.stateId.toUpperCase()}
      </p>

      {/* Hostels Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-[#0f172a] mb-5">
          Available Hostels ({schoolHostelsList.length})
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
              <Link
                key={hostel.id}
                href={`/hostels/${hostel.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                {/* Hostel Image - You'll need to add images to your hostel data */}
                <div className="relative h-48 bg-gray-200">
                  {/* Placeholder - replace with actual image when available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {hostel.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Featured Badge */}
                  {hostel.featured && (
                    <div className="absolute top-3 left-3 bg-[#278cf1] text-white px-3 py-1 rounded-md text-xs font-semibold">
                      Featured
                    </div>
                  )}
                  
                  {/* Verified Badge */}
                  {hostel.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                      Verified
                    </div>
                  )}
                </div>

                {/* Hostel Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-[#0f172a] group-hover:text-[#278cf1] transition">
                    {hostel.name}
                  </h3>
                  
                  <p className="text-sm text-[#6b7686] mt-1">
                    {hostel.address}, {hostel.city}
                  </p>
                  
                  <p className="text-sm text-[#278cf1] font-medium mt-2">
                    {hostel.distanceToCampus}
                  </p>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-sm">{hostel.rating}</span>
                    </div>
                    <span className="text-[#6b7686] text-sm">
                      ({hostel.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-[#6b7686]">Starting from</p>
                    <p className="text-xl font-bold text-[#0f172a]">
                      ₦{hostel.startingPrice.toLocaleString()}
                      <span className="text-sm font-normal text-[#6b7686]">/year</span>
                    </p>
                  </div>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hostel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#e9f3fe] text-[#278cf1] px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hostel.amenities.length > 3 && (
                      <span className="text-xs text-[#6b7686] px-2 py-1">
                        +{hostel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Room Types */}
                  <div className="mt-3 text-xs text-[#6b7686]">
                    {hostel.rooms.length} room type{hostel.rooms.length > 1 ? 's' : ''} • {hostel.gender}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}