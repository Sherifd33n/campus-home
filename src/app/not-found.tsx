"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IoHomeOutline,
  IoSearchOutline,
} from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-linear-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-linear-to-tr from-purple-400/10 to-pink-500/10 rounded-full blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Visuals */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 lg:order-1">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-blue-600 via-indigo-600 to-purple-700 drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
              404
            </motion.div>

            {/* Floating icons for bit of fun */}
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-0 right-10 p-4 bg-white rounded-2xl shadow-xl shadow-blue-500/10 text-blue-500 text-3xl hidden sm:block">
              <IoSearchOutline />
            </motion.div>
            <motion.div
              animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 -left-5 p-4 bg-white rounded-2xl shadow-xl shadow-indigo-500/10 text-indigo-500 text-3xl hidden sm:block">
              <IoHomeOutline />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center lg:text-left order-1 lg:order-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Oops! This page <br />
            <span className="text-blue-600 italic">moved out.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            The hostel you&apos;re looking for might have a new address, or the
            link is broken. No worries, we&apos;ll help you find a better one!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                <IoHomeOutline className="text-xl" />
                Return to Safety
              </motion.button>
            </Link>

            <Link href="/states">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                <IoSearchOutline className="text-xl" />
                Browse Hostels
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-400 font-medium">
            <div className="w-8 h-1px bg-slate-200" />
            <span className="uppercase tracking-[0.2em]">Campus Home</span>
            <div className="w-8 h-1px bg-slate-200" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#2563eb 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
};

export default NotFound;
