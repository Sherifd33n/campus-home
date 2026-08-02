import { Booking, Reservation, Visit, BookingStatus } from "@/types";

const mockBookings: Booking[] = [
  {
    id: "booking-1",
    hostelId: "hostel-1",
    hostelName: "Premier Lodge",
    hostelImage: "/images/hostels/hostel1.png",
    roomType: "Single Room",
    price: 250000,
    userId: "user-1",
    userName: "Student User",
    userEmail: "student@campus.home",
    userPhone: "+234 801 234 5678",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    moveInDate: "2026-09-01",
    createdAt: new Date().toISOString(),
    notes: "",
  },
];

const mockVisits: Visit[] = [
  {
    id: "visit-1",
    hostelId: "hostel-1",
    hostelName: "Premier Lodge",
    userId: "user-1",
    userName: "Student User",
    userPhone: "+234 801 234 5678",
    scheduledDate: "2026-08-10",
    scheduledTime: "10:00 AM",
    status: "SCHEDULED",
    createdAt: new Date().toISOString(),
  },
];

export const bookingService = {
  async getUserBookings(userId: string): Promise<Booking[]> {
    return mockBookings.filter((b) => b.userId === userId);
  },

  async getAgentBookings(agentId: string): Promise<Booking[]> {
    return mockBookings.filter((b) => b.agentId === agentId);
  },

  async createBooking(data: Partial<Booking>): Promise<Booking> {
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      hostelId: data.hostelId || "",
      hostelName: data.hostelName || "",
      hostelImage: data.hostelImage || "/images/hostels/hostel1.png",
      roomType: data.roomType || "Single Room",
      price: data.price || 0,
      userId: data.userId || "",
      userName: data.userName || "",
      userEmail: data.userEmail || "",
      userPhone: data.userPhone || "",
      agentId: data.agentId,
      status: "PENDING",
      paymentStatus: "UNPAID",
      moveInDate: data.moveInDate,
      createdAt: new Date().toISOString(),
      notes: data.notes,
    };
    mockBookings.push(booking);
    return booking;
  },

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | null> {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) booking.status = status;
    return booking || null;
  },

  async cancelBooking(bookingId: string): Promise<boolean> {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = "CANCELLED";
      return true;
    }
    return false;
  },

  async getUserVisits(userId: string): Promise<Visit[]> {
    return mockVisits.filter((v) => v.userId === userId);
  },

  async scheduleVisit(data: Partial<Visit>): Promise<Visit> {
    const visit: Visit = {
      id: `visit-${Date.now()}`,
      hostelId: data.hostelId || "",
      hostelName: data.hostelName || "",
      userId: data.userId || "",
      userName: data.userName || "",
      userPhone: data.userPhone || "",
      scheduledDate: data.scheduledDate || "",
      scheduledTime: data.scheduledTime || "",
      status: "SCHEDULED",
      createdAt: new Date().toISOString(),
      notes: data.notes,
    };
    mockVisits.push(visit);
    return visit;
  },

  async createReservation(data: Partial<Reservation>): Promise<Reservation> {
    const reservation: Reservation = {
      id: `reservation-${Date.now()}`,
      hostelId: data.hostelId || "",
      hostelName: data.hostelName || "",
      roomType: data.roomType || "Single Room",
      depositAmount: data.depositAmount || 50000,
      userId: data.userId || "",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    return reservation;
  },
};
