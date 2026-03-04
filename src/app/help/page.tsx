import React from "react";
import Container from "@/components/Container";
import {
  IoSearchOutline,
  IoChatbubblesOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";

export default function HelpPage() {
  const faqs = [
    {
      q: "Is it really free for students?",
      a: "Yes! Campus Home is 100% free for students to search, contact agents, and find their perfect stay. Our revenue comes from agent subscriptions and premium listing services.",
    },
    {
      q: "How do I know if a listing is verified?",
      a: "Look for the green 'Verified' badge on the property card. This means a Campus Home representative has physically visited the property and confirmed its existence and details.",
    },
    {
      q: "What should I do if an agent asks for money before viewing?",
      a: "NEVER pay for viewing fees or down payments before seeing the property in person. Please report any such agent via the 'Report' button on the listing page.",
    },
    {
      q: "How do I list my property as an agent?",
      a: "Click on 'Agent Portal' in the footer, register for an account, and follow the simple step-by-step listing process shown in your dashboard.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Help Hero */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <Container className="px-6 text-center">
          <h1 className="text-4xl font-bold text-[#131b2d] mb-4">
            How can we help you?
          </h1>
          <p className="text-gray-500 mb-10">
            Search our knowledge base or browse frequently asked questions.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <IoSearchOutline className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full bg-white border border-gray-200 outline-none rounded-3xl px-14 py-5 shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700"
            />
          </div>
        </Container>
      </section>

      {/* FAQ & Contact */}
      <section className="py-24">
        <Container className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#131b2d] mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="pb-8 border-b border-gray-100 last:border-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-blue-600 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">Still need help?</h3>
                <p className="text-blue-100 text-sm mb-8">
                  Our support team is available 24/7 to assist you with any
                  housing issues.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:support@campushome.ng"
                    className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-2xl transition-all">
                    <IoMailOutline className="text-xl" />
                    <span className="text-sm font-bold">
                      support@campushome.ng
                    </span>
                  </a>
                  <div className="flex items-center gap-3 p-3">
                    <IoCallOutline className="text-xl" />
                    <span className="text-sm font-bold">
                      +234 800 CAMPUS (226)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-gray-100 rounded-3xl">
                <IoChatbubblesOutline className="text-4xl text-blue-500 mb-4" />
                <h4 className="font-bold text-gray-800 mb-2">Live Chat</h4>
                <p className="text-sm text-gray-500 mb-6">
                  Talk to a real person right now.
                </p>
                <button className="w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100">
                  Start Chatting
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
