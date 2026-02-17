"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar and Footer on the agent dashboard
  const isDashboard = pathname?.startsWith("/agent/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? "" : ""}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
