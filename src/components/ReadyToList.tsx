import React from "react";
import Container from "./Container";
import { IoTime, IoTrendingUpSharp } from "react-icons/io5";
import Link from "next/link";

const ReadyToList = () => {
  return (
    <Container className="mt-10">
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-linear-to-tr from-[#0d141c] via-[#0c141c] to-[#112840] py-10 px-6 sm:px-10 rounded-3xl lg:rounded-[48px] gap-10">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight">
            Ready to list your student property?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 my-6 max-w-lg mx-auto lg:mx-0">
            Join 1,000+ landlords and agents who are filling their rooms faster
            with CampusHome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <Link
              href="/register/agent"
              className="w-full sm:w-auto text-center text-white bg-[#278cf1] text-sm font-bold px-8 py-3.5 rounded-xl cursor-pointer hover:bg-[#1e74cc] transition-all shadow-lg shadow-blue-500/20">
              Become an Agent
            </Link>
            <button className="w-full sm:w-auto bg-[#252b33] text-white border border-gray-700 text-sm font-bold px-8 py-3.5 rounded-xl cursor-pointer hover:bg-[#2d343d] transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1c3855] flex items-center justify-center text-[#278cf1] shrink-0">
              <IoTrendingUpSharp size={24} />
            </div>
            <div>
              <p className="text-white text-base font-bold">1,000+ Views</p>
              <p className="text-gray-400 text-xs text-nowrap">
                Monthly student traffic
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1c3855] flex items-center justify-center text-[#278cf1] shrink-0">
              <IoTime size={24} />
            </div>
            <div>
              <p className="text-white text-base font-bold">48 Hours</p>
              <p className="text-gray-400 text-xs text-nowrap">
                Average Booking Time
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReadyToList;
