// Hostel data generation with compact code
const hostelImagePool = [
    "/images/hostels/hostel1.png",
    "/images/hostels/hostel2.png",
    "/images/hostels/hostel3.png",
    "/images/hostels/hostel4.png",
    "/images/hostels/hostel5.png",
];

const hostelNames = [
    "Premier Lodge", "Royal Residence", "Campus Haven", "Scholar's Nest",
    "Elite Hostel", "Green Park Lodge", "Victory Hostel", "Golden Gate Residence",
    "Comfort Zone", "Paradise Lodge", "Excellence Hostel", "Summit Residence",
    "Crown Plaza", "Diamond Lodge", "Prestige Hostel", "Heritage Residence",
    "Harmony Lodge", "Serenity Hostel", "Oasis Residence", "Pinnacle Lodge"
];

export const roomTypes = [
    { type: "Single Room", basePrice: 250000 },
    { type: "Self-Contain", basePrice: 350000 },
    { type: "2-Bed Shared", basePrice: 200000 },
    { type: "3-Bed Shared", basePrice: 150000 },
    { type: "4-Bed Dorm", basePrice: 120000 },
    { type: "Room Selfcon", basePrice: 300000 },
    { type: "Room and Parlour", basePrice: 400000 },
    { type: "2 Bedroom", basePrice: 500000 },
    { type: "3 Bedroom", basePrice: 650000 },
    { type: "Room and Parlour Selfcon", basePrice: 450000 }
];

const amenitiesPool = [
    "WiFi", "24/7 Power", "Security", "CCTV", "Laundry", "Water Supply",
    "Generator", "Study Room", "Parking", "Kitchen", "Gym", "Swimming Pool"
];

const streets = [
    "University Road", "Campus Avenue", "Scholar Street", "Education Drive",
    "College Road", "Academic Way", "Student Lane", "Learning Boulevard",
    "Knowledge Street", "Wisdom Avenue", "Main Campus Road", "North Gate Road",
    "South Gate Avenue", "East Campus Drive", "West Campus Street"
];

const genderOptions = ["Mixed", "Male Only", "Female Only"];

const schoolSlugs = [
    "absu", "mouau", "abia-poly", "mautech", "adsu", "adamawa-poly",
    "uniuyo", "aksu", "akwa-ibom-poly", "unizik", "coou", "anambra-poly",
    "atbu", "basu", "bauchi-poly", "ndu", "bayelsa-medical", "bayelsa-poly",
    "bsu", "uam", "benue-poly", "unimaid", "basu-borno", "borno-poly",
    "unical", "crutech", "cross-river-poly", "delsu", "fupre", "delta-poly",
    "ebsu", "funai", "ebonyi-poly", "uniben", "aau", "edo-poly",
    "eksu", "fuoye", "ekiti-poly", "unn", "esut", "enugu-poly",
    "gsu", "fuk", "gombe-poly", "imsu", "futo", "imo-poly",
    "fud", "jigsu", "jigawa-poly", "abu", "kasu", "kadpoly",
    "buk", "kust", "kano-poly", "fudma", "umyu", "katsina-poly",
    "fubk", "ksusta", "kebbi-poly", "ksu", "ful", "kogi-poly",
    "unilorin", "kwasu", "offa-poly", "unilag", "lasu", "lagos-poly",
    "fulafia", "nsuk", "nasarawa-poly", "futminna", "ibbul", "niger-poly",
    "funaab", "oou", "ogun-poly", "futa", "adekunle-ajasin", "ondo-poly",
    "uniosun", "oau", "osun-poly", "ui", "lautech", "oyo-poly",
    "unijos", "plasu", "plateau-poly", "uniport", "rsu", "rivers-poly",
    "udusok", "sokoto-state", "sokoto-poly", "futa-taraba", "taraba-state", "taraba-poly",
    "ysu", "fuy", "yobe-poly", "fudz", "zamfara-state", "zamfara-poly",
    "uniabuja", "baze", "abuja-poly"
];

// TypeScript interface for Hostel data
interface Hostel {
    id: string;
    slug: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    distanceToCampus: string;
    verified: boolean;
    gender: string;
    totalUnits: number;
    schoolSlug: string;
    rating: number;
    reviews: number;
    startingPrice: number;
    images: string[];
    amenities: string[];
    rooms: {
        type: string;
        price: number;
        availability: string;
    }[];
    utilitiesIncluded: boolean;
    refundableDeposit: boolean;
    noHiddenFees: boolean;
    featured: boolean;
    createdAt: string;
}

// Seeded random number generator for consistent results
class SeededRandom {
    constructor(seed: number) {
        this.seed = seed;
    }
    seed: number;

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min: number, max: number) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    choice<T>(arr: T[]): T {
        return arr[this.nextInt(0, arr.length - 1)];
    }

    shuffle<T>(arr: T[]): T[] {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}

// Generate hostels with seeded randomness for consistency
const generateHostels = () => {
    const hostels: Hostel[] = [];
    let hostelId = 1;

    schoolSlugs.forEach((slug, schoolIndex) => {
        const rng = new SeededRandom(schoolIndex * 1000);
        const numHostels = rng.nextInt(5, 6);

        for (let i = 0; i < numHostels; i++) {
            const itemRng = new SeededRandom(schoolIndex * 1000 + i * 100);

            // Generate room types
            const numRoomTypes = itemRng.nextInt(2, 4);
            const selectedRoomTypes = itemRng.shuffle(roomTypes).slice(0, numRoomTypes);
            const rooms = selectedRoomTypes.map(room => ({
                type: room.type,
                price: room.basePrice + (itemRng.nextInt(-5, 5) * 10000),
                availability: itemRng.next() > 0.7 ? "LIMITED" : "AVAILABLE"
            }));

            const startingPrice = Math.min(...rooms.map(r => r.price));

            // Generate amenities
            const numAmenities = itemRng.nextInt(4, 7);
            const amenities = itemRng.shuffle(amenitiesPool).slice(0, numAmenities);

            // Generate images
            const images = itemRng.shuffle(hostelImagePool);

            const hostelName = hostelNames[(schoolIndex * numHostels + i) % hostelNames.length];
            const street = streets[(schoolIndex * numHostels + i) % streets.length];

            hostels.push({
                id: `ng-${hostelId}`,
                slug: `${slug}-${hostelName.toLowerCase().replace(/['\s]/g, '-')}-${i + 1}`,
                name: hostelName,
                address: `${itemRng.nextInt(1, 50)} ${street}`,
                city: "Campus Area",
                state: "Nigeria",
                country: "Nigeria",
                distanceToCampus: `${itemRng.nextInt(2, 13)} mins walk to campus`,
                verified: itemRng.next() > 0.3,
                gender: itemRng.choice(genderOptions),
                totalUnits: itemRng.nextInt(40, 100),
                schoolSlug: slug,
                rating: parseFloat((3.8 + itemRng.next() * 1.2).toFixed(1)),
                reviews: itemRng.nextInt(50, 350),
                startingPrice,
                images,
                amenities,
                rooms,
                utilitiesIncluded: itemRng.next() > 0.7,
                refundableDeposit: itemRng.next() > 0.2,
                noHiddenFees: itemRng.next() > 0.3,
                featured: itemRng.next() > 0.85,
                createdAt: `2025-${String(itemRng.nextInt(1, 2)).padStart(2, '0')}-${String(itemRng.nextInt(1, 28)).padStart(2, '0')}`
            });

            hostelId++;
        }
    });

    return hostels;
};

export const schoolHostels = generateHostels();
