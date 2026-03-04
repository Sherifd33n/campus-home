import React from "react";
import Container from "@/components/Container";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Data We Collect",
      content:
        "We collect your name, email, phone number, and university details to facilitate housing connections. For agents, we also collect professional verification documents.",
    },
    {
      title: "2. How We Use Information",
      content:
        "Your data is used to notify you of inquiries, provide booking receipts, and verify account authenticity. We do not sell your personal data to third parties.",
    },
    {
      title: "3. Cookies",
      content:
        "We use cookies to keep you logged in and remember your housing favorites. You can disable these in your browser settings, though some functionality may be limited.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement standard encryption and localStorage security practices to protect your hashed passwords and personal communications.",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <Container className="px-6 max-w-4xl">
        <h1 className="text-4xl font-black text-[#131b2d] mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-16">
          Last updated: February 24, 2026
        </p>

        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-gray-50 rounded-3xl border border-gray-100 italic text-gray-400 text-sm">
          Note: This is a placeholder document for the Campus Home platform. For
          legal validity, it should be reviewed by a certified legal
          professional in Nigeria.
        </div>
      </Container>
    </div>
  );
}
