"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { states } from "@/data/state";
import Container from "./Container";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

export default function StateSlider() {
  return (
    <div className="py-12 bg-gray-50">
      <Container className="px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Browse by States
          </h2>

          <div className="flex justify-center sm:justify-end gap-3">
            <button className="browse-prev w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition shadow-sm active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
              <FaChevronLeft size={14} className="text-gray-600" />
            </button>

            <button className="browse-next w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition shadow-sm active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed">
              <FaChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".browse-prev",
            nextEl: ".browse-next",
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}>
          {states.slice(0, 4).map((state) => (
            <SwiperSlide key={state.id}>
              <Link
                href={`/states/${state.id}`}
                className="relative h-65 rounded-2xl overflow-hidden group block">
                <Image
                  src={state.image}
                  alt={state.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {state.name}
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <Link
              href="/states"
              className="relative h-65 rounded-2xl flex items-center justify-center bg-[#278cf1] text-white text-xl font-semibold hover:bg-[#1f74cc] transition">
              View All States <FaArrowRight className="ml-3" />
            </Link>
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}
