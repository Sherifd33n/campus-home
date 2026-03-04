import React from "react";
import Container from "@/components/Container";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using Campus Home, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.",
    },
    {
      title: "2. Platform Role",
      content:
        "Campus Home is a connector platform. While we verify listings to our best ability, any rental agreement made is strictly between the student and the agent/landlord. We are not responsible for any disputes or financial losses.",
    },
    {
      title: "3. User Conduct",
      content:
        "You agree to provide accurate information. Agents must not list duplicate or non-existent properties. Students must not provide false identification during the booking process.",
    },
    {
      title: "4. Fees and Payments",
      content:
        "Agents agree to pay the subscription fee for premium visibility. Students do not pay registration fees to Campus Home. All transaction fees for rental payments are disclosed upfront.",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <Container className="px-6 max-w-4xl">
        <h1 className="text-4xl font-black text-[#131b2d] mb-4">
          Terms of Service
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
