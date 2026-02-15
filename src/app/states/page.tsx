import Link from "next/link";
import Image from "next/image";
import { states } from "@/data/state";
import Container from "@/components/Container";

export default function AllStatesPage() {
  return (
    <div className="py-16 bg-gray-50">
      <Container className="px-6">
        <h1 className="text-3xl font-bold mb-8">All States</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {states.map((state) => (
            <Link
              key={state.id}
              href={`/states/${state.id}`}
              className="relative rounded-2xl overflow-hidden group h-52">
              <Image
                src={state.image}
                alt={state.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {state.name}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
