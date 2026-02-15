import React from "react";
import Container from "./Container";
import { IoTime, IoTrendingUpSharp } from "react-icons/io5";

const ReadyToList = () => {
  return (
    <Container className="mt-10">
      <div className="flex justify-between items-center bg-linear-to-tr from-[#0d141c] via-[#0c141c] to-[#112840] py-10 px-8 rounded-4xl">
        <div>
          <p className="text-[30px] font-semibold text-white">
            Ready to list your student property?
          </p>
          <p className="text-sm text-[#8896aa] my-4">
            Join 1000+ landlords and agents who are filling their rooms faster
            with CampusHome.
          </p>
          <div className="flex gap-3 items-center">
            <button className="text-white border-[#278cf1] bg-[#278cf1] text-sm px-4 py-2 rounded-md cursor-pointer hover:opacity-60 duration-200">
              Become an Agent
            </button>
            <button className="bg-[#252b33] text-white border border-[#373c42] text-sm px-5 py-2 rounded-md cursor-pointer hover:opacity-60 duration-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-[#252b33] border border-[#373c42] rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <p className="bg-[#1c3855] inline-flex p-2 rounded-full">
              <IoTrendingUpSharp size={24} className="text-[#278cf1]" />
            </p>

            <div>
              <p className="text-white text-sm font-semibold">1000+ Views</p>
              <p className="text-gray-400 text-[12px]">
                Monthly students traffic
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <p className="bg-[#1c3855] inline-flex p-2 rounded-full">
              <IoTime size={24} className="text-[#278cf1]" />
            </p>

            <div>
              <p className="text-white text-sm font-semibold">48hrs</p>
              <p className="text-gray-400 text-[12px]">Average Booking Time</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReadyToList;
