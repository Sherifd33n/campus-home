import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "Campus Home",
  description:
    "Find your perfect stay with Stay Find - the ultimate accommodation search platform.",
};

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {" "}
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
