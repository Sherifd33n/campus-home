import React from "react";
import Logo from "./Logo";
import Container from "./Container";
import Link from "next/link";

const Footer = () => {
  return (
    <Container className="mt-24">
      <div className="grid grid-cols-4">
        <div className="">
          <Logo />
          <p className="text-gray-600 text-sm mt-2">
            Nigeria&apos;s #1 students accommodation platform. We make finding
            and renting student hostels simple, secure and stress-free.
          </p>
        </div>

        <div className="lg:ml-10">
          <p className="text-base text-[#0d141c] font-bold">Quick Links</p>
          <ul className="mt-3 text-gray-600 flex flex-col gap-1.5 duration-200 transition-all">
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Search Hostels
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                How it Works
              </Link>
            </li>

            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Agent Portal
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Pricing Plan
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-base text-[#0d141c] font-bold">Supports</p>
          <ul className="mt-3 text-gray-600 flex flex-col gap-1.5 duration-200 transition-all">
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Safety Tips
              </Link>
            </li>

            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="" className="hover:text-[#0d141c]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-base text-[#0d141c] font-bold">Stay Updated</p>
          <div className="mt-3">
            <p className="text-gray-600">
              Subscribe to our newsletter for new hostel alerts.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-[#dee3e9] px-2 py-2 rounded-md mt-1 outline-none text-gray-600 text-sm"
              />
              <button className="bg-[#278cf1] text-white rounded-md px-2 py-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-20 text-[12px] text-gray-600 py-4 border-t border-gray-300">
        <p>&copy; 2026 CAMPUSHOME. ALL RIGHTS RESERVED.</p>
        <div>
          <ul className="flex gap-5 duration-200 transition-all">
            <li>
              {" "}
              <Link href="" className="hover:text-gray-800">FACEBOOK</Link>
            </li>

            <li>
              {" "}
              <Link href="" className="hover:text-gray-800">TWITTER</Link>
            </li>

            <li>
              {" "}
              <Link href="" className="hover:text-gray-800">INSTAGRAM</Link>
            </li>

            <li>
              {" "}
              <Link href="" className="hover:text-gray-800">LINKEDIN</Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
