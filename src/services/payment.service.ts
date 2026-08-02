import { Payment, Invoice, Receipt, Refund } from "@/types";

const mockPayments: Payment[] = [
  {
    id: "pay-1",
    bookingId: "booking-1",
    userId: "user-1",
    amount: 250000,
    currency: "NGN",
    status: "PAID",
    method: "CARD",
    transactionRef: "TXN-2026-0801-992",
    createdAt: "2026-08-01T12:00:00Z",
    receiptUrl: "/receipts/rec-1.pdf",
  },
];

export const paymentService = {
  async getUserPayments(userId: string): Promise<Payment[]> {
    return mockPayments.filter((p) => p.userId === userId);
  },

  async initiatePayment(bookingId: string, amount: number, method: "CARD" | "BANK_TRANSFER" | "USSD"): Promise<Payment> {
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      bookingId,
      userId: "user-1",
      amount,
      currency: "NGN",
      status: "PAID",
      method,
      transactionRef: `TXN-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockPayments.push(payment);
    return payment;
  },

  async getReceipt(paymentId: string): Promise<Receipt | null> {
    const payment = mockPayments.find((p) => p.id === paymentId);
    if (!payment) return null;
    return {
      id: `rec-${payment.id}`,
      paymentId: payment.id,
      receiptNumber: `REC-${Date.now()}`,
      amountPaid: payment.amount,
      issuedAt: payment.createdAt,
    };
  },

  async requestRefund(paymentId: string, reason: string): Promise<Refund> {
    return {
      id: `ref-${Date.now()}`,
      paymentId,
      amount: 250000,
      reason,
      status: "PENDING",
      requestedAt: new Date().toISOString(),
    };
  },
};
