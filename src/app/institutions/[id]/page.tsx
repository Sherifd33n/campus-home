// import Image from "next/image";
// import Link from "next/link";
// import { kwaraInstitutions, hostels } from "@/data/listing"; 

// interface InstitutionPageProps {
//   params: { id: string };
// }

// export default function InstitutionPage({ params }: InstitutionPageProps) {
//   const institution = kwaraInstitutions.find(inst => inst.id === params.id);

//   const filteredHostels = hostels.filter(hostel => hostel.institutionId === params.id);

//   if (!institution) return <div className="p-10">Institution not found</div>;

//   return (
//     <div className="p-8">
//       {/* Hero */}
//       <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8">
//         <Image
//           src={institution.image}
//           alt={institution.name}
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="absolute bottom-6 left-6 text-white">
//           <h1 className="text-3xl font-bold">Hostels Around {institution.name}</h1>
//           <p className="text-gray-300">{filteredHostels.length} Available Listings</p>
//         </div>
//       </div>

//       {/* Hostels Grid */}
//       {filteredHostels.length === 0 ? (
//         <p>No hostels available yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredHostels.map(hostel => (
//             <div key={hostel.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//               <div className="relative h-48 w-full">
//                 <Image
//                   src={hostel.image}
//                   alt={hostel.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <h2 className="font-semibold text-lg">{hostel.name}</h2>
//                 <p className="text-sm text-gray-500 mt-1">₦{hostel.price.toLocaleString()} / year</p>
//                 <p className="text-sm text-gray-400 mt-1">{hostel.rooms.private} private, {hostel.rooms.shared} shared rooms</p>
//                 <p className="text-sm text-gray-400 mt-1">Rating: {hostel.rating} ⭐ ({hostel.reviews} reviews)</p>
//                 <Link href={`/hostels/${hostel.id}`} className="mt-3 inline-block text-blue-600 text-sm font-medium">
//                   View Details →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }