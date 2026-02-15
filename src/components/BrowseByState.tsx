"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { states } from "@/data/state";
import Container from "./Container";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

export default function StateSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="py-12 bg-gray-50">
      <Container className="px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">Browse by States</h2>

          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition">
              <FaChevronLeft size={14} />
            </button>

            <button
              ref={nextRef}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          onBeforeInit={(swiper: SwiperType) => {
            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation!.prevEl = prevRef.current;
              swiper.params.navigation!.nextEl = nextRef.current;
            }
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
              View All States →
            </Link>
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}
