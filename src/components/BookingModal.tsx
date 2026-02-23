"use client";

import React, { useState } from "react";
import {
  IoClose,
  IoWalletOutline,
  IoShieldCheckmarkOutline,
  IoCardOutline,
  IoFlashOutline,
  IoCheckmarkCircle,
  IoReceiptOutline,
} from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface BookingModalProps {
  hostelName: string;
  agentName: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  hostelName,
  agentName,
  amount,
  isOpen,
  onClose,
}) => {
  const { addInquiry, addNotification, addDocument, user } = useAuth();
  const [step, setStep] = useState<"confirm" | "payment" | "success">(
    "confirm",
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    if (!user) {
      toast.error("Please login to proceed with booking");
      return;
    }
    setStep("payment");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!user) {
      toast.error("Session expired. Please login again.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate Payment Gateway call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      addInquiry({
        property: hostelName,
        agent: agentName,
        status: "Booked",
        type: "Booking",
        amount: `₦${amount.toLocaleString()}`,
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: user.phone,
        message: `Fully booked ${hostelName}. Payment confirmed.`,
      });

      addNotification({
        title: "Booking Successful!",
        message: `Your payment for ${hostelName} has been confirmed. You can now access your tenancy documents.`,
        type: "Booking",
      });

      addDocument({
        name: "Payment Receipt",
        type: "Receipt",
        hostelName: hostelName,
        amount: `₦${amount.toLocaleString()}`,
      });

      addDocument({
        name: "Tenancy Agreement",
        type: "Agreement",
        hostelName: hostelName,
      });

      setStep("success");
    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setStep("confirm");
      setPaymentMethod("");
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeAndReset}>
      <div
        className="bg-white w-full max-w-lg h-[75vh] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hostel Booking</h2>
            <p className="text-xs text-gray-500 mt-1">
              Complete your full rent payment for {hostelName}
            </p>
          </div>
          <button
            onClick={closeAndReset}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto scrollbar-hide">
          {step === "confirm" && (
            <div className="space-y-8">
              <div className="bg-[#278cf1]/5 p-6 rounded-2xl border border-[#278cf1]/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#278cf1] shadow-sm">
                    <IoReceiptOutline size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{hostelName}</h4>
                    <p className="text-xs text-gray-500">
                      Full Annual Rent Payment
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#278cf1]/10 pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Total Amount Due
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="text-[#278cf1]" /> Why
                  Pay Through CampusHome?
                </h3>
                <ul className="space-y-3">
                  {[
                    "100% Payment Guarantee: Funds are held until move-in.",
                    "Protection against scammers and fraudulent listings.",
                    "Automated digital receipt and tenancy agreement start.",
                    "Direct priority escalation for any facility issues.",
                  ].map((info, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#278cf1] mt-1.5 shrink-0" />
                      {info}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleConfirmOrder}
                className="w-full py-4 cursor-pointer bg-[#278cf1] text-white font-bold rounded-2xl shadow-lg shadow-[#278cf1]/20 hover:bg-[#1a76d1] transition-all flex items-center justify-center gap-2">
                Proceed to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900">
                  Select Payment Method
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "card",
                      name: "Credit/Debit Card",
                      icon: <IoCardOutline size={20} />,
                    },
                    {
                      id: "transfer",
                      name: "Bank Transfer",
                      icon: <IoWalletOutline size={20} />,
                    },
                    {
                      id: "ussd",
                      name: "USSD Code",
                      icon: <IoFlashOutline size={20} />,
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? "border-[#278cf1] bg-blue-50/30"
                          : "border-gray-100 hover:border-gray-200"
                      }`}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            paymentMethod === method.id
                              ? "bg-[#278cf1] text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                          {method.icon}
                        </div>
                        <span
                          className={`font-bold text-sm ${
                            paymentMethod === method.id
                              ? "text-[#278cf1]"
                              : "text-gray-700"
                          }`}>
                          {method.name}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                      />
                      {paymentMethod === method.id && (
                        <div className="w-5 h-5 rounded-full bg-[#278cf1] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-500 leading-relaxed text-center">
                  Payment secured by CampusHome Pay. Funds are held in escrow
                  for your security.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep("confirm")}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all cursor-pointer ">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 py-4 bg-[#278cf1] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#1a76d1] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    `Pay ₦${amount.toLocaleString()}`
                  )}
                </button>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-10 space-y-6">
              <div className="flex justify-center">
                <IoCheckmarkCircle
                  className="text-emerald-500 animate-bounce"
                  size={100}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Booking Successful!
                </h3>
                <p className="text-sm text-gray-500 px-6">
                  You have successfully paid the rent for{" "}
                  <strong>{hostelName}</strong>.
                </p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center gap-3">
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                  Next Steps
                </p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  The agent <strong>{agentName}</strong> has been notified. They
                  will contact you to arrange for key pickup and move-in
                  documentation. Your payment is held securely by CampusHome.
                </p>
              </div>

              <button
                onClick={closeAndReset}
                className="w-full py-4 cursor-pointer bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all">
                View in My Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
