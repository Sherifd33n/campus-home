import React from "react";
import Container from "@/components/Container";
import {
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      badge: "Free",
      desc: "Perfect for independent property owners.",
      price: "0",
      features: [
        "Up to 2 property listings",
        "Basic search visibility",
        "In-app messaging",
        "5 images per listing",
        "Basic analytics",
      ],
      button: "Get Started",
      highlight: false,
    },
    {
      name: "Professional",
      badge: "Popular",
      desc: "For serious agents and property managers.",
      price: "15,000",
      features: [
        "Up to 15 property listings",
        "Priority search visibility",
        "Featured property badge",
        "10 images per listing",
        "Advanced leads analytics",
        "Verified agent badge",
        "WhatsApp integration",
      ],
      button: "Billed Monthly",
      highlight: true,
    },
    {
      name: "Agency",
      badge: "Enterprise",
      desc: "Custom solutions for large agencies.",
      price: "45,000",
      features: [
        "Unlimited property listings",
        "Top-tier search placement",
        "Promoted banner ads",
        "Unlimited images & video",
        "API access & CRM sync",
        "Dedicated account manager",
        "Custom branding",
      ],
      button: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-24">
      <Container className="px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-[#131b2d] mb-6">
            Simple, Transparent <br />{" "}
            <span className="text-blue-600">Pricing for Agents</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Choose the plan that fits your business needs. All accounts for
            students remain 100% free, forever.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-10 rounded-3xl border ${plan.highlight ? "border-blue-500 shadow-2xl shadow-blue-500/10" : "border-gray-100 shadow-sm"} flex flex-col`}>
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {plan.name}
                </p>
                <h3 className="text-2xl font-bold text-[#131b2d] mb-4">
                  {plan.badge}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#131b2d]">
                  ₦{plan.price}
                </span>
                <span className="text-gray-400 font-medium">/month</span>
              </div>

              <div className="space-y-4 mb-12 grow">
                {plan.features.map((feature, dx) => (
                  <div key={dx} className="flex items-start gap-3">
                    <IoCheckmarkCircle className="text-blue-500 text-xl mt-0.5" />
                    <span className="text-gray-600 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
                {plan.button}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-gray-50 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-[#131b2d] mb-4">
              Enterprise? Need something custom?
            </h2>
            <p className="text-gray-500">
              We offer custom packages for large-scale property management firms
              and universities looking to list their internal hostels.
            </p>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-[#131b2d] text-white font-bold rounded-2xl hover:bg-black transition-all">
            Contact Agency Support
          </button>
        </div>
      </Container>
    </div>
  );
}
