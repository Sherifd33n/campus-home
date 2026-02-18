"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoMail,
  IoPerson,
  IoLockClosed,
  IoSchool,
} from "react-icons/io5";
import Link from "next/link";
import { institutions } from "@/data/listing";

const StudentSignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate dummy registration API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <IoCheckmarkCircle className="text-[#278cf1] text-8xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to Campus Home. Redirecting you to the home page...
          </p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-[#278cf1] rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-[#278cf1] rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-[#278cf1] rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-5 pb-12 md:py-20 md:pt-10">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-[#278cf1] transition-colors mb-8 group">
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">
          <div className="md:w-1/2 p-8 text-white flex flex-col justify-center relative overflow-hidden group">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('/images/menu.jpg')" }}
            />
            <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]" />

            <div className="relative z-10 font-roboto">
              <h2 className="text-3xl font-bold mb-4">
                Join Campus Home
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                The most convenient way to find your perfect student accommodation in Nigeria.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-blue-50/90">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-xs font-bold border border-white/30">
                    1
                  </span>
                  Discover Verified Hostels
                </div>
                <div className="flex items-center text-sm text-blue-50/90">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-xs font-bold border border-white/30">
                    2
                  </span>
                  Connect Directly with Agents
                </div>
                <div className="flex items-center text-sm text-blue-50/90">
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-xs font-bold border border-white/30">
                    3
                  </span>
                  Book Securely Online
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex-1 p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Student Registration
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  University / Institution
                </label>
                <div className="relative">
                  <IoSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="university"
                    required
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm appearance-none"
                  >
                    <option value="" disabled>Select your university</option>
                    {institutions.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#278cf1] text-white py-4 rounded-xl font-bold hover:bg-[#1e72c5] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Processing...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#278cf1] font-bold hover:underline cursor-pointer">
                  Sign In
                </Link>
              </p>

              <p className="text-center text-xs text-gray-400 mt-4">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StudentSignUpPage;
