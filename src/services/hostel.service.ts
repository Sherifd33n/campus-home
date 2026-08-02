import { Hostel, SearchFilter, SearchResult } from "@/types";
import { schoolHostels } from "@/data/hostel";

export const hostelService = {
  async getHostels(filter: SearchFilter = {}): Promise<SearchResult> {
    let result = [...schoolHostels];

    if (filter.schoolSlug) {
      result = result.filter((h) => h.schoolSlug.toLowerCase() === filter.schoolSlug?.toLowerCase());
    }

    if (filter.stateId) {
      // match state
    }

    if (filter.minPrice !== undefined) {
      result = result.filter((h) => h.startingPrice >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter((h) => h.startingPrice <= filter.maxPrice!);
    }

    if (filter.roomType) {
      const targetType = filter.roomType.toLowerCase().replace(/-/g, " ");
      result = result.filter((h) =>
        h.rooms.some((r) => r.type.toLowerCase().replace(/-/g, " ") === targetType)
      );
    }

    if (filter.gender) {
      result = result.filter((h) => h.gender.toLowerCase() === filter.gender?.toLowerCase());
    }

    if (filter.verifiedOnly) {
      result = result.filter((h) => h.verified);
    }

    if (filter.amenities && filter.amenities.length > 0) {
      result = result.filter((h) =>
        filter.amenities!.every((amenity) =>
          h.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }

    // Sorting
    if (filter.sortBy) {
      if (filter.sortBy === "price_asc") {
        result.sort((a, b) => a.startingPrice - b.startingPrice);
      } else if (filter.sortBy === "price_desc") {
        result.sort((a, b) => b.startingPrice - a.startingPrice);
      } else if (filter.sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      }
    }

    const page = filter.page || 1;
    const limit = filter.limit || 12;
    const totalPages = Math.ceil(result.length / limit) || 1;

    return {
      hostels: result.slice((page - 1) * limit, page * limit),
      total: result.length,
      page,
      totalPages,
    };
  },

  async getHostelBySlug(slug: string): Promise<Hostel | null> {
    const hostel = schoolHostels.find((h) => h.slug === slug);
    return hostel || null;
  },

  async getHostelById(id: string): Promise<Hostel | null> {
    const hostel = schoolHostels.find((h) => h.id === id);
    return hostel || null;
  },

  async getFeaturedHostels(limit = 6): Promise<Hostel[]> {
    return schoolHostels.filter((h) => h.featured).slice(0, limit);
  },

  async createHostelListing(data: Partial<Hostel>): Promise<Hostel> {
    const newHostel: Hostel = {
      id: `hostel-${Date.now()}`,
      slug: data.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `hostel-${Date.now()}`,
      name: data.name || "New Hostel Listing",
      address: data.address || "Main Road",
      city: data.city || "Ilorin",
      state: data.state || "Kwara",
      country: "Nigeria",
      distanceToCampus: data.distanceToCampus || "10 mins walk",
      verified: true,
      agentVerified: true,
      inspectionCompleted: true,
      gender: data.gender || "Mixed",
      totalUnits: 10,
      schoolSlug: data.schoolSlug || "unilorin",
      rating: 4.8,
      reviews: 0,
      startingPrice: data.startingPrice || 250000,
      images: data.images && data.images.length > 0 ? data.images : ["/images/hostels/hostel1.png"],
      amenities: data.amenities || ["WiFi", "Security", "24/7 Power"],
      rooms: data.rooms || [{ type: "Single Room", price: data.startingPrice || 250000, availability: "AVAILABLE" }],
      utilitiesIncluded: true,
      refundableDeposit: true,
      noHiddenFees: true,
      featured: false,
      about: data.about || "Modern student hostel with excellent facilities.",
      agentName: data.agentName || "Alexander Wright",
      createdAt: new Date().toISOString(),
    };
    return newHostel;
  },
};
