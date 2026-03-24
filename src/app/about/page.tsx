"use client";

import React from "react";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import {
  IoCheckmarkCircle,
  IoPeopleOutline,
  IoHomeOutline,
  IoSearchOutline,
} from "react-icons/io5";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>

        <Container className="px-6 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Redefining Student <br /> Living in Nigeria
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Campus Home is Nigeria&apos;s #1 student accommodation platform. We
            merge technology with real estate to provide a seamless, secure, and
            stress-free search for your next home.
          </motion.p>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <Container className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#131b2d] mb-6">
                Our Mission
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Every year, millions of Nigerian students struggle to find
                decent housing. The process is often opaque, risky, and
                physically draining. We exist to flip the script.
              </p>
              <div className="space-y-4">
                {[
                  "Verified listings to prevent fraud",
                  "Direct connection with trusted agents",
                  "Comprehensive property details & reviews",
                  "Seamless online booking & payment",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <IoCheckmarkCircle className="text-blue-500 text-2xl" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 relative">
              <div className="aspect-video bg-blue-100 rounded-2xl flex items-center justify-center">
                <IoHomeOutline className="text-blue-500 text-7xl opacity-20" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-3xl font-bold text-blue-600">50,000+</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                  Students Helped
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50">
        <Container className="px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#131b2d]">How It Works</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Three simple steps to your new room.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoSearchOutline />,
                title: "1. Search",
                desc: "Browse through hundreds of verified hostels near your institution.",
              },
              {
                icon: <IoPeopleOutline />,
                title: "2. Contact",
                desc: "Message host or schedule a physical visit to the property.",
              },
              {
                icon: <IoHomeOutline />,
                title: "3. Move In",
                desc: "Reserve your room and get ready for a great academic session.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#131b2d] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
