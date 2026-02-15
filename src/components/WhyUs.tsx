import React from "react";
import Container from "./Container";
import { BsShieldFillCheck } from "react-icons/bs";
import { TbLocationFilled } from "react-icons/tb";
import { PiPiggyBankFill } from "react-icons/pi";

const WhyUs = () => {
  return (
    <div className="bg-[#f6f7f8] py-16">
      <Container className="text-center">
        <p className="text-[#0d141c] text-2xl font-bold">
          Why students love CampusHome
        </p>
        <p className="text-[#78869a] text-base mt-2 mx-[25%]">
          We have built the most trusted platforms for students housing with
          tools designed for your safety and budget.{" "}
        </p>

        <div className="mt-10 flex items-center justify-between">
          <div className="w-[350px] rounded-xl bg-white p-7">
            <p className="bg-[#eff6ff] rounded-md p-3.5 inline-flex">
              <BsShieldFillCheck
                size={26}
                className="text-center mx-auto text-[#278cf1]"
              />
            </p>

            <p className="my-3 text-xl font-bold">Verified Listings</p>

            <p className="text-sm text-[#8c98a9]">
              Every properties is physically inspected and verified by our team
              to prevent scams and ensure quality.
            </p>
          </div>

          <div className="w-[350px] rounded-xl bg-white p-7">
            <p className="bg-[#fff7ed] rounded-md p-3.5 inline-flex">
              <TbLocationFilled
                size={26}
                className="text-center mx-auto text-[#f97316]"
              />
            </p>

            <p className="my-3 text-xl font-bold">Proximity to Campus</p>

            <p className="text-sm text-[#8c98a9]">
              Save time and transport costs. We prioritize hostels that are
              withing 5-30mins walk from your school.
            </p>
          </div>

          <div className="w-[350px] rounded-xl bg-white p-7">
            <p className="bg-[#f0fdf4] rounded-md p-3.5 inline-flex">
              <PiPiggyBankFill
                size={26}
                className="text-center mx-auto text-[#22c55e]"
              />
            </p>

            <p className="my-3 text-xl font-bold">Student Pricing</p>

            <p className="text-sm text-[#8c98a9]">
              Transparent pricing with no hidden agent fees. We generate the
              best specifically for students budgets.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhyUs;
