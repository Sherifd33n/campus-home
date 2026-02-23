import React from "react";
import Container from "./Container";
import { BsShieldFillCheck } from "react-icons/bs";
import { TbLocationFilled } from "react-icons/tb";
import { PiPiggyBankFill } from "react-icons/pi";

const WhyUs = () => {
  return (
    <div className="bg-[#f6f7f8] py-16">
      <Container className="text-center">
        <h2 className="text-[#0d141c] text-2xl md:text-3xl font-bold">
          Why students love CampusHome
        </h2>
        <p className="text-[#78869a] text-sm md:text-base mt-2 mx-auto max-w-2xl px-4">
          We have built the most trusted platform for student housing with tools
          designed for your safety and budget.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-0">
          <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#278cf1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
              <BsShieldFillCheck size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Verified Listings
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Every property is physically inspected and verified by our team to
              prevent scams and ensure quality.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#f97316] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
              <TbLocationFilled size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Nearby Campus
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Save time and transport costs. We prioritize hostels that are
              within 5-30mins walk from your school.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm hover:shadow-md transition-shadow group md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-[#22c55e] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
              <PiPiggyBankFill size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Student Pricing
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Transparent pricing with no hidden agent fees. We negotiate the
              best specifically for students&apos; budgets.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyUs;
