"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { useAuth } from "@/context/AuthContext";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoMail,
  IoPerson,
  IoPhonePortrait,
  IoLockClosed,
  IoBusiness,
  IoEye,
  IoEyeOff,
  IoAlertCircle,
} from "react-icons/io5";
import Link from "next/link";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
} from "@/lib/validators";

const AgentRegistrationPage = () => {
  const router = useRouter();
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agencyName: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateRegister = (): boolean => {
    const errs: Record<string, string> = {};
    const nameErr = validateName(registerData.fullName, "Full name");
    if (nameErr) errs.fullName = nameErr;
    const emailErr = validateEmail(registerData.email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validatePhone(registerData.phone);
    if (phoneErr) errs.phone = phoneErr;
    const passErr = validatePassword(registerData.password);
    if (passErr) errs.password = passErr;
    const confirmErr = validateConfirmPassword(
      registerData.password,
      registerData.confirmPassword,
    );
    if (confirmErr) errs.confirmPassword = confirmErr;
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateLogin = (): boolean => {
    const errs: Record<string, string> = {};
    const emailErr = validateEmail(loginData.email);
    if (emailErr) errs.email = emailErr;
    if (!loginData.password) errs.password = "Password is required";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      if (!validateLogin()) return;
      setLoading(true);
      try {
        await login(loginData.email, loginData.password);
        setSuccess(true);
        setTimeout(() => router.push("/agent/dashboard"), 2000);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Try again.",
        );
      } finally {
        setLoading(false);
      }
    } else {
      if (!validateRegister()) return;
      setLoading(true);
      try {
        await signup(
          {
            name: registerData.fullName,
            email: registerData.email,
            phone: registerData.phone,
          },
          "agent",
          registerData.password,
        );
        setSuccess(true);
        setTimeout(() => router.push("/agent/dashboard"), 2000);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Try again.",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setError("");
    setFieldErrors({});
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <IoCheckmarkCircle className="text-[#278cf1] text-8xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Login Successful!" : "Registration Successful!"}
          </h1>
          <p className="text-gray-600 mb-6">
            Redirecting you to the agent dashboard...
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

  const inputClass = (field: string) =>
    `w-full pl-11 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#278cf1]/20 focus:border-[#278cf1] transition-all text-sm ${
      fieldErrors[field] ? "border-red-300 bg-red-50/30" : "border-gray-200"
    }`;

  const FieldError = ({ field }: { field: string }) =>
    fieldErrors[field] ? (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <IoAlertCircle className="text-sm shrink-0" />
        {fieldErrors[field]}
      </p>
    ) : null;

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
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? "Welcome Back" : "Become an Agent"}
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                {isLogin
                  ? "Sign in to manage your listings and connect with thousands of students."
                  : "Join Nigeria's fastest growing student housing network. Reach thousands of students."}
              </p>
              <div className="space-y-4">
                {(isLogin
                  ? [
                      "Secure Access to Your Portal",
                      "Manage Your Active Listings",
                      "Track Student Enquiries",
                    ]
                  : [
                      "Create Your Professional Account",
                      "List and Manage Your Properties",
                      "Connect with Verified Students",
                    ]
                ).map((item, i) => (
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
              {isLogin ? "Agent Login" : "Create Agent Account"}
            </h1>

            {/* Error Banner */}
            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <IoAlertCircle className="text-red-500 mt-0.5 shrink-0 text-base" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {isLogin ? (
                /* ── LOGIN FORM ── */
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className={inputClass("email")}
                        placeholder="email@example.com"
                      />
                    </div>
                    <FieldError field="email" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className={`${inputClass("password")} pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                    <FieldError field="password" />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs font-bold text-[#278cf1] hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                </>
              ) : (
                /* ── REGISTER FORM ── */
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={registerData.fullName}
                        onChange={handleRegisterChange}
                        className={inputClass("fullName")}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <FieldError field="fullName" />
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
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        className={inputClass("email")}
                        placeholder="email@example.com"
                      />
                    </div>
                    <FieldError field="email" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <IoPhonePortrait className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={registerData.phone}
                          onChange={handleRegisterChange}
                          className={inputClass("phone")}
                          placeholder="08012345678"
                        />
                      </div>
                      <FieldError field="phone" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Agency Name
                      </label>
                      <div className="relative">
                        <IoBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="agencyName"
                          value={registerData.agencyName}
                          onChange={handleRegisterChange}
                          className={inputClass("agencyName")}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className={`${inputClass("password")} pr-12`}
                        placeholder="At least 8 chars + 1 number"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                    <FieldError field="password" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className={`${inputClass("confirmPassword")} pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                      </button>
                    </div>
                    <FieldError field="confirmPassword" />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#278cf1] text-white py-4 rounded-xl font-bold hover:bg-[#1e72c5] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Processing...
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-[#278cf1] font-bold hover:underline cursor-pointer">
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>

              {!isLogin && (
                <p className="text-center text-xs text-gray-400 mt-4">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgentRegistrationPage;
