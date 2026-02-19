"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { useAuth } from "@/context/AuthContext";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoMail,
  IoLockClosed,
  IoEye,
  IoEyeOff,
  IoAlertCircle,
} from "react-icons/io5";
import Link from "next/link";
import { validateEmail } from "@/lib/validators";

const StudentLoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors on change
    setError("");
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side pre-checks before hitting AuthContext
    const emailErr = validateEmail(formData.email);
    if (emailErr) {
      setFieldErrors((prev) => ({ ...prev, email: emailErr }));
      return;
    }
    if (!formData.password) {
      setFieldErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <IoCheckmarkCircle className="text-[#278cf1] text-8xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Login Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome back! Redirecting you to the home page...
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
          {/* Left Panel */}
          <div className="md:w-1/2 p-8 text-white flex flex-col justify-center relative overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: "url('/images/menu.jpg')" }}
            />
            <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Sign in to access your saved hostels, manage your applications,
                and track your inquiries.
              </p>
              <div className="space-y-4">
                {[
                  "Manage Your Favorites",
                  "Track Your Applications",
                  "Exclusive Student Deals",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm text-blue-50/90">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-4 text-xs font-bold border border-white/30">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:flex-1 p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Student Sign In
            </h1>

            {/* Error Banner */}
            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <IoAlertCircle className="text-red-500 mt-0.5 shrink-0 text-base" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm ${
                      fieldErrors.email
                        ? "border-red-300 bg-red-50/30"
                        : "border-gray-200"
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <IoAlertCircle className="text-sm shrink-0" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm ${
                      fieldErrors.password
                        ? "border-red-300 bg-red-50/30"
                        : "border-gray-200"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }>
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <IoAlertCircle className="text-sm shrink-0" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs font-bold text-[#278cf1] hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#278cf1] text-white py-4 rounded-xl font-bold hover:bg-[#1e72c5] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#278cf1] font-bold hover:underline cursor-pointer">
                  Sign Up
                </Link>
              </p>

              <p className="text-center text-xs text-gray-400 mt-4">
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StudentLoginPage;
