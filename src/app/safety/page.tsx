import React from "react";
import Container from "@/components/Container";
import {
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoLockClosedOutline,
  IoWarningOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";

export default function SafetyPage() {
  const tips = [
    {
      icon: <IoEyeOutline />,
      title: "Physically inspect first",
      desc: "Never pay for a hostel based only on photos. Always schedule a visit to verify the condition, facilities, and surrounding area.",
    },
    {
      icon: <IoLockClosedOutline />,
      title: "Payment safety",
      desc: "Only pay when you have a signed agreement and the keys (or confirmed digital booking). Prefer bank transfers for a paper trail.",
    },
    {
      icon: <IoWarningOutline />,
      title: "Trust your gut",
      desc: "If a deal seems too good to be true (e.g. a ₦500k room for ₦100k), it probably is. Reach out to support if you're unsure.",
    },
    {
      icon: <IoShieldCheckmarkOutline />,
      title: "Look for the badge",
      desc: "Prioritize hostels with our 'Verified' badge. These have been physically audited by the Campus Home team.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <Container className="px-6">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-2xl mb-6">
            <IoShieldCheckmarkOutline className="text-3xl" />
          </div>
          <h1 className="text-4xl font-bold text-[#131b2d] mb-4">
            Your Safety is Our Top Priority
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Finding a home in a new city can be daunting. We&apos;ve built
            Campus Home to be the safest way to find student accommodation in
            Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl shrink-0 flex items-center justify-center text-3xl">
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#131b2d] text-white p-12 rounded-[40px] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6 bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold w-fit">
              <IoAlertCircleOutline className="text-lg" />
              SCAM ALERT
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Report Suspicious Activity
            </h2>
            <p className="text-gray-400 mb-10">
              Have you encountered a suspicious agent or a misleading listing?
              Reporting it immediately helps keep the whole community safe.
            </p>
            <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all">
              Report an Issue
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <IoShieldCheckmarkOutline className="text-[300px]" />
          </div>
        </div>
      </Container>
    </div>
  );
}
