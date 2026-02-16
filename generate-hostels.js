// Script to generate static hostel data
const fs = require("fs");

const hostelImagePool = [
  "/images/hostels/hostel1.png",
  "/images/hostels/hostel2.png",
  "/images/hostels/hostel3.png",
  "/images/hostels/hostel4.png",
  "/images/hostels/hostel5.png",
];

const getRandomImages = (count = 5) => {
  const shuffled = [...hostelImagePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const hostelNames = [
  "Premier Lodge",
  "Royal Residence",
  "Campus Haven",
  "Scholar's Nest",
  "Elite Hostel",
  "Green Park Lodge",
  "Victory Hostel",
  "Golden Gate Residence",
  "Comfort Zone",
  "Paradise Lodge",
  "Excellence Hostel",
  "Summit Residence",
  "Crown Plaza",
  "Diamond Lodge",
  "Prestige Hostel",
  "Heritage Residence",
  "Harmony Lodge",
  "Serenity Hostel",
  "Oasis Residence",
  "Pinnacle Lodge",
];

const roomTypes = [
  { type: "Single Room", basePrice: 250000 },
  { type: "Self-Contain", basePrice: 350000 },
  { type: "2-Bed Shared", basePrice: 200000 },
  { type: "3-Bed Shared", basePrice: 150000 },
  { type: "4-Bed Dorm", basePrice: 120000 },
  { type: "Room Selfcon", basePrice: 300000 },
  { type: "Room and Parlour", basePrice: 400000 },
  { type: "2 Bedroom", basePrice: 500000 },
  { type: "3 Bedroom", basePrice: 650000 },
  { type: "Room and Parlour Selfcon", basePrice: 450000 },
];

const amenitiesPool = [
  "WiFi",
  "24/7 Power",
  "Security",
  "CCTV",
  "Laundry",
  "Water Supply",
  "Generator",
  "Study Room",
  "Parking",
  "Kitchen",
  "Gym",
  "Swimming Pool",
];

const streets = [
  "University Road",
  "Campus Avenue",
  "Scholar Street",
  "Education Drive",
  "College Road",
  "Academic Way",
  "Student Lane",
  "Learning Boulevard",
  "Knowledge Street",
  "Wisdom Avenue",
  "Main Campus Road",
  "North Gate Road",
  "South Gate Avenue",
  "East Campus Drive",
  "West Campus Street",
];

const genderOptions = ["Mixed", "Male Only", "Female Only"];

const schoolSlugs = [
  "absu",
  "mouau",
  "abia-poly",
  "mautech",
  "adsu",
  "adamawa-poly",
  "uniuyo",
  "aksu",
  "akwa-ibom-poly",
  "unizik",
  "coou",
  "anambra-poly",
  "atbu",
  "basu",
  "bauchi-poly",
  "ndu",
  "bayelsa-medical",
  "bayelsa-poly",
  "bsu",
  "uam",
  "benue-poly",
  "unimaid",
  "basu-borno",
  "borno-poly",
  "unical",
  "crutech",
  "cross-river-poly",
  "delsu",
  "fupre",
  "delta-poly",
  "ebsu",
  "funai",
  "ebonyi-poly",
  "uniben",
  "aau",
  "edo-poly",
  "eksu",
  "fuoye",
  "ekiti-poly",
  "unn",
  "esut",
  "enugu-poly",
  "gsu",
  "fuk",
  "gombe-poly",
  "imsu",
  "futo",
  "imo-poly",
  "fud",
  "jigsu",
  "jigawa-poly",
  "abu",
  "kasu",
  "kadpoly",
  "buk",
  "kust",
  "kano-poly",
  "fudma",
  "umyu",
  "katsina-poly",
  "fubk",
  "ksusta",
  "kebbi-poly",
  "ksu",
  "ful",
  "kogi-poly",
  "unilorin",
  "kwasu",
  "offa-poly",
  "unilag",
  "lasu",
  "lagos-poly",
  "fulafia",
  "nsuk",
  "nasarawa-poly",
  "futminna",
  "ibbul",
  "niger-poly",
  "funaab",
  "oou",
  "ogun-poly",
  "futa",
  "adekunle-ajasin",
  "ondo-poly",
  "uniosun",
  "oau",
  "osun-poly",
  "ui",
  "lautech",
  "oyo-poly",
  "unijos",
  "plasu",
  "plateau-poly",
  "uniport",
  "rsu",
  "rivers-poly",
  "udusok",
  "sokoto-state",
  "sokoto-poly",
  "futa-taraba",
  "taraba-state",
  "taraba-poly",
  "ysu",
  "fuy",
  "yobe-poly",
  "fudz",
  "zamfara-state",
  "zamfara-poly",
  "uniabuja",
  "baze",
  "abuja-poly",
];

const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateRoomTypes = () => {
  const numRoomTypes = Math.floor(Math.random() * 3) + 2;
  const selectedRooms = getRandomItems(roomTypes, numRoomTypes);

  return selectedRooms.map((room) => ({
    type: room.type,
    price: room.basePrice + (Math.floor(Math.random() * 10) - 5) * 10000,
    availability: Math.random() > 0.7 ? "LIMITED" : "AVAILABLE",
  }));
};

const generatedHostels = [];
let hostelId = 1;

schoolSlugs.forEach((slug, schoolIndex) => {
  const numHostels = Math.floor(Math.random() * 2) + 5;

  for (let i = 0; i < numHostels; i++) {
    const rooms = generateRoomTypes();
    const startingPrice = Math.min(...rooms.map((r) => r.price));
    const amenities = getRandomItems(
      amenitiesPool,
      Math.floor(Math.random() * 4) + 4,
    );
    const hostelName =
      hostelNames[(schoolIndex * numHostels + i) % hostelNames.length];
    const street = streets[(schoolIndex * numHostels + i) % streets.length];

    generatedHostels.push({
      id: `ng-${hostelId}`,
      slug: `${slug}-${hostelName.toLowerCase().replace(/['\s]/g, "-")}-${i + 1}`,
      name: `${hostelName}`,
      address: `${Math.floor(Math.random() * 50) + 1} ${street}`,
      city: "Campus Area",
      state: "Nigeria",
      country: "Nigeria",
      distanceToCampus: `${Math.floor(Math.random() * 12) + 2} mins walk to campus`,
      verified: Math.random() > 0.3,
      gender: genderOptions[Math.floor(Math.random() * genderOptions.length)],
      totalUnits: Math.floor(Math.random() * 60) + 40,
      schoolSlug: slug,
      rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
      reviews: Math.floor(Math.random() * 300) + 50,
      startingPrice: startingPrice,
      images: getRandomImages(),
      amenities: amenities,
      rooms: rooms,
      utilitiesIncluded: Math.random() > 0.7,
      refundableDeposit: Math.random() > 0.2,
      noHiddenFees: Math.random() > 0.3,
      featured: Math.random() > 0.85,
      createdAt: `2025-${String(Math.floor(Math.random() * 2) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    });

    hostelId++;
  }
});

// Generate the TypeScript file content
const fileContent = `export const schoolHostels = ${JSON.stringify(generatedHostels, null, 2)};
`;

// Write to file
fs.writeFileSync("src/data/hostel.ts", fileContent, "utf8");
console.log(
  `Generated ${generatedHostels.length} hostels for ${schoolSlugs.length} schools`,
);
console.log("File written to src/data/hostel.ts");
