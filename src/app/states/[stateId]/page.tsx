import { states } from "@/data/state";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import StateFilter from "@/components/StateFilter"; 

interface Props {
  params: { stateId: string };
}

export default async function StatePage({ params }: Props) {
  const { stateId } = await params; 
  const state = states.find((s) => s.id === stateId);

  if (!state) return <div className="p-10">State not found</div>;

  return (
    <div className="p-10 bg-[#f6f7f8]">
      <div className="flex items-center gap-3 text-[#7c8a9d] text-sm">
        <Link href="/" className="hover:text-[#278cf1]">
          Home
        </Link>
        <FaChevronRight size={10} />
        <Link href="/states" className="hover:text-[#278cf1]">
          All States
        </Link>
        <FaChevronRight size={10} />
        <p className="text-[#278cf1]">{state.name}</p>
      </div>

      <p className="text-3xl text-[#0f172a] font-semibold mt-5">
        Find Hostels Near Your Institution
      </p>
      <p className="text-[#6b7686] text-base mt-2">
        Discover premium students accommodations across {state.name}{" "}
        {state.id === "fct" ? "" : `state `} 
         top institutions.
      </p>

      <div className="bg-white rounded-md p-2 mt-10">
        <StateFilter /> 
      </div>
    </div>
  );
}