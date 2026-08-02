import { Review } from "@/types";

const mockReviews: Review[] = [
  {
    id: "review-1",
    hostelId: "hostel-1",
    userId: "user-1",
    userName: "Chukwuemeka A.",
    rating: 5,
    comment: "Excellent hostel, very clean and the security is top-notch. The WiFi works all the time and power supply is 24/7.",
    date: "2026-07-15",
    isVerifiedStudent: true,
    pros: ["Great security", "Reliable power", "Fast WiFi"],
    cons: ["Parking can be tight"],
    helpfulVotes: 12,
  },
  {
    id: "review-2",
    hostelId: "hostel-1",
    userId: "user-2",
    userName: "Fatimah B.",
    rating: 4,
    comment: "Really good hostel overall, close to campus. A bit pricey but worth it.",
    date: "2026-06-22",
    isVerifiedStudent: true,
    pros: ["Close to campus", "Clean facilities"],
    cons: ["Slightly expensive"],
    helpfulVotes: 8,
  },
];

export const reviewService = {
  async getReviewsByHostel(hostelId: string): Promise<Review[]> {
    return mockReviews.filter((r) => r.hostelId === hostelId);
  },

  async submitReview(data: Partial<Review>): Promise<Review> {
    const review: Review = {
      id: `review-${Date.now()}`,
      hostelId: data.hostelId || "",
      userId: data.userId || "",
      userName: data.userName || "Anonymous",
      rating: data.rating || 0,
      comment: data.comment || "",
      date: new Date().toISOString().split("T")[0],
      isVerifiedStudent: data.isVerifiedStudent || false,
      photos: data.photos,
      pros: data.pros,
      cons: data.cons,
      helpfulVotes: 0,
    };
    mockReviews.push(review);
    return review;
  },

  async voteHelpful(reviewId: string, userId: string, isHelpful: boolean): Promise<void> {
    const review = mockReviews.find((r) => r.id === reviewId);
    if (review) {
      review.helpfulVotes = (review.helpfulVotes || 0) + (isHelpful ? 1 : 0);
    }
  },

  async getAverageRating(hostelId: string): Promise<number> {
    const reviews = mockReviews.filter((r) => r.hostelId === hostelId);
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  },
};
