"use client";

import React, { useState } from "react";
import {
  IoClose,
  IoWalletOutline,
  IoShieldCheckmarkOutline,
  IoCardOutline,
  IoFlashOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ReservationModalProps {
  hostelName: string;
  agentName: string;
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  hostelName,
  agentName,
  amount,
  isOpen,
  onClose,
}) => {
  const { addInquiry, user } = useAuth();
  const [step, setStep] = useState<"confirm" | "payment" | "success">(
    "confirm",
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    if (!user) {
      toast.error("Please login to proceed with reservation");
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
        status: "Reserved",
        type: "Reservation",
        amount: `₦${amount.toLocaleString()}`,
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: user.phone,
        message: `Reserved ${hostelName} with 10% commitment fee.`,
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
        className="bg-white w-full max-w-lg h-[70vh] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Hostel Reservation
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Secure your room with a 10% commitment
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
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#278cf1] shadow-sm">
                    <IoWalletOutline size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{hostelName}</h4>
                    <p className="text-xs text-gray-500">
                      Commitment Fee (10%)
                    </p>
                  </div>
                </div>
                <div className="border-t border-blue-100/50 pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Total Due Today
                  </span>
                  <span className="text-2xl font-bold text-gray-900 underline decoration-[#278cf1]">
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <IoShieldCheckmarkOutline className="text-emerald-500" />{" "}
                  Secure Your Spot
                </h3>
                <ul className="space-y-3">
                  {[
                    "Guarantees room availability for the next academic session.",
                    "Deductible from your total annual rent.",
                    "48-hour money-back guarantee if agent doesn't respond.",
                    "Facilitates direct priority contact with the verified agent.",
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
                className="w-full py-3 cursor-pointer bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                Proceed to Secure Payment
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
                  Payment secured by CampusHome Pay. We do not store your credit
                  card details.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep("confirm")}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 py-4 bg-[#278cf1] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#1a76d1] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
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
                  Reservation Confirmed!
                </h3>
                <p className="text-sm text-gray-500 px-6">
                  Your commitment fee for <strong>{hostelName}</strong> has been
                  received successfully.
                </p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center gap-3">
                <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                  Next Steps
                </p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  The agent <strong>{agentName}</strong> will contact you via
                  your registered phone number within 24 hours to confirm your
                  move-in date and complete the remaining rent payment.
                </p>
              </div>

              <button
                onClick={closeAndReset}
                className="w-full py-3 cursor-pointer bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all">
                View in My Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
