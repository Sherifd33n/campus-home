
"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useHostels } from "@/context/HostelContext";
import { institutions } from "@/data/listing";
import Container from "@/components/Container";
import ImageGallery from "@/components/ImageGallery";
import {
  FaLocationDot,
  FaStar,
  FaCheck,
  FaChevronRight,
  FaWifi,
  FaBolt,
  FaShieldHalved,
  FaUserGroup,
} from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import {
  MdOutlineKitchen,
  MdVerified,
  MdVerifiedUser,
  MdOutlineFactCheck,
  MdOutlineAssignmentReturn,
} from "react-icons/md";
import { FaShieldHeart } from "react-icons/fa6";
import ReviewsSection from "@/components/ReviewsSection";
import ScheduleVisitModal from "@/components/ScheduleVisitModal";
import ReservationModal from "@/components/ReservationModal";
import BookingModal from "@/components/BookingModal";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function HostelDetailsPage({ params }: Props) {
  const { slug } = use(params);
  const { getHostelBySlug, isLoading } = useHostels();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const hostel = getHostelBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hostel) {
    notFound();
  }

  const school = institutions.find(
    (inst) => inst.schoolSlug === hostel.schoolSlug,
  );

  // Helper to map amenities to icons
  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi")) return <FaWifi />;
    if (
      lower.includes("power") ||
      lower.includes("electricity") ||
      lower.includes("generator")
    )
      return <FaBolt />;
    if (lower.includes("security") || lower.includes("cctv"))
      return <FaShieldHalved />;
    if (lower.includes("water")) return <FaBath />;
    if (lower.includes("kitchen")) return <MdOutlineKitchen />;
    if (lower.includes("laundry")) return <FaUserGroup />;
    return <FaCheck />;
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <div className="py-4">
        <Container>
          <div className="flex items-center gap-3 text-sm text-[#6b7686]">
            <Link href="/" className="hover:text-[#278cf1]">
              Home
            </Link>
            <FaChevronRight size={10} />
            <Link
              href={`/states/${school?.stateId}/${school?.schoolSlug}`}
              className="hover:text-[#278cf1]">
              {school?.shortName}
            </Link>
            <FaChevronRight size={10} />
            <span className="text-[#278cf1] text-base truncate">
              {hostel.name}
            </span>
          </div>
        </Container>
      </div>

      <Container className="mt-8">
        {/* Image Gallery Grid */}
        <ImageGallery images={hostel.images} hostelName={hostel.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="">
              <div className="flex flex-wrap gap-2 mb-3">
                <p className="text-[#278cf1] capitalize inline-flex items-center bg-[#e1ebf7] px-2.5 py-1 border border-[#278cf1]/30 rounded-full text-[11px] font-semibold gap-1.5 shadow-sm">
                  <MdVerified size={14} /> Verified Property
                </p>
                {hostel.agentVerified && (
                  <p className="text-emerald-600 capitalize inline-flex items-center bg-emerald-50 px-2.5 py-1 border border-emerald-200 rounded-full text-[11px] font-semibold gap-1.5 shadow-sm">
                    <MdVerifiedUser size={14} /> Verified Agent
                  </p>
                )}
                {hostel.inspectionCompleted && (
                  <p className="text-amber-600 capitalize inline-flex items-center bg-amber-50 px-2.5 py-1 border border-amber-200 rounded-full text-[11px] font-semibold gap-1.5 shadow-sm">
                    <MdOutlineFactCheck size={14} /> Inspection Completed
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
                    {hostel.name}
                  </h1>
                  <p className="flex items-center gap-1.5 text-[#6b7686] mt-2 text-sm sm:text-base">
                    <FaLocationDot className="text-[#278cf1]" />
                    {hostel.address}, {hostel.city}
                  </p>
                  <p className="inline-block mt-3 px-3 py-1 bg-slate-100 text-[#0f172a] text-[12px] sm:text-sm font-medium rounded-full">
                    {hostel.distanceToCampus}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left md:text-right">
                    <div className="flex items-center md:justify-end gap-1 text-yellow-500 mb-1">
                      <FaStar />
                      <span className="text-[#0f172a] font-bold">
                        {hostel.rating}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b7686]">
                      {hostel.reviews} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* About Section */}
            <div className="">
              <h2 className="text-xl font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                About the Hostel
              </h2>
              <p className="text-[#6b7686] leading-relaxed text-justify">
                {hostel.about}
              </p>
            </div>
            {/* Room Types */}
            <div className="">
              <h2 className="text-xl font-bold text-[#0f172a] mb-4">
                Room Options & Pricing
              </h2>
              <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                          Room Type
                        </th>
                        <th className="px-6 py-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                          Price per Year
                        </th>
                        <th className="px-6 py-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {hostel.rooms.map((room, idx) => (
                        <tr
                          key={idx}
                          onClick={() => setSelectedRoomIndex(idx)}
                          className={`group cursor-pointer transition-all ${
                            idx === selectedRoomIndex
                              ? "bg-blue-50/80 border-l-4 border-l-[#278cf1]"
                              : "hover:bg-slate-50"
                          }`}>
                          <td className="px-6 py-5 font-medium text-[#0f172a]">
                            {room.type}
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-lg font-bold text-[#0f172a]">
                              ₦{room.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center justify-center min-w-[100px] ${
                                room.availability === "AVAILABLE"
                                  ? "bg-green-50 text-green-700 border border-green-100"
                                  : "bg-red-50 text-red-700 border border-red-100"
                              }`}>
                              {room.availability}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Amenities Grid */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-[#0f172a] mb-6">
                Hostel Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {hostel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#278cf1] group-hover:bg-[#278cf1] group-hover:text-white transition-all">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Policy Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                <MdOutlineAssignmentReturn
                  className="text-[#278cf1]"
                  size={24}
                />
                Refund Policy
              </h2>
              <div className="space-y-4 text-sm text-slate-600">
                <p className="leading-relaxed">
                  We understand that plans can change. Our goal is to ensure you
                  feel secure while booking your home.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-[#0f172a] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#278cf1]"></span>
                      48-Hour Guarantee
                    </h4>
                    <p>
                      If the agent does not respond to your reservation request
                      within 48 hours, a full automatic refund is processed to
                      your original payment method.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-[#0f172a] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#278cf1]"></span>
                      Reservation Credit
                    </h4>
                    <p>
                      The 10% reservation fee is deductible from your total rent
                      once payment is finalized with the agent.
                    </p>
                  </div>
                </div>
                <p className="text-[12px] italic mt-4 border-t pt-4">
                  * All refunds are subject to our standard processing times
                  (3-5 business days). Physical inspection is highly recommended
                  before final payment.
                </p>
              </div>
            </div>
            {/* Reviews Section */}
            <ReviewsSection
              hostelId={hostel.id}
              hostelName={hostel.name}
              initialReviews={[
                {
                  name: "David Olatunji",
                  date: "Oct 12, 2025",
                  rating: 5,
                  comment:
                    "The power supply here is amazing. Best hostel I've stayed in so far at Unilorin.",
                },
                {
                  name: "Blessing Okafor",
                  date: "Aug 15, 2025",
                  rating: 4,
                  comment:
                    "Very close to the gate, though the water can be a bit slow in the mornings.",
                },
              ]}
            />
            {/* Quick Info / Description */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-[#0f172a] mb-4">
                  Hostel Policies
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="text-[#278cf1]" size={14} />
                    {hostel.gender} accommodation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="text-[#278cf1]" size={14} />
                    {hostel.utilitiesIncluded
                      ? "Utilities included in rent"
                      : "Standard utility billing"}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="text-[#278cf1]" size={14} />
                    {hostel.refundableDeposit
                      ? "Refundable caution deposit required"
                      : "No caution deposit required"}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <FaCheck className="text-[#278cf1]" size={14} />
                    {hostel.noHiddenFees
                      ? "No hidden agency or legal fees"
                      : "Standard agency fees apply"}
                  </li>
                </ul>
              </div>
              <div className="bg-[#0f172a] p-6 rounded-2xl shadow-sm text-white">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Not sure about this hostel? Our campus agents are available to
                  give you a virtual tour or answer specific questions.
                </p>
                <button className="w-full py-3 bg-[#278cf1] hover:opacity-90 transition font-bold rounded-xl">
                  Message Agent
                </button>
              </div>
            </div> */}
          </div>

          {/* Sidebar / Price Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="mb-6">
                  <p className="text-[#6b7686] text-sm">Selected Room Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-[#0f172a]">
                      ₦{hostel.rooms[selectedRoomIndex].price.toLocaleString()}
                    </span>
                    <span className="text-[#6b7686] text-sm font-medium">
                      /year
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs font-semibold text-[#278cf1] px-2 py-0.5 bg-blue-50 rounded-full">
                      {hostel.rooms[selectedRoomIndex].type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {hostel.verified &&
                  hostel.agentVerified &&
                  hostel.inspectionCompleted ? (
                    <button
                      onClick={() => setIsReservationModalOpen(true)}
                      className="w-full py-2.5 md:py-3.5 cursor-pointer bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition flex flex-col items-center justify-center leading-tight">
                      <span>Reserve with 10%</span>
                      <span className="text-[11px] opacity-90 font-medium">
                        ₦
                        {(
                          hostel.rooms[selectedRoomIndex].price * 0.1
                        ).toLocaleString()}{" "}
                        commitment fee
                      </span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 md:py-3.5 cursor-not-allowed bg-slate-100 text-slate-400 font-bold rounded-xl border border-slate-200 flex flex-col items-center justify-center leading-tight">
                      <span>Reservation Unavailable</span>
                      <span className="text-[10px] opacity-80 font-medium">
                        Lacks full verification
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full py-3 cursor-pointer bg-[#278cf1] text-white font-bold rounded-xl shadow-lg shadow-[#278cf1]/30 hover:bg-[#1a76d1] transition">
                    Book This Hostel
                  </button>
                  <button
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="w-full py-3 cursor-pointer bg-white text-[#278cf1] border-2 border-[#278cf1] font-bold rounded-xl hover:bg-[#f8fafc] transition">
                    Schedule a Visit
                  </button>
                </div>

                <ScheduleVisitModal
                  hostelName={hostel.name}
                  agentName={hostel.agentName}
                  isOpen={isScheduleModalOpen}
                  onClose={() => setIsScheduleModalOpen(false)}
                />

                <ReservationModal
                  hostelName={hostel.name}
                  agentName={hostel.agentName}
                  amount={hostel.rooms[selectedRoomIndex].price * 0.1}
                  isOpen={isReservationModalOpen}
                  onClose={() => setIsReservationModalOpen(false)}
                />

                <BookingModal
                  hostelName={hostel.name}
                  agentName={hostel.agentName}
                  amount={hostel.rooms[selectedRoomIndex].price}
                  isOpen={isBookingModalOpen}
                  onClose={() => setIsBookingModalOpen(false)}
                />

                <div className="pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <FaShieldHeart
                      className="text-[#278cf1] shrink-0"
                      size={20}
                    />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#0f172a] uppercase tracking-wider">
                        Money-Back Guarantee
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight">
                        Full refund if agent does not respond in 48hrs
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 relative">
                      <Image
                        src="/images/menu.jpg"
                        alt="Agent"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">
                        Campus Home Agent
                      </p>
                      <p className="text-xs text-green-600 font-medium">
                        Active now
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Share Card */}
              {/* <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-sm font-medium text-[#6b7686]">
                  Share this hostel
                </span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition">
                    <FaShieldHalved className="text-slate-400" size={12} />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
