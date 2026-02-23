import React from "react";
import Logo from "./Logo";
import Container from "./Container";
import Link from "next/link";

const Footer = () => {
  return (
    <Container className="mt-24 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Logo />
          <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-xs">
            Nigeria&apos;s #1 student accommodation platform. We make finding
            and renting student hostels simple, secure, and stress-free.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-base text-[#0d141c] font-bold mb-4">
            Quick Links
          </p>
          <ul className="text-gray-500 flex flex-col gap-2.5 text-sm font-medium">
            <li>
              <Link
                href="/hostels"
                className="hover:text-[#278cf1] transition-colors">
                Search Hostels
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#278cf1] transition-colors">
                How it Works
              </Link>
            </li>
            <li>
              <Link
                href="/register/agent"
                className="hover:text-[#278cf1] transition-colors">
                Agent Portal
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-[#278cf1] transition-colors">
                Pricing Plan
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-base text-[#0d141c] font-bold mb-4">
            Supports
          </p>
          <ul className="text-gray-500 flex flex-col gap-2.5 text-sm font-medium">
            <li>
              <Link
                href="/help"
                className="hover:text-[#278cf1] transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/safety"
                className="hover:text-[#278cf1] transition-colors">
                Safety Tips
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-[#278cf1] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[#278cf1] transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-base text-[#0d141c] font-bold mb-4">
            Stay Updated
          </p>
          <div className="w-full">
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to our newsletter for new hostel alerts.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-100 px-4 py-3 rounded-xl outline-none text-gray-700 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button className="bg-[#278cf1] text-white font-bold rounded-xl px-4 py-3 shadow-lg shadow-blue-500/20 cursor-pointer hover:bg-[#1e74cc] transition-all text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-gray-100 text-[10px] sm:text-[11px] font-bold text-gray-400 gap-6">
        <p className="tracking-widest">
          &copy; 2026 CAMPUSHOME. ALL RIGHTS RESERVED.
        </p>
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 tracking-widest">
          <li>
            <Link href="#" className="hover:text-[#278cf1] transition-colors">
              FACEBOOK
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-[#278cf1] transition-colors">
              TWITTER
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-[#278cf1] transition-colors">
              INSTAGRAM
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-[#278cf1] transition-colors">
              LINKEDIN
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Footer;
