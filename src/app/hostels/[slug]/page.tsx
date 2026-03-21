import { Metadata } from "next";
import { schoolHostels } from "@/data/hostel";
import { institutions } from "@/data/listing";
import HostelDetailsClient from "./HostelDetailsClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hostel = schoolHostels.find((h) => h.slug === slug);

  if (!hostel) {
    return {
      title: "Hostel Not Found | Campus Home",
      description: "The hostel you are looking for could not be found.",
    };
  }

  const school = institutions.find(
    (inst) => inst.schoolSlug === hostel.schoolSlug,
  );

  const title = `${hostel.name} — Student Hostel near ${school?.shortName ?? "Campus"} | Campus Home`;
  const description = hostel.about.slice(0, 160);
  const previewImage = hostel.images[0] ?? "/images/hostels/hostel1.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: hostel.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImage],
    },
  };
}

export default async function HostelDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <HostelDetailsClient slug={slug} />;
}
