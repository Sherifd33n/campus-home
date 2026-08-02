// Enterprise Domain Models for Campus Home

export type Role = "student" | "agent" | "admin";

export type GenderOption = "Mixed" | "Male Only" | "Female Only";

export type AvailabilityStatus = "AVAILABLE" | "LIMITED" | "SOLD_OUT" | "COMING_SOON";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "IN_PROGRESS";

export type PaymentStatus = "UNPAID" | "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export type VisitStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export type NotificationType = "Booking" | "System" | "Inquiry" | "Review" | "Payment" | "Security";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  image?: string;
  bio?: string;
  isVerified?: boolean;
  studentVerification?: StudentVerification;
  createdAt: string;
  updatedAt?: string;
}

export interface Agent extends User {
  agencyName?: string;
  licenseNumber?: string;
  verifiedListingsCount?: number;
  totalListingsCount?: number;
  rating?: number;
  responseRate?: string;
  responseTime?: string;
}

export interface StudentVerification {
  id: string;
  userId: string;
  institutionId: string;
  studentIdCardUrl?: string;
  matricNumber?: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  submittedAt: string;
}

export interface Room {
  id?: string;
  hostelId?: string;
  type: string; // e.g. "Single Room", "Self-Contain", "2-Bed Shared"
  price: number;
  availability: AvailabilityStatus | string;
  totalUnits?: number;
  availableUnits?: number;
  description?: string;
  amenities?: string[];
  images?: string[];
}

export interface HostelRule {
  id: string;
  rule: string;
  icon?: string;
}

export interface NearbyPlace {
  name: string;
  category: "Campus Gate" | "Transport" | "Supermarket" | "Hospital" | "Restaurant" | string;
  distanceMinutes: number;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface HostelImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface Hostel {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  distanceToCampus: string;
  verified: boolean;
  agentVerified: boolean;
  inspectionCompleted: boolean;
  gender: GenderOption | string;
  totalUnits: number;
  schoolSlug: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
  utilitiesIncluded: boolean;
  refundableDeposit: boolean;
  noHiddenFees: boolean;
  featured: boolean;
  about: string;
  agentName: string;
  agentId?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentImage?: string;
  createdAt: string;
  updatedAt?: string;
  rules?: HostelRule[];
  nearbyPlaces?: NearbyPlace[];
  priceHistory?: PriceHistory[];
  latitude?: number;
  longitude?: number;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  stateId: string;
  type: string;
  city: string;
  image: string;
  schoolSlug: string;
  hostelCount?: number;
}

export interface State {
  id: string;
  name: string;
  code?: string;
  image: string;
  institutionsCount?: number;
}

export interface HelpfulVote {
  userId: string;
  isHelpful: boolean;
}

export interface AgentReply {
  id: string;
  agentId: string;
  agentName: string;
  comment: string;
  createdAt: string;
}

export interface Review {
  id: string;
  hostelId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedStudent?: boolean;
  photos?: string[];
  pros?: string[];
  cons?: string[];
  helpfulVotes?: number;
  agentReply?: AgentReply;
}

export interface Booking {
  id: string;
  hostelId: string;
  hostelName: string;
  hostelImage: string;
  roomType: string;
  price: number;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  agentId?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  moveInDate?: string;
  createdAt: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  hostelId: string;
  hostelName: string;
  roomType: string;
  depositAmount: number;
  userId: string;
  expiresAt: string;
  status: "ACTIVE" | "EXPIRED" | "CONVERTED" | "CANCELLED";
  createdAt: string;
}

export interface Visit {
  id: string;
  hostelId: string;
  hostelName: string;
  userId: string;
  userName: string;
  userPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  status: VisitStatus;
  createdAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  isRead: boolean;
  linkUrl?: string;
}

export interface Favorite {
  userId: string;
  hostelId: string;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  title: string;
  query: SearchFilter;
  createdAt: string;
}

export interface RecentlyViewed {
  userId: string;
  hostelId: string;
  viewedAt: string;
}

export interface Payment {
  id: string;
  bookingId?: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: "CARD" | "BANK_TRANSFER" | "USSD";
  transactionRef: string;
  createdAt: string;
  receiptUrl?: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  items: { description: string; amount: number }[];
}

export interface Receipt {
  id: string;
  paymentId: string;
  receiptNumber: string;
  amountPaid: number;
  issuedAt: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "PROCESSED" | "REJECTED";
  requestedAt: string;
}

export interface Attachment {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  attachments?: Attachment[];
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: { id: string; name: string; image?: string; role: Role }[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface SearchFilter {
  query?: string;
  stateId?: string;
  schoolSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string;
  gender?: GenderOption | string;
  amenities?: string[];
  verifiedOnly?: boolean;
  sortBy?: "price_asc" | "price_desc" | "distance" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  hostels: Hostel[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AgentAnalytics {
  totalRevenue: number;
  totalBookings: number;
  profileViews: number;
  listingViews: number;
  conversionRate: number;
  occupancyRate: number;
  monthlyStats: { month: string; revenue: number; views: number }[];
}

export interface ListingBoost {
  hostelId: string;
  plan: "BASIC" | "PREMIUM" | "VIP";
  startDate: string;
  endDate: string;
  isActive: boolean;
}
